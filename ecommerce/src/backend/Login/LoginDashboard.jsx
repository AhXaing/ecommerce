import { Button } from "react-bootstrap";
import "./Login.css";
function LoginDashboard() {
  const onLogin = () => {
    //login success
    // localStorage.setItem("key", "value");
    localStorage.setItem("isLogin", "1");
    window.location.href = "/dashboard";
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login Form</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-2">
            <p>
              or <a href="#">Sign up?</a>
            </p>
          </div>

          <div className="d-grid gap-2 mt-3">
            <Button type="button" onClick={onLogin} className="btn btn-primary">
              Log In
            </Button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginDashboard;
