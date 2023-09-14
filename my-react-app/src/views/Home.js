import { Container, Card, Button, Row, Form } from "react-bootstrap";
import img1 from "../img1.png";
import HeaderBar from "./AppNavBar";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import React, { useState, useEffect } from "react";
import { COURSES, API, POST, SIGNUPCOURSES } from "../constants";
import axios from "axios";


//add cardSquare
function CardSquare({ course ,user_id}) {

  
  const { id, name, description, image } = course;
  const [course_id, setCourseId] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [err,setErr] = useState("");
  
 

  const navigate = useNavigate();
 
  useEffect(() => {
    setCourseId(id);
  }, [id]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label> Contact No</Form.Label>
          <Form.Control type="text" size="lg" name="phone" placeholder="(65) 99999999 "
            onChange={(event) => { setPhone(event.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Leave your message</Form.Label>
          <Form.Control as="textarea" rows={3} name="message" placeholder="want to learn during June"
            onChange={(event) => { setMessage(event.target.value) }} />
        </Form.Group>
        <h1 style={{ color:"red"}}>{ err }</h1>
        <Button variant="primary" onClick={async ({id}) => {
          setCourseId(id);
          const sign_up_course ={user_id,course_id,phone,message };
           try {
            
           const ret = await axios.post(API + POST + SIGNUPCOURSES, sign_up_course);
           console.log(ret.data);
           if(ret.data.status ==="conflict")
           {
              setErr("The coures already signed up!");
           }
           else
           {
              navigate("/courses");
           }
      
          } catch (error) {
            console.error(error.message);
          }
        }
        } >Apply</Button>
      </Card.Body>
    </Card>
  );

};



const Home = () => {

  const [courses, setCourses] = useState([]);
  const { user } = useAuth()
  const [user_id, setUserId] = useState("1");

  async function getAllCourses() {

    try {
      const response = await axios.get(API + COURSES);
      const courses = response.data;
      console.log(courses);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCourses();
    if(user){
    setUserId(user.user_id);
    }
    
  }, [user]);


  const CardRow = () => {
    return courses.map((course, index) => <CardSquare key={index} course={course} user_id ={ user_id } />);

  };



  return (
    <Container style={{ marginLeft: "0rem" }}>
      <HeaderBar />
      {!! !user && (
        <Link to="/login">
          <div className="container-fluid bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: `url( ${img1} )`, height: "100vh" }} >
            <div className="row">
              <div className="col py-auto my-auto ">
                <p>
                  <h2> 编程改变未来，让我们快乐编程</h2>
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
      {!! user && (
        <>
          <div className="container-fluid bg-image d-flex justify-content-center align-items-center" style={{ backgroundImage: `url( ${img1} )`, height: "100vh" }} >
            <div className="row">
              <div className="col py-auto my-auto ">
                <p>
                  <h2> 编程改变未来，让我们快乐编程</h2>
                </p>
              </div>
            </div>
          </div>

          <Container id="courseList">
            <Row xs={3} >
              <CardRow />
            </Row>
          </Container>

          {/*
          <div className="container" id="courseList">
            <div classsName="row">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://www.techrepublic.com/wp-content/uploads/2022/06/free-python-training.jpeg" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Apply</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
      */}
        </>

      )}

    </Container>
  );
}


export default Home;