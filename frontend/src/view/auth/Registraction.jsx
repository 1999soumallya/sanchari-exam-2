import React, { useState } from 'react'
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from '../../config/axios'
import { toast } from 'react-toastify'
import { setCookie } from '../../helper/cookiesHelper'
import { AuthState } from '../../context/AuthContext'

export default function Registration() {

    const { setIsAuthorized, setUserDetails } = AuthState()
    const [value, setValue] = useState({ userName: '', email: '', password: '' })

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/auth/registration', value).then(({ data }) => {
            if (data.success) {
                toast.success(data.message)
                setCookie('auth_token', data.token)
                setIsAuthorized(true)
                setUserDetails(data.data)
            } else {
                toast.error(data.message)
            }
        }).catch((error) => {
            toast.error(error.response ? error.response.data.message : error.toString())
        })
    }

    return (
        <Container>
            <div className="d-flex justify-content-center h-100">
                <Card>
                    <Card.Header>
                        <h3>Sign In</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(event) => handleSubmit(event)}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-user"></i>
                                </InputGroup.Text>
                                <Form.Control placeholder="username" aria-label="username" type='text' aria-describedby="basic-addon1" required value={value.userName} onChange={(event) => setValue({ ...value, userName: event.target.value })} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-envelope"></i>
                                </InputGroup.Text>
                                <Form.Control placeholder="email" aria-label="email" type='email' aria-describedby="basic-addon1" required value={value.email} onChange={(event) => setValue({ ...value, email: event.target.value })} />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <i className="fas fa-key" />
                                </InputGroup.Text>
                                <Form.Control placeholder="password" aria-label="password" type='password' aria-describedby="basic-addon1" required value={value.password} onChange={(event) => setValue({ ...value, password: event.target.value })} />
                            </InputGroup>

                            <Button type='submit' variant="outline-success" className='w-100'>Success</Button>
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<Link to="/">Sign In</Link>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </Container>
    )
}
