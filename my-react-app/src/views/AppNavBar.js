import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const HeaderBar = () => {
  const { user, logout } = useAuth()
  return (

      <Navbar bg="primary">
        {/* everything is comment */}
        <Nav className="mx-auto">
          <Nav.Item>
            <Nav.Link href="/"> Home </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {!!user &&
            (<Nav.Link href="/portfolios"> Portfolio </Nav.Link>) }
          </Nav.Item>
          <Nav.Item>
           {!! user &&( <Nav.Link href="/courses"> Course </Nav.Link> )}
          </Nav.Item>
          <Nav.Item>
            {!! !user && (<Nav.Link href="/login"> Login </Nav.Link>)}
          </Nav.Item>
          <Nav.Item>
           
            {!!user && (  <Button
             bg ="primary" 
              key={"logout"}
              onClick={logout}
            >
            logout 
            </Button> ) }
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/signUp"> Sign Up </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* outlet is very import ,other wise link can not link to routes*/}
        <Outlet />

      </Navbar>

  )
};


export default HeaderBar;