import React, { useEffect, useRef, useState } from "react";
import { useRequest, useTitle, useDebounceFn } from "ahooks";
import styles from "@/pages/Manage/styles/common.module.scss";
import listStyles from "./index.module.scss";
import QuestionCard from "@/components/QuestionCard";
import { Spin, Typography } from "antd";
import { routeNameMap } from "@/router";
import ListSearch from "@/components/ListSearch";
import { QuestionnaireListItem } from "@/api/questionnaire/questionnaire.types";
import { useSearchParams } from "react-router-dom";
import { getQuestionaires } from "@/api/questionnaire/questionnaire";
import { SearchKey } from "@/constants";

const { Title } = Typography;
const pageSize = 10;
const QuestionList = function () {
  const [started, setStarted] = useState(false);
  const [urlSearchParameter] = useSearchParams();
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<Array<QuestionnaireListItem>>([]);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const keyWord = urlSearchParameter.get(SearchKey) || "";
  useTitle(`${_siteTitle} - ${routeNameMap.manageList}`);
  const { runAsync, loading } = useRequest(getQuestionaires, {
    manual: true,
  });
  const { run } = useDebounceFn(tryLoadMore, {
    wait: 300,
  });
  async function tryLoadMore() {
    // 如果超过了total或者处于loading状态时，不允许加载
    const footer = footerRef.current;
    if (!footer) {
      return;
    }
    const { bottom } = footer.getBoundingClientRect();

    // 滚动到底部时加载
    if (bottom <= document.body.clientHeight) {
      if (loading) {
        return;
      }
      if ((pageNum === 1 && total === 0) || pageNum * pageSize < total) {
        loadMore();
      }
    }
  }

  async function loadMore() {
    setStarted(true);
    const data = await runAsync({
      pageNum,
      pageSize,
      keyWord: urlSearchParameter.get(SearchKey) || "",
    });
    setPageNum(pageNum + 1);
    setList(list.concat(data.result));
    setTotal(data.total);
  }

  // keyword
  useEffect(() => {
    setStarted(false);
    setPageNum(1);
    setTotal(0);
    setList([]);
    run();
  }, [keyWord]);

  // 初始加载
  useEffect(() => {
    run();
  }, []);

  // 注册事件
  useEffect(() => {
    window.addEventListener("scroll", run);
    return () => {
      window.removeEventListener("scroll", run);
    };
  }, []);

  const Loading = function () {
    if (!started || loading)
      return (
        <Spin
          tip="正在加载更多..."
          className={listStyles["loading-spin"]}
        ></Spin>
      );
    if (total === 0 || pageNum * pageSize === total)
      return <span className={listStyles.loading}>暂时没有更多数据了</span>;
    return <div className={listStyles.loading}>上滑加载更多</div>;
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>{routeNameMap.manageList}</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {list.length
          ? list.map((r) => {
              return <QuestionCard key={r.id} data={r}></QuestionCard>;
            })
          : null}
        <div className={listStyles.footer} ref={footerRef}>
          <Loading></Loading>
        </div>
      </div>
    </>
  );
};

export default QuestionList;
