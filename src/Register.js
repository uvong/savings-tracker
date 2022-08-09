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
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
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
              <Button className="w-100" type="submit">
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
  );
}

export default Register;
