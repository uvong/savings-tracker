import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import "./CustomBootstrap.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Incorrect Email/Password");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  return (
    <>
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

        <div className="w-100">
          <Card>
            <Card.Body>
              <h1 className="text-center">Welcome</h1>
              <div className="text-center mb-4">Sign into your account</div>
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
                <Button
                  className="w-100 mt-2 rounded-pill custom-btn"
                  type="submit"
                >
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
    </>
  );
}

export default Login;
