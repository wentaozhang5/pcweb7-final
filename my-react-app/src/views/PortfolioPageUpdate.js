import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PUT, API, PORTFOLIOS } from "../constants";
import axios from "axios";
import HeaderBar from "./AppNavBar";

export default function PortfolioPageUpdate() {

    const params = useParams();
    const id = params.id;
    const [title, setTitle] = useState("");
    const [course_name, setCourseName] = useState("");
    const [video_clip, setVideoClip] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    async function getPortfolio(id) {
        const url = API + PORTFOLIOS + `/${id}`;
        const response = await axios.get(url);
        const { title, course_name, description, video_clip } = response.data;

        setTitle(title);
        setCourseName(course_name);
        setDescription(description);
        setVideoClip(video_clip);

    }

    useEffect(() => {
        getPortfolio(id);
    }, [id]);

    return (
        
            <Container>
                <HeaderBar />
                <h1 style={{ marginBlock: '1rem' }} > Update Portfolio Case</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label> Title</Form.Label>
                        <Form.Control type="text" placeholder="Python" value={title}
                            onChange={(event) => { setTitle(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="course_name">
                        <Form.Label> Course Name</Form.Label>
                        <Form.Control type="text" placeholder="Python" value={course_name}
                            onChange={(event) => { setCourseName(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="descrition">
                        <Form.Label> Description</Form.Label>
                        <Form.Control type="text" placeholder="python is a popular programming" value={description}
                            onChange={(event) => { setDescription(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="video_clip">
                        <Form.Label>Video Clip URL</Form.Label>
                        <Form.Control type="text" placeholder="https://https://www.youtube.com/embed/tgbNymZ7vqY"
                            value={video_clip}
                            onChange={(event) => setVideoClip(event.target.value)} />
                        <Form.Text className="text-muted">
                            Make sure the URL has a video from youtube.
                        </Form.Text>
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={async (e) => {
                            const PortfolioCase = { id, title , course_name,description,video_clip};
                            try {
                                await axios.put(API + PUT +PORTFOLIOS + "/" + id, PortfolioCase);
                                navigate("/portfolios");
                            } catch (error) {
                                console.error(error.message);
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>

        
    );
}