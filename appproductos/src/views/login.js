import React, { useState } from "react";
import './assets/custom.css';
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const Login = () => {
    const [validated, setValidated] = useState(false); // Agrega esta línea para definir el estado
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);

        const correo = form["formEmail"].value;
        const password = form["formPassword"].value;

        const query = `
          mutation {
            loginUsuario(correo: "${correo}", password: "${password}") {
              id
              nombre
              correo
              rol
            }
          }
        `;

        try {
            const response = await fetch("http://localhost:8080/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            const result = await response.json();

            if (result.errors) {
                alert(`Error: ${result.errors[0].message}`);
            } else {
                const usuario = result.data.loginUsuario;
                setUser(usuario);
                alert(`Bienvenido, ${usuario.nombre} (${usuario.rol})`);
                navigate("/p1");
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            alert("Error al conectar con el servidor.");
        }
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

                        <Button href="/p1" type="submit" className="w-100 mb-3 btn btn-outline-danger">
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
};

export default Login;
