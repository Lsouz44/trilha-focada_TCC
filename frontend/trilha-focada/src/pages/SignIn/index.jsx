import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import Axios from 'axios';

import { Container, Title, Form, FormGroup, FormField, FormError, Label } from './styles';
import { Button } from '../../components/Button';

export function SignIn() {

        const navigate = useNavigate()

        function handleHome() {
            navigate("/home")
        }

        function handleClickLogin(values){
          Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password,
          }).then((response) => {
            if (response.data.result === true){
              const { token } = response.data;
              localStorage.setItem('token', token);
              handleHome();
            } else {
            }
            alert(response.data.msg);
          }).catch((error) => {
            console.error("Erro ao fazer login:", error);
          });
        }
      
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
                    <Label htmlFor='senha'>Email: </Label>
                    <FormField name="email"
                    placeholder="exemplo@email.com" />
        
                    <FormError component="span"
                    name="email" />
    
                </FormGroup>
    
                <FormGroup>

                    <Label htmlFor='senha'>Senha: </Label>
                    <FormField name="password"
                    type="password" />
        
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
