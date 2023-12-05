import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./LayoutDashboard.css";
import {
  DesktopOutlined,
  ToolOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  QrcodeOutlined,
  FilePptOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Dropdown, Form, Input } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  getItem("Category", "/dashboard/category", <QrcodeOutlined />),
  getItem("Product", "/dashboard/product", <FilePptOutlined />),
  getItem("Customer", "/dashboard/customer", <SolutionOutlined />),
  getItem("Employee", "/dashboard/employee", <TeamOutlined />),
  getItem("Report", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5", <DesktopOutlined />),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Log out", "9", <ToolOutlined />),
];

const LayoutDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const onSelectMenu = (item) => {
    navigate(item.key);
  };
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin == "0") {
      navigate("/dashboard/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLogin", "0");
    window.location.href("/dashboard/login");
  };
  const itemsProfile = [
    {
      key: "1",
      label: <a>My Profile</a>,
    },
    {
      key: "2",
      label: <a>Setting</a>,
    },
    {
      key: "3",
      label: <a onClick={handleLogout}>Log Out</a>,
    },
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onSelect={onSelectMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="mainLayoutDashboard">
            <div className="manageLogo">
              <img src={Logo} />
              <h3>Shopping</h3>
            </div>

            <div style={{ alignItems: "center", display: "flex" }}>
              <Dropdown
                menu={{
                  items: itemsProfile,
                }}
                placement="bottomRight"
              >
                <Button>bottomRight</Button>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 5,
              marginTop: 15,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutDashboard;
