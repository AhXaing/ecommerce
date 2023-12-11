import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import "./LayoutDashboard.css";
import {
  DesktopOutlined,
  EditOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  QrcodeOutlined,
  CopyOutlined,
  SolutionOutlined,
  MenuUnfoldOutlined,
  AlignLeftOutlined,
  DiffOutlined,
  SnippetsOutlined,
  CalendarOutlined,
  SettingOutlined,
  TranslationOutlined,
  ThunderboltOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Dropdown } from "antd";
import { getUser } from "../../share/helper";
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
  getItem("Customer", "/dashboard/customer", <SolutionOutlined />),
  getItem("Employee", "/dashboard/employee", <TeamOutlined />),
  getItem("Order", "/dashboard/order", <CalendarOutlined />),

  getItem("Product", "/dashboard/product", <MenuUnfoldOutlined />, [
    getItem("Product", "/dashboard/product/product-list", <DiffOutlined />),
    getItem("Category", "/dashboard/product/category", <AlignLeftOutlined />),
  ]),

  getItem("Report", "/dashboard/report", <CopyOutlined />, [
    getItem("Top Sale", "/dashboard/report/top-sale", <EditOutlined />),
    getItem(
      "Sold By Customer",
      "/dashboard/report/sold-by-customer",
      <TeamOutlined />
    ),
    getItem(
      "Sole By Product",
      "/dashboard/report/sold-by-product",
      <SnippetsOutlined />
    ),
  ]),

  getItem("System", "/dashboard/system", <SettingOutlined />, [
    getItem(
      "Order Payment",
      "/dashboard/system/order-payment",
      <QrcodeOutlined />
    ),
    getItem(
      "Order Status",
      "/dashboard/system/order-status",
      <ThunderboltOutlined />
    ),
    getItem("Province", "/dashboard/system/province", <TranslationOutlined />),
    getItem("Menu", "/dashboard/system/menu", <DesktopOutlined />),
    getItem("Permission", "/dashboard/system/permission", <SolutionOutlined />),
    getItem("Role", "/dashboard/system/role", <DesktopOutlined />),
    getItem("User Role", "/dashboard/system/user-role", <UserAddOutlined />),
  ]),
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
  });

  const handleLogout = () => {
    localStorage.setItem("isLogin", "0");
    window.location.href = "/dashboard/login";
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
  const user = getUser();
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
                <Button>{user.emp_firstname + " " + user.emp_lastname}</Button>
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
