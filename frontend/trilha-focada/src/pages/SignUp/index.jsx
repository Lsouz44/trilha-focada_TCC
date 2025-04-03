import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"
import * as yup from 'yup';
import Axios from 'axios';

import { Container, Title, Form, FormGroup, FormField, FormError, Img, Label, SelectWrapper, OptionsContainer, Info } from './styles';
import { Button } from '../../components/Button';
import React from 'react';
import logo from '../../assets/logo/logo_trilhafocada_semslogan_black.png'


export function SignUp() {

  const navigate = useNavigate()

  function handleHome() {
    navigate("/login")
  }

  function handleBack() {
    navigate("/")
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

      <Img 
          src={logo} 
          alt="Logo Trilha Focada" 
          className="logo-top" 
      />
  
      <Title>Crie sua conta</Title>
      <Formik
          initialValues={{ name: "", type: "", email: "", password: "", confirmPassword: "" }}
          onSubmit={handleClickRegister}
          validationSchema={validationRegister}>
          
          {({ values, handleChange }) => (
          <Form>
          
          <FormGroup>
              <Label htmlFor='name'>Nome: </Label>
              <FormField name="name"
              placeholder="Ex: João Carlos"
              onChange={handleChange}
              value={values.name} />

              <FormError component="span"
              name="name" />

          </FormGroup>
          
          <FormGroup>
                <Label htmlFor='type-user'>Tipo de usuário: </Label>
                <SelectWrapper>
                  <FormField as="select"
                    name="type"
                    onChange={handleChange}
                    value={values.type}>

                      <option value="" label="" />
                      <option value="1" label="Trilheiro" />
                      <option value="2" label="Guia" />

                  </FormField>
                </SelectWrapper>

                <FormError component="span"
                name="type" />
                
          </FormGroup>
          
          <FormGroup>
              <Label htmlFor='email'>Email: </Label>
              <FormField name="email"
              placeholder="exemplo@email.com"
              onChange={handleChange}
              value={values.email} />

              <FormError component="span"
              name="email" />

          </FormGroup>

          <FormGroup>
              <Label htmlFor='password'>Senha: </Label>
              <FormField name="password"
              type="password"
              onChange={handleChange}
              value={values.password} />

              <FormError component="span"
              name="password"/>
              
          </FormGroup>

          <FormGroup>
              <Label htmlFor='confirmed-password'>Confirmar senha: </Label>
              <FormField name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword} />

              <FormError component="span"
              name="confirmPassword" />
              
          </FormGroup>

          <OptionsContainer>
            <Info>
              <input type="checkbox" id="newsletter" />
              <span>Aceito receber notificações e publicidade pelo email.</span>
            </Info>

            <Info>
              <input type="checkbox" id="term" />
              <span>Ao preencher o formulario acima voce concorda com nossos Termos de uso e nossa Política de Privacidade.</span>
            </Info>
          </OptionsContainer>

          <Button title="Criar conta"
          className="login-button"
          type="submit" $opacity />

          <Button title="Voltar"
          className="login-button"
          onClick={handleBack} $opacity />
          
          </Form>
          )}
      </Formik>

    </ Container>
  )
}
