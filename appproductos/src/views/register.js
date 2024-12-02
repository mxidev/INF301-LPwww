import React, { useState } from 'react';
import { Container, Button, Col, Form, Row, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        direccion: '',
        rol: '',
        password: '',
    });

    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        event.preventDefault();
        const query = `
            mutation {
                registrarUsuario(input: {
                    nombre: "${formData.nombre}",
                    correo: "${formData.correo}",
                    direccion: "${formData.direccion}",
                    rol: "${formData.rol}",
                    password: "${formData.password}"
                }) {
                    id
                    nombre
                    correo
                    rol
                }
            }
        `;

        try {
            const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            const result = await response.json();

            if (result.errors) {
                setMessage(`Error: ${result.errors[0].message}`);
            } else {
                setMessage(`Usuario ${result.data.registrarUsuario.nombre} registrado con éxito!`);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            setMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100">
                <Col md={6} lg={5} className="mx-auto p-4 shadow rounded bg-white">
                    <h2 className="text-center mb-4">Crear Cuenta</h2>
                    <p className="text-center text-muted mb-4">
                        Regístrate para acceder a todos nuestros servicios.
                    </p>

                    {message && (
                        <div
                            style={{
                                marginBottom: '20px',
                                color: message.includes('Error') ? 'red' : 'green',
                            }}
                        >
                            {message}
                        </div>
                    )}

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                Correo Electrónico
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="email"
                                    placeholder="mail@job.com"
                                    name="correo"
                                    value={formData.correo}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                        name="rol"
                                        value="Administrador"
                                        checked={formData.rol === "Administrador"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Delivery"
                                        name="rol"
                                        value="Delivery"
                                        checked={formData.rol === "Delivery"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Comprador"
                                        name="rol"
                                        value="Comprador"
                                        checked={formData.rol === "Comprador"}
                                        onChange={handleChange}
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
};

export default Register;
