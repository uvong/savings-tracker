import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button } from "react-bootstrap";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [passwordConfirm, setPasswordConfirm] = useState();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register();
    navigate("/");
  };

  return (
    <>
      <style type="text/css">
        {`
    .custom-btn {
      background-color: #6610f2;
      color: white;
    }

    .custom-btn:hover {
      background-color: #520dc2;
      color: white;
  }

  .custom-card {
    background-color: #6610f2;
    color: white;
    font-size: large;
}
    `}
      </style>
      <Container
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh", maxWidth: "400px" }}
      >
        <Card
          className="d-flex w-100 text-center justify-content-center fs-1 custom-card"
          style={{ minHeight: "20vh" }}
        >
          Indigo
        </Card>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Signup</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Form.Group>
                <Button className="w-100 custom-btn" type="submit">
                  Signup
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <div className="text-center w-100 mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Container>
    </>
  );
}

export default Register;
