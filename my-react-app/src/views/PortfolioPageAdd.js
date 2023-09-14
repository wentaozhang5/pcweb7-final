import React,{ useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { POST,API, PORTFOLIOS } from "../constants";
import axios from "axios";

export default function PortfolioPageAdd() {
    
    const [title, setTitle] = useState("");
    const [course_name, setCourseName] = useState("");
    const [video_clip, setVideoClip] = useState("");
    const [description, setDescription] = useState("");
  
    const navigate = useNavigate();


    return (
        <>
            <Navbar variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        Add Portfolio Case
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                <h1 style={{ marginBlock: '1rem' }} > Add Portfolio case  here </h1>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label> Title</Form.Label>
                        <Form.Control type="text" placeholder="Python" value = {title} 
                          onChange={(event)=>{setTitle(event.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="course_name">
                        <Form.Label> Course Name</Form.Label>
                        <Form.Control type="text" placeholder="Python" value = {course_name} 
                          onChange={(event)=>{ setCourseName(event.target.value) } } />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descrition">
                        <Form.Label> Description</Form.Label>
                        <Form.Control type="text" placeholder="python is a popular programming" value = {description} 
                          onChange={(event)=>{setDescription(event.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="video_clip">
                        <Form.Label>Video Clip URL</Form.Label>
                        <Form.Control type="text" placeholder="https://https://www.youtube.com/embed/tgbNymZ7vqY" 
                         value = {video_clip} 
                         onChange={(event) => setVideoClip(event.target.value)} />
                        <Form.Text className="text-muted">
                            Make sure the URL has a video from youtube.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary"
                     onClick={async (e) =>{
                        const PortfolioCase = { title,course_name,description,video_clip};
                        try {
                            await axios.post(API + POST + PORTFOLIOS,PortfolioCase);
                            navigate("/portfolios");

                        } catch (error) {
                            console.error(error.message);
                        }
                     }
                     } >Submit</Button>
                </Form>
            </Container>

        </>
    );
}