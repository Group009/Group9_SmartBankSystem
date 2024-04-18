import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { submitCustomerIssue } from './actions'; // Import the action creator

function CustomerCareSupport(props) {
  const [issueType, setIssueType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmitIssue = async () => {
    try {
      // Make an API call to the backend to submit the issue
      const response = await props.submitCustomerIssue({
        issueType,
        issueDescription,
      });

      if (response.success) {
        setResponse(response.message);
        setIssueType('');
        setIssueDescription('');
        setError('');
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      setError('An error occurred while submitting the issue. Please try again later.');
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col lg={3}></Col>
        <Col lg={7}>
          <Paper elevation={16}>
            <Typography>
              <h1
                style={{
                  color: 'black',
                  fontFamily: 'Faster',
                  fontWeight: 'bold',
                  paddingTop: '10px',
                  textAlign: 'center',
                }}
              >
                Customer Care Support
              </h1>

              <Form.Group className="mb-3" controlId="formBasicEmail" style={{ paddingTop: '20px', margin: 'auto', width: '60%' }}>
                <TextField
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  id="outlined-basic"
                  label="Issue Type"
                  variant="outlined"
                  className="form-control"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail" style={{ paddingTop: '20px', margin: 'auto', width: '60%' }}>
                <TextField
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  id="outlined-basic"
                  label="Issue Description"
                  variant="outlined"
                  className="form-control"
                  multiline
                  rows={4}
                />
              </Form.Group>

              <div style={{ textAlign: 'right', marginRight: '30px', marginTop: '1%' }}>
                <ToastContainer autoClose={1000} hideProgressBar={false} theme="dark" />
                <Button variant="contained" color="success" onClick={handleSubmitIssue}>
                  Submit
                </Button>
              </div>

              {response && (
                <div style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
                  <p>{response}</p>
                </div>
              )}

              {error && (
                <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
                  <p>{error}</p>
                </div>
              )}

              <br />
              <br /> <br />
            </Typography>
          </Paper>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  // Add any necessary state properties
});

const mapDispatchToProps = (dispatch) => ({
  submitCustomerIssue: (data) => dispatch(submitCustomerIssue(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCareSupport);