import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import Axios from 'axios';

import { Container, Title, Form, FormGroup, FormField, FormError } from './styles';
import { Button } from '../../components/Button';

export function SignIn() {

        const navigate = useNavigate()

        function handleHome() {
            navigate("/home")
        }

        const handleClickLogin = (values) => {
          Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password,
          }).then((response) => {
            handleHome()
            console.log(response);
          });
        };
      
        const validationLogin = yup.object().shape({
          email: yup
            .string()
            .email("Não é um email")
            .required("Este campo é obrigatório"),
          password: yup
            .string()
            .required("Este campo é obrigatório"),
        });

    return (
        <Container>
            <Title>Login</Title>
            <Formik
            initialValues={{}}
            onSubmit={handleClickLogin}
            validationSchema={validationLogin}>
    
            <Form>
    
                <FormGroup>
    
                    <FormField name="email"
                    placeholder="Email" />
        
                    <FormError component="span"
                    name="email" />
    
                </FormGroup>
    
                <FormGroup>
    
                    <FormField name="password"
                    type="password"
                    placeholder="Password" />
        
                    <FormError component="span"
                    name="password" />
                
                </FormGroup>
    
                <Button title="Login"
                className="login-button"
                type="submit" $opacity />
    
            </Form>
    
            </Formik>
    
        </Container>
    )
}
