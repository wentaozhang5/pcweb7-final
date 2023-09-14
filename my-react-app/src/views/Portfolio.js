import React, { useState, useEffect } from "react";
import {  Container, Row, Card } from "react-bootstrap";
import { API, DELETE, PORTFOLIOS } from "../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderBar from "./AppNavBar";


const CardSquare = ({ PortfolioCase,callBackFunc }) => {
    const { id, title, course_name, description, video_clip } = PortfolioCase;
    //const navigate = useNavigate();

    async function deletePortfolio(id) {
        const url = API + DELETE + PORTFOLIOS + `/${id}`;
        console.log(url);
        await axios.delete(url);
        //通过回调函数通知父 dom 刷新控件
        callBackFunc({id});
        //navigate("/portfolios");
    }
    return (
        <Card style={{
            objiectFit: "cover",
        }} >
            <iframe width="360" height="315" src={video_clip}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe>

            <Card.Body>
                <Card.Title><h1> {title}</h1></Card.Title>
                <Card.Subtitle><h3 style={{ color: "blue" }} > {course_name} </h3></Card.Subtitle>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Link href={`/put/portfolios/${id} `} >Edit</Card.Link>
                <Card.Link onClick={() => deletePortfolio(id)} style={{ cursor: "pointer" }}  > Delete </Card.Link>
            </Card.Body>
        </Card>
    );
}

const AddCardSquare = () => {

    return (<Card style={{ width: '18rem' }}>
        <Link
            to={`/add/portfolios`}
            style={{
                width: "18rem",
                marginLeft: "1rem",
                marginTop: "2rem",
            }}
        >
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwYCP0BbkTimYgdePeKrTb6qJSBEMDSx0aKA&usqp=CAU" />
        </Link>
        <Card.Body>
            <Card.Title>Add your portfolio case</Card.Title>
            <Card.Text>
                please add a portfolio case which is a video URL .
            </Card.Text>
        </Card.Body>
    </Card>
    );
}



export default function Portfolio() {

    const [cases, setCases] = useState([]);
    const [str,setStr] = useState("");

    //定义一个回调函数传给子控件，实现子控件通知父控件功能
    function  onCallbackFunc(freshState) {
     setStr(freshState);  
    };


    async function getAllCases() {
        try {
            const response = await axios.get(API + PORTFOLIOS);
            const PortfolioCases = response.data;
            console.log(PortfolioCases);
            setCases(PortfolioCases);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("useEffect called");
        getAllCases();

    }, [str]);


    const CardsRow = ({callBackFunc}) => {
        return cases.map((PortfolioCase, index) => <CardSquare key={index} PortfolioCase={PortfolioCase} callBackFunc ={callBackFunc}  />);

    };


    return (
        <>
            <HeaderBar />
            <Container>
                <Row xs={3}>
                    <CardsRow callBackFunc={onCallbackFunc }/>
                    <AddCardSquare />
                </Row>
            </Container>
        </>

    );
};



