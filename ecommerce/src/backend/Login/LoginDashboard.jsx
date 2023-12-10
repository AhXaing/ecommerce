import { Button, Form, Input, Card, message } from "antd";
import { request } from "../../share/request";
import { useState } from "react";
const LoginDashboard = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    var param = {
      username: values.username,
      password: values.password,
    };
    request("employee/login", "post", param).then((res) => {
      setLoading(false);
      if (!res.error) {
        //login success
        // localStorage.setItem("key", "value");
        localStorage.setItem("isLogin", "1");
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("permission", JSON.stringify(res.permission));
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location.href = "/dashboard";
      } else {
        message.error(res.message);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          padding: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          style={{
            width: 300,
          }}
        >
          <h4>Form Login</h4>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button loading={loading} type="success" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginDashboard;

// import { Button } from "react-bootstrap";
// import "./Login.css";
// function LoginDashboard() {
//   const onLogin = () => {
//     //login success
//     // localStorage.setItem("key", "value");
//     localStorage.setItem("isLogin", "1");
//     window.location.href = "/dashboard";
//   };
//   return (
//     <div className="Auth-form-container">
//       <form className="Auth-form">
//         <div className="Auth-form-content">
//           <h3 className="Auth-form-title">Login Form</h3>
//           <div className="form-group mt-3">
//             <label>Email address</label>
//             <input
//               type="email"
//               className="form-control mt-1"
//               placeholder="Enter email"
//             />
//           </div>
//           <div className="form-group mt-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control mt-1"
//               placeholder="Enter password"
//             />
//           </div>
//           <div className="form-group mt-2">
//             <p>
//               or <a href="#">Sign up?</a>
//             </p>
//           </div>

//           <div className="d-grid gap-2 mt-3">
//             <Button type="button" onClick={onLogin} className="btn btn-primary">
//               Log In
//             </Button>
//           </div>
//           <p className="forgot-password text-right">
//             Forgot <a href="#">password?</a>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginDashboard;
