import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import {
  Button,
  Input,
  InputRef,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import usePageInfo from "../../hooks/usePageInfo";
import { routePathMap } from "@/router";
import { join } from "path-browserify";
import { PageStateType } from "@/store/reducer/question/page";
import { useRef } from "react";
const { Title } = Typography;

function QrCodeLink({ data }: { data: PageStateType }) {
  if (!data.isPublished) {
    return null;
  }
  const url = `${import.meta.env.VITE_QRCODE_HOST}/question/${data.id}`;

  const inputRef = useRef<InputRef | null>(null);
  function handleCopyQrCodeUrl() {
    const inputElement = inputRef.current;
    if (!inputElement) {
      return;
    }
    inputElement.select();
    document.execCommand("copy");
  }

  return (
    <Space>
      <Input value={url} style={{ width: 300 }} ref={inputRef}></Input>
      <Tooltip title="复制链接">
        <Button
          shape="circle"
          icon={<CopyOutlined></CopyOutlined>}
          onClick={handleCopyQrCodeUrl}
        ></Button>
      </Tooltip>
      <div style={{ textAlign: "center" }}>
        <Popover
          overlayInnerStyle={{ padding: 0 }}
          content={
            <QRCode
              errorLevel="H"
              size={150}
              value={url}
              icon={"/favicon.png"}
            />
          }
        >
          <Button icon={<QrcodeOutlined></QrcodeOutlined>}></Button>
        </Popover>
      </div>
    </Space>
  );
}

export default function StatHeader() {
  const navigate = useNavigate();
  const { pageInfo } = usePageInfo();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined></LeftOutlined>}
              onClick={() => navigate(-1)}
            >
              返回
            </Button>
            <Title level={5}>{pageInfo.title}</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <QrCodeLink data={pageInfo}></QrCodeLink>
        </div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() =>
              navigate(join(routePathMap.questionnaireEdit, pageInfo.id))
            }
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
}
