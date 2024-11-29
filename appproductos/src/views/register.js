import React, { useState } from 'react';
<<<<<<< HEAD
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
=======
import { Container, Button, Col, Form, Row, Alert } from 'react-bootstrap';
>>>>>>> origin/main

const Register = () => {
<<<<<<< HEAD
    const [formData, setFormData] = useState({
        nombre: 'seba salgado',
        correo: '',
        direccion: '1234 Calle Falsisima',
        rol: 'Administrador',
        password: '',
    });

    const [message, setMessage] = useState(''); // Estado para mensajes de éxito o error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        if (!formData.nombre || !formData.correo || !formData.direccion || !formData.rol || !formData.password) {
            setMessage('Por favor completa todos los campos.');
            return;
        }
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
        <Container fluid="lg">
            <h2>Registro de Usuario</h2>
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
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Correo electrónico
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            placeholder="mail@job.com"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Contraseña
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            placeholder="*******"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Col>
                    <Form.Text muted>
                        La contraseña debe tener 8-20 caracteres, entre letras y números,
                        y no debe contener caracteres especiales, espacios ni emojis.
                    </Form.Text>
                </Form.Group>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Roles de usuario
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Administrador"
                                name="rol"
                                value="Administrador"
                                checked={formData.rol === "Administrador"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Delivery"
                                name="rol"
                                value="Delivery"
                                checked={formData.rol === "Delivery"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Comprador"
                                name="rol"
                                value="Comprador"
                                checked={formData.rol === "Comprador"}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
=======
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
>>>>>>> origin/main

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
};

export default Register;
