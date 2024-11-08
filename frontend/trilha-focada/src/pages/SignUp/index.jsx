import { Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

import { Container, Title, Form, FormGroup, FormField, FormError } from './styles';
import { Button } from '../../components/Button';


export function SignUp() {

    const handleClickRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
          email: values.email,
          password: values.password,
        }).then((response) => {
          alert(response.data.msg);
          console.log(response);
        });
    };

    const validationRegister = yup.object().shape({
        email: yup
          .string()
          .email("Não é um email")
          .required("Este campo é obrigatório"),
        password: yup
          .string()
          .min(8, "A senha deve ter 8 caracteres")
          .required("Este campo é obrigatório"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas não são iguais")
        .required("Este campo é obrigatório"),
    });
    
    return (
        <Container>
        <Title>Cadastro</Title>
        <Formik
            initialValues={{}}
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}>

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
                placeholder="Senha" />

                <FormError component="span"
                name="password"/>
                
            </FormGroup>

            <FormGroup>

                <FormField name="confirmPassword"
                type="password"
                placeholder="Confirme sua senha" />

                <FormError component="span"
                name="confirmPassword" />
                
            </FormGroup>

            <Button title="Cadastrar"
            className="login-button"
            type="submit" $opacity />

            </Form>

        </Formik>

        </ Container>
    )
}
