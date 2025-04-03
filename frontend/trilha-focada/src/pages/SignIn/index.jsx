import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import Axios from 'axios';

import { Container, Title, Form, FormGroup, FormField, FormError, Label, Img, OptionsContainer, RememberMe, ForgotPassword } from './styles';
import { Button } from '../../components/Button';
import logo from '../../assets/logo/logo_trilhafocada_semslogan_black.png'

export function SignIn() {

        const navigate = useNavigate()

        function handleHome() {
            navigate("/home")
        }

        function handleSingUp() {
          navigate("/register")
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

            <Img 
                src={logo} 
                alt="Logo Trilha Focada" 
                className="logo-top" 
            />

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

                <OptionsContainer>
                  <RememberMe>
                    <input type="checkbox" id="remember" />
                    Lembrar de mim
                  </RememberMe>
                  <ForgotPassword href="/">Esqueceu sua senha?</ForgotPassword>
                </OptionsContainer>

                <hr></hr>

                <Form>
                  <label>Não tem uma conta?</label>
                </Form>

                <Button title="Criar conta"
                className="singup-button"
                onClick={handleSingUp} $opacity />
    
            </Form>
    
            </Formik>
    
        </Container>
    )
}
