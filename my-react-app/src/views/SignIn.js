
import React, { useState } from "react";
import { Button, Container, Form,Row } from "react-bootstrap";
import { useAuth } from "../utils/useAuth";
import HeaderBar from "./AppNavBar";


const LoginPage = () => {
  const [user_email, setUser_Email] = useState("");

  const [user_password, setUser_Password] = useState("");
  const [errmsg,setErrMsg] = useState("")
    const { user,login }  = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    login({
      email: user_email,
      password: user_password
    });
    
    if(!user)
    {
      setErrMsg("login fail,please check email and password");
    }
  };

  return (
    <Container>
        <HeaderBar />
        <h1>Login Form here</h1>

      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label> Email Address</Form.Label>
          <Form.Control type="text" name="email" placeholder="Email Address *" value={user_email}
            onChange={(event) => { setUser_Email(event.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" name = "password" placeholder="Password *" value={user_password}
            onChange={(event) => { setUser_Password(event.target.value) }} />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit} >Login</Button>
      </Form>
      <Row style ={{display:"block",alignItems:"flex-start"}}>
      <a href="/signUp">No account? Sign Up here.</a>
      </Row>
      <h1>{errmsg}</h1>
    </Container>
  );
  };
  
  export default LoginPage;