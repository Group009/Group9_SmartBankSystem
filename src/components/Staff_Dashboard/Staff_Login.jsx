import { Paper, Typography } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
import { BsBank2 } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../../assets/img.png'
import TextField from '@mui/material/TextField';
import "../Login.css"
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';

function Staff_Login(props) {

    let [email, setemail] = useState()
    let [password, setpassword] = useState()

    let navigate = useNavigate()

    // Default staff email IDs and passwords
    const defaultStaffCredentials = [
        { email: "staff1@gmail.com", password: "password1" },
        { email: "staff2@gmail.com", password: "password2" },
        { email: "staff3@gmail.com", password: "password3" }
    ];

    const login_staff = () => {
        if (email == undefined || email == "") {
            toast.error("Enter Email Address", {
                position: "bottom-center",
            });
        } else if (password == undefined || password == "") {
            toast.error("Enter Password", {
                position: "bottom-center",
            });
        } else {
            const foundStaff = defaultStaffCredentials.find(staff => staff.email === email && staff.password === password);
            if (foundStaff) {
                toast.success("Login Successfully", {
                    position: "bottom-center",
                });
                navigate("/StaffDashboard");
            } else {
                toast.error("Invalid email or password", {
                    position: "bottom-center",
                });
            }
        }
    }

    return (
        <>
            <div style={{ backgroundColor: "white" }}>
                <Container fluid style={{ backgroundColor: "#01065D", boxShadow: "10px 10px 100px white" }}>
                    <Row>
                        <Col lg={6} >
                            <BsBank2 size="30" color='white' style={{ marginTop: "10px", marginBottom: "8px" }} />
                        </Col>
                        <Col lg={6} style={{ textAlign: "right", marginTop: "12px", marginBottom: "12px" }}>
                            <h5 style={{ color: "white", fontFamily: 'Lobster', }}>Staff Corner</h5>
                        </Col>
                    </Row>
                </Container>
                <Container style={{ margin: "2%" }}   >
                    <Row>
                        <Col lg={4}>
                        </Col>
                        <Col lg={6} style={{ border: "1px solid #020431", boxShadow: "10px 10px 5px grey", borderRadius: "5%", padding: "2%", marginTop: "50" }}>
                            <br />
                            <h3 style={{ color: "#01065D", textAlign: "center", fontFamily: "DynaPuff", textShadow: "10px 10px 100px blue" }}>Login As Staff</h3>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <TextField value={email} onChange={(e) => setemail(e.target.value)} id="outlined-basic" label="Enter Email" variant="outlined" className='form-control' />
                            </Form.Group>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <TextField type="password" value={password} onChange={(e) => setpassword(e.target.value)} id="outlined-basic" style={{ borderRadius: "40%" }} label="Ente Password" variant="outlined" className='form-control' />
                            </Form.Group>
                            <Button onClick={() => login_staff()} style={{ backgroundColor: "#040B87", height: "50px" }} type="submit" className='form-control'>
                                Login
                            </Button>
                            <ToastContainer autoClose={1000} hideProgressBar={false} theme="dark" />
                            <br />
                            <br />
                            <Row>
                                <Col lg={6}>
                                </Col>
                                <Col lg={6}>
                                    <h5 style={{ color: "black", textAlign: "right", fontSize: "13px", fontFamily: "DynaPuff", textShadow: "10px 10px 100px blue" }}>
                                        Own An Account With Us ? <Link to={"/"}>
                                            Login
                                        </Link>
                                    </h5>
                                    <br />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={2}>
                        </Col>
                    </Row>
                </Container>
                <Container className='footer' fluid style={{ backgroundColor: "#01065D", boxShadow: "10px 10px 100px grey" }}>
                    <Row>
                        <Col lg={12} style={{ textAlign: "center", }}>
                            <h5 style={{ color: "white", fontFamily: 'Lobster', }}>All right resereved@Group9</h5>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Staff_Login;
