import { Paper, Typography } from '@mui/material';
import { Container, Col, Row } from 'react-bootstrap';
import { BsBank2 } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/img.png'
import TextField from '@mui/material/TextField';
import "./Login.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUsers from '../Store/action';


function SignUp(props) {
    let [Firstname, setFirstname] = useState()
    let [Lastname, setLastname] = useState()
    let [email, setemail] = useState()
    let [password, setpassword] = useState()
    let [confpassword, setconfpassword] = useState()


    const regUser = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
        if (Firstname == undefined || Firstname == "") {
            toast.error("Enter Full Name", {
                position: "bottom-center",
            });
        } else if (email == undefined || email == "") {
            toast.error("Enter Email Address", {
                position: "bottom-center",
            });
        } else if (password == undefined || password == "") {
            toast.error("Enter Password", {
                position: "bottom-center",
            });
        } else if (confpassword == undefined || confpassword == "") {
            toast.error("Enter Confirm Password", {
                position: "bottom-center",
            });
        } else if (password.length < 8) {
            toast.error("Password Must Be Greater Then 8 Letter", {
                position: "bottom-center",
            });
        } else if (confpassword !== password) {
            toast.error("Password Not Matched", {
                position: "bottom-center",
            });
        } else if (!passwordRegex.test(password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long", {
                position: "bottom-center",
            });
        } else {
            const isValid = /\S+@\S+\.\S+/.test(email);
            if (isValid == false) {
                toast.error("Email is Not Valid", {
                    position: "bottom-center",
                });
            } else {
                let res = isEmailRegistered(props, email)
                if (res == true) {
                    toast.error("This Email Already Registered", {
                        position: "bottom-center",
                    });
                } else {
                    props.AddUsers({
                        email: email,
                        password: password,
                        accountBalance: 0,
                        name: Firstname,
                        transactionHistory : [],
                        accountsCreate : [],
                        UsersBenficiary :[],
                        status:true
                    })
    
                    toast.success("User Registration Succefully", {
                        position: "bottom-center",
                    });
                }
            }
        }
    }
    

    const isEmailRegistered = (state, email) => {
        return state.user.some(user => user.email === email);
    };


    return (
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
            <Container style={{ margin: "1%" }}   >
                <Row>
                    <Col lg={4}>

                    </Col>

                    <Col lg={6} style={{ border: "1px solid #020431", boxShadow: "10px 10px 5px grey", borderRadius: "5%", padding: "2%", marginTop: "50" }}>


                        <br />

                        <h3 style={{ color: "#01065D", textAlign: "center", fontFamily: "DynaPuff", textShadow: "10px 10px 100px blue" }}>Create Account</h3>
                        <br />
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <TextField value={Firstname || ""} onChange={(e) => setFirstname(e.target.value)} id="outlined-basic" label="Enter name" variant="outlined" className='form-control' />

                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formBasicPassword">

                            <TextField value={email || ""} onChange={(e) => setemail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" className='form-control' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <TextField
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                className='form-control'
                                type="password"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <TextField
                                value={confpassword}
                                onChange={(e) => setconfpassword(e.target.value)}
                                id="outlined-basic"
                                label="Confirm Password"
                                variant="outlined"
                                className='form-control'
                                type="password"
                            />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" style={{ color: "#01065D" }} />
                        </Form.Group>


                        <Button style={{ backgroundColor: "#040B87", height: "50px" }} type="submit" className='form-control' onClick={() => regUser()}>
                            Register
                        </Button>
                        <br />


                        <br />
                        <Row>
                            <Col lg={6}>
                                <ToastContainer autoClose={1000}
                                    hideProgressBar={false}
                                    theme="dark"
                                />
                                {/* <h5 style={{ color: "black", textAlign: "left", fontSize: "13px", fontFamily: "DynaPuff", textShadow: "10px 10px 100px blue" }}>Forgot Password</h5> */}

                            </Col>
                            <Col lg={6}>
                                <h5 style={{ color: "black", textAlign: "right", fontSize: "13px", fontFamily: "DynaPuff", textShadow: "10px 10px 100px blue" }}>
                                    Already Has An  Account ?   <Link to={"/"}>
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
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    count: state.count
})


const mapDispatchToProps = (dispatch) => ({
    AddUsers: (data) => dispatch(AddUsers(data)),


})


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
