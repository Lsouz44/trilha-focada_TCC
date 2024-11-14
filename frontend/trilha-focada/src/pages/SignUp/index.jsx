import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import Axios from 'axios';

import { Container, Title, Form, FormGroup, FormField, FormError } from './styles';
import { Button } from '../../components/Button';
import React from 'react';


export function SignUp() {

  const navigate = useNavigate()

  function handleHome() {
    navigate("/login")
  }

  const handleClickRegister = (values) => {
      Axios.post("http://localhost:3001/register", {
        name: values.name,
        type: values.type,
        email: values.email,
        password: values.password,
      }).then((response) => {
        alert(response.data.msg);
        handleHome()
        console.log(response);
      });
  };

  const validationRegister = yup.object().shape({
      name: yup
        .string()
        .required("Este campo é obrigatório"),
      type: yup
        .string()
        .required("Este campo é obrigatório"),
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
      <Title>Crie sua conta</Title>
      <Formik
          initialValues={{ name: "", type: "", email: "", password: "", confirmPassword: "" }}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}>
          
          {({ values, handleChange }) => (
          <Form>
          
          <FormGroup>

              <FormField name="name"
              placeholder="Nome"
              onChange={handleChange}
              value={values.name} />

              <FormError component="span"
              name="name" />

          </FormGroup>
          
          <FormGroup>
                
                <FormField as="select"
                name="type"
                onChange={handleChange}
                value={values.type}>

                  <option value="" label="Selecione o tipo de usuário" />
                  <option value="1" label="Usuário" />
                  <option value="2" label="Acompanhante" />

                </FormField>

                <FormError component="span"
                name="type" />
                
          </FormGroup>
          
          <FormGroup>

              <FormField name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email} />

              <FormError component="span"
              name="email" />

          </FormGroup>

          <FormGroup>

              <FormField name="password"
              type="password"
              placeholder="Senha"
              onChange={handleChange}
              value={values.password} />

              <FormError component="span"
              name="password"/>
              
          </FormGroup>

          <FormGroup>

              <FormField name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              onChange={handleChange}
              value={values.confirmPassword} />

              <FormError component="span"
              name="confirmPassword" />
              
          </FormGroup>

          <Button title="Cadastrar"
          className="login-button"
          type="submit" $opacity />
          
          </Form>
          )}
      </Formik>

    </ Container>
  )
}
