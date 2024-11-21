import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const Register = () => {
    return (
        <Container fluid="lg">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Correo electronico
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="mail@job.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Contraseña
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" placeholder="*******" />
                    </Col>
                    <Form.Text muted>
                        La constraseña debe tener 8-20 caracteres, entre letras y numeros,
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
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                type="radio"
                                label="Delivery"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                type="radio"
                                label="Comprador"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
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
}

export default Register;