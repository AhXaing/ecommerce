import "./LayoutDashboard.css";
import Logo from "../../assets/images/logo.png";
import { useNavigate, Outlet } from "react-router-dom";
const LayoutDashboard = () => {
  const navigate = useNavigate();
  const RouteList = (routeName) => {
    navigate(routeName);
  };

  return (
    <div>
      <div className="mainLayoutDashboard">
        <div className="manageLogo">
          <img src={Logo} />
          <h1>Best Shopping</h1>
        </div>
        <div>
          <ul>
            <li onClick={() => RouteList("/dashboard")}>Home</li>
            <li onClick={() => RouteList("/dashboard/about")}>About</li>
            <li onClick={() => RouteList("/dashboard/product")}>Product</li>
            <li onClick={() => RouteList("/dashboard/customer")}>Customer</li>
            <li onClick={() => RouteList("/dashboard/category")}>Category</li>
            <li onClick={() => RouteList("/dashboard/login")}>Login</li>
            <li onClick={() => RouteList("/")}>Front End</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LayoutDashboard;
