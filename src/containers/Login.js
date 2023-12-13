// Login.js
import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Received values:", values);
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:E7nWfgam/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data Retrieved", data);
        const email = data.map((it) => it.Username);
        const password = data.map((it) => it.Password);
        const usertype = data.map((it) => it.Usertype);
        console.log(email, "email");
        console.log(password, "password");
        console.log(usertype, "usertype");
        const index = email.indexOf(values.username);
        if (index === -1) {
          message.error("Email or password is incorrect. Please try again.");
        } else {
          if (password[index] === values.password) {
            message.success("You are logged in!!!!");

            if (usertype[index] === "casemanager")
              history.push("/careManagement");
            if (usertype[index] === "agencystaff") history.push("/casemanager");
            if (usertype[index] === "reporting")
              history.push("/reporting/patient");
            if (usertype[index] === "serviceprovider")
              history.push("/services");
          } else {
            message.error("Email or password is incorrect. Please try again.");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
    // Add authentication logic here
  };

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "auto",
        marginTop: "100px",
        padding: "50px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
