import { Paper, Typography } from '@mui/material';
import { Container, Col, Row, Table } from 'react-bootstrap';
import { BsBank2 } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import Logo from '../../assets/img.png'
import TextField from '@mui/material/TextField';
import "../Login.css"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import StaffAccount from '../../Store/action/StaffAccount';
import { connect } from 'react-redux';
import axios from 'axios';

function Admin_Dashboard(props) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [firstName, setFirstName] = useState('');
    let [verificationCode, setVerificationCode] = useState('');
    let [isVerified, setIsVerified] = useState(false);

    const sendVerificationCode = async () => {
        try {
            const response = await axios.post('/api/send-verification-code', { email });
            toast.success('Verification code sent to your email');
        } catch (error) {
            toast.error('Failed to send verification code');
        }
    }

    const verifyCode = async () => {
        try {
            const response = await axios.post('/api/verify-code', { email, verificationCode });
            if (response.data.success) {
                setIsVerified(true);
                toast.success('Email verified');
            } else {
                toast.error('Invalid verification code');
            }
        } catch (error) {
            toast.error('Failed to verify code');
        }
    }

    const staff_Create = async () => {
        if (!isVerified) {
            toast.error("Email must be verified", {
                position: "bottom-center",
            });
        } else if (firstName === '' || email === '' || password === '' || confirmPassword === '') {
            toast.error("All fields are required", {
                position: "bottom-center",
            });
        } else if (password.length < 8) {
            toast.error("Password must be at least 8 characters long", {
                position: "bottom-center",
            });
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "bottom-center",
            });
        } else {
            const isValid = /\S+@\S+\.\S+/.test(email);
            if (!isValid) {
                toast.error("Email is not valid", {
                    position: "bottom-center",
                });
            } else {
                try {
                    const isEmailRegistered = await axios.post('/api/is-email-registered', { email });
                    if (isEmailRegistered.data.isRegistered) {
                        toast.error("This email is already registered", {
                            position: "bottom-center",
                        });
                    } else {
                        await axios.post('/api/create-staff', { email, password, name: firstName, status: true });
                        toast.success("Staff registered successfully", {
                            position: "bottom-center",
                        });
                    }
                } catch (error) {
                    toast.error("Failed to create staff", {
                        position: "bottom-center",
                    });
                }
            }
        }
    }

    return (
        <>
            <Container fluid style={{ backgroundColor: "#01065D", boxShadow: "10px 10px 100px white" }} >
                <Row>
                    <Col lg={6} >
                        <BsBank2 size="30" color='white' style={{ marginTop: "10px", marginBottom: "8px" }} />
                    </Col>
                    <Col lg={6} style={{ textAlign: "right", marginTop: "12px", marginBottom: "12px" }}>
                        <h5 style={{ color: "white", fontFamily: 'Lobster', }}>Super Admin</h5>
                    </Col>
                </Row>
            </Container>
            <Container className='mt-3'>
                <Row>
                    <Col lg={12} className='text-center'>
                        <Link to="/Admin_Dashboard">
                            <Button variant="contained" style={{ marginLeft: "10px", width: "22%", margin: "1%", backgroundColor: "#01065D" }} >Create Staff</Button>
                        </Link>
                        <Link to="/View_Staff">
                            <Button variant="outlined" style={{ marginLeft: "10px", width: "22%", margin: "1%" }} >View Staff</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col lg={3}></Col>
                    <Col lg={6} style={{ border: "1px solid grey" }} className='text-center mt-5'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <TextField value={firstName} onChange={(e) => setFirstName(e.target.value)} size="small" style={{ width: "80%", marginTop: "5%" }} id="outlined-basic" label="Enter Staff Name" variant="outlined" className='form-control' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <TextField value={email} onChange={(e) => setEmail(e.target.value)} size="small" style={{ width: "80%", margin: "1%" }} id="outlined-basic" label="Enter Staff Email" variant="outlined" className='form-control' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <TextField value={password} onChange={(e) => setPassword(e.target.value)} size="small" style={{ width: "80%", margin: "1%" }} id="outlined-basic" label="Enter Password" variant="outlined" className='form-control' type="password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="small" style={{ width: "80%", margin: "1%" }} id="outlined-basic" label="Enter Confirm Password" variant="outlined" className='form-control' type="password" />
                        </Form.Group>
                        <br />
                        <Button size="small" onClick={() => staff_Create()} style={{ backgroundColor: "#01065D", height: "40px", color: "white", width: "50%", display: "block", margin: "auto" }} type="submit" className='form-control' >
                            Create
                        </Button>
                        <ToastContainer autoClose={1000}
                            hideProgressBar={false}
                            theme="dark"
                        />
                        <br />
                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    count: state.count,
    staff: state.staff
})

const mapDispatchToProps = (dispatch) => ({
    StaffAccount: (data) => dispatch(StaffAccount(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin_Dashboard);
