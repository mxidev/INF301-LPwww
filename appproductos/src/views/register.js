import React, { useState } from 'react';
import { Container, Button, Col, Form, Row, Alert } from 'react-bootstrap';


const Register = () => {
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
                <Col md={6} lg={5} className="mx-auto p-4 shadow rounded bg-white">
                    <h2 className="text-center mb-4">Crear Cuenta</h2>
                    <p className="text-center text-muted mb-4">
                        Regístrate para acceder a todos nuestros servicios.
                    </p>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                Correo Electrónico
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="email"
                                    placeholder="mail@job.com"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingresa un correo electrónico válido.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={3}>
                                Contraseña
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="password"
                                    placeholder="********"
                                    required
                                    minLength={8}
                                    maxLength={20}
                                />
                                <Form.Control.Feedback type="invalid">
                                    La contraseña debe tener entre 8 y 20 caracteres.
                                </Form.Control.Feedback>
                                <Form.Text muted>
                                    La contraseña debe contener letras y números, sin caracteres especiales.
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <fieldset>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={3}>
                                    Rol de Usuario
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Check
                                        type="radio"
                                        label="Administrador"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Delivery"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Comprador"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Selecciona un rol de usuario.
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </fieldset>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 9, offset: 3 }}>
                                <Button type="submit" className="w-100 btn btn-outline-danger">
                                    Registrarse
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>

                    <Alert variant="secondary" className="text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <a href="/" className="text-decoration-none text-color-sushi">
                            Inicia sesión aquí
                        </a>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;