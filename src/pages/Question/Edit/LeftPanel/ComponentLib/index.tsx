import {
  ComponentPropType,
  componentConfigureGroup,
} from "@/components/QuestionComponents";
import { Typography } from "antd";
import React from "react";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addComponent } from "@/store/reducer/question/component";
import { v4 as uuidv4 } from "uuid";

const { Title } = Typography;
export default function ComponentLib() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {componentConfigureGroup.map((r, index) => {
        return (
          <div key={r.groupName}>
            <Title
              level={3}
              style={{ fontSize: 16, marginTop: index > 0 ? 20 : 0 }}
            >
              {r.groupName}
            </Title>
            {r.components.map((c) => {
              return (
                <div
                  className={styles.wrapper}
                  key={c.type}
                  onClick={() =>
                    dispatch(
                      addComponent({
                        fe_id: uuidv4(),
                        title: c.title,
                        type: c.type,
                        props: c.defaultProps as ComponentPropType,
                      })
                    )
                  }
                >
                  <div className={styles.component}>
                    <c.Component {...c.defaultProps}></c.Component>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
