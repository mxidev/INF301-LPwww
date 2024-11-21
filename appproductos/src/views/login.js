import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        <Container fluid="md">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo electronico</Form.Label>
                    <Form.Control type="email" placeholder="empleado@job.com" required />
                    <Form.Control.Feedback type="invalid">
                        Debe ingresar un correo electronico valido.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Nunca compartiremos tu correo con nadie mas.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="********" required />
                    <Form.Control.Feedback type="invalid">
                        Debe ingresar una contraseña valida.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Iniciar sesion
                </Button>

                <Form.Group className="mb-3" controlId="formRegister">
                    <Form.Text>
                        Nunca compartiremos tu correo con nadie mas.
                    </Form.Text>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Login;