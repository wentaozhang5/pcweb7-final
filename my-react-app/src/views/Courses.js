import { Button, Container, Card, Row } from "react-bootstrap";
import HeaderBar from "./AppNavBar";
import axios from "axios";
import { useAuth } from "../utils/useAuth";
import React, { useState, useEffect } from "react";
import { API,DELETE,SIGNUPCOURSES } from "../constants";



function CourseSquare({ sign_up_course,callBackFunc }) {

  const { name,image, description ,order_id} = sign_up_course;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          { description }
        </Card.Text>
        <Button variant="primary" onClick={ async () => { 
          const url = API+ DELETE + SIGNUPCOURSES + `/${order_id}` ;
          await axios.delete(url);
        //通过回调函数通知父 dom 刷新控件
          callBackFunc({order_id});

        } } > UnRegister </Button>
      </Card.Body>
    </Card>
  );

}




const CoursesPage = () => {

  const { user } = useAuth();
  const user_email = user.user_email;
  const [signedCourses, setSignedCourses ]= useState([]);
  const [str,setStr] = useState("");
  //定义一个回调函数传给子控件，实现子控件通知父控件功能
  function  onCallbackFunc(freshState) {
    setStr(freshState);  
  };

  async function getSignUpCourses() {
    try {
      const response = await axios.get(API + SIGNUPCOURSES + `/${user_email}`);
      const signedCourses = response.data;
      console.log(signedCourses);
      setSignedCourses(signedCourses);
    } catch (error) {
      console.error(error);
    }
  };


//str is updated by children dom,so parent dom know the children already doing something, parent will refresh
  useEffect(() => {
    getSignUpCourses();
  }, [str]);


  const SignUpCourseCardRow = ({callBackFunc}) => {

    return signedCourses.map( (signedCourse, index) => <CourseSquare key={index} sign_up_course = {signedCourse} callBackFunc ={callBackFunc} /> );

  };




  return (
    <div>
      <HeaderBar />
      <Container >
        <Row xs={3} >
          <SignUpCourseCardRow callBackFunc={onCallbackFunc } />
        </Row>
      </Container>
    </div>
  );
}




export default CoursesPage;