import { Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Container, Title, Form, FormGroup, FormField, FormError,
        Img, Label } from './styles';
import logo from '../../assets/logo/logo_trilhafocada_horizontal_black.png';


export function SendInvite() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const handleHeaderHeightChange = (height) => {
        setHeaderHeight(height)
    }

    function handleGoBack() {
        navigate(-1)
    }

    function handleHome() {
        navigate("/home")
    }

    const handleClickSendInvite = async (values) => {
        try{
            const response = await Axios.post("http://localhost:3001/send-invite", {
                emailInvite: values.emailInvite,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`  // Envie o token no cabeçalho
                },
            });

            if (response.data.success) {
                alert(response.data.msg);
                handleHome();
            } else {
                alert(response.data.msg);
            }

        } catch (error) {
            console.error("Erro ao enviar convite:", error);
            alert('Erro ao enviar convite.');
        }
    };

    // const handleClickSendInvite = (values) => {
        
    //         Axios.post("http://localhost:3001/send-invite", {
    //             emailInvite: values.emailInvite,
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`  // Envie o token no cabeçalho
    //             },
    //         }).then((response) => {
    //             alert(response.data.msg);
    //             handleHome();
    //         }).catch((error) => {
    //             console.error("Erro ao enviar convite.", error);
    //         });
    // }

    const validationSendInvite = yup.object().shape({
        emailInvite: yup
            .string()
            .required("Insira um email"),
      });
  
    return (
        <Container>

            <Header
            onHeightChange={handleHeaderHeightChange}
            />

            <Img 
                src={logo} 
                alt="Logo Trilha Focada" 
                className="logo-top" 
            />

            <Title>Adicionar um acompanhante</Title>
                <Formik
                initialValues={{ emailInvite: "", }}
                onSubmit={handleClickSendInvite}
                validationSchema={validationSendInvite}
                >
                
                <Form>
                    
                        <FormGroup>

                            <h1>Insira o e-mail da pessoa que vai te acompanhar na TrilhaFocada®</h1>
                            <Label>Email:</Label>
                            <FormField name="emailInvite" />
                
                            <FormError component="span"
                            name="emailInvite" />
            
                        </FormGroup>
        
                    <Button title="Enviar convite"
                    className="newactivity-button"
                    type="submit" $opacity />

                    <Button title="Voltar"
                    className="newactivity-button"
                    type="button"
                    onClick={handleGoBack} $opacity />
        
                </Form>
                </Formik>

        </Container>
    )
}