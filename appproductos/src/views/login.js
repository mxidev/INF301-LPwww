import React, { useState } from "react";
import './assets/custom.css';
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";

const Login = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto p-4 shadow rounded bg-white">
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    <p className="text-center text-muted mb-4">
                        Bienvenido de nuevo. Por favor, ingresa tus credenciales.
                    </p>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="empleado@job.com"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Debe ingresar un correo electrónico válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="********"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Debe ingresar una contraseña válida.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-between mb-3">
                            <Form.Check type="checkbox" label="Recordarme" />
                            <a href="#" className="text-decoration-none text-color-sushi">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </Form.Group>

                        <Button type="submit" className="w-100 mb-3 btn btn-outline-danger">
                            Iniciar sesión
                        </Button>
                    </Form>

                    <Alert variant="secondary" className="text-center">
                        ¿No tienes una cuenta?{" "}
                        <a href="/register" className="text-decoration-none text-color-sushi">
                            Regístrate aquí
                        </a>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;