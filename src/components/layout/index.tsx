import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import styles from "./style/index.module.styl";
import MyMenu from "./components/myMenu";

const { Header, Content } = Layout;

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  const [collapsed, setCollapse] = useState<boolean>(false);

  return (
    <Layout
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        backgroundColor: "#F1F2F6",
      }}
    >
      <MyMenu collapsed={collapsed} />
      <Layout className={styles.sitelayout}>
        <Header className={styles.sitelayoutbackground}>
          <div className={styles.trigger}>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapse(false)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapse(true)} />
            )}
          </div>
        </Header>
        <Content className={styles.rightContent}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default Container;
