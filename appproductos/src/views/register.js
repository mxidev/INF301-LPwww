import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Register = () => {
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

                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit">Registrarse</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Register;
