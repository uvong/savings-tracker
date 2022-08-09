import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Incorrect Email/Password");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //have condiitonal where if login is successful then
    //can call nav function. 
    //else say the password is incorrect 
    login();
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4">Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
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
              <Button className="w-100 mt-2" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <div className="text-center w-100 mt-2">
        Don't have an account? <Link to="/register">Signup</Link>
      </div>
    </Container>
  );
}

export default Login;
