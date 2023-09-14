
import React, { useState } from "react";
import { Button, Container, Form,Row } from "react-bootstrap";
import HeaderBar from "./AppNavBar";
import axios from "axios";
import { API,POST,USERS } from "../constants";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [user_email, setUser_Email] = useState("");
  const [user_password, setUser_Password] = useState("");
  const [user_name, setUser_Name] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user_info = { user_email,user_password,user_name};
      await axios.post(API+POST+USERS, user_info)
      navigate("/login");
    }
    catch(error)
    {
      console.error(error);
    }
  }

  return (
    <Container>
      
        <HeaderBar />
        <h1>Please Sign Up</h1>

      <Form>
        <Form.Group className="mb-3" controlId="user_name">
          <Form.Label> User Name</Form.Label>
          <Form.Control type="text" name="user_name" placeholder="Peter Zhang " value={user_name}
            onChange={(event) => { setUser_Name(event.target.value) }} />
        </Form.Group>
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
        <Button variant="primary" onClick={handleSubmit} >Sign UP</Button>
    </Form>
      
      <Row style ={{display:"block",alignItems:"flex-start"}}>
      <a href="/login">Have an existing account? Login here.</a>
      </Row>
    </Container>
  );
};

export default SignUp;