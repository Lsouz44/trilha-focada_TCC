import { Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Menu } from '../../components/Menu';
import { Container, Title, Form, FormGroup, FormField, FormError,
        Label, CalendarSection, FlexContainer, FormSection } from './styles';


export function Profile () {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [fieldValue, setFieldValue] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    const handleHeaderHeightChange = (height) => {
        setHeaderHeight(height)
    }

    function handleHome() {
        navigate("/home")
    }

    function handleGoBack() {
        navigate(-1)
    }

    // Busca os dados do usuário no backend ao carregar o componente
    useEffect(() => {
        async function fetchUserData() {
        try {
            const response = await Axios.get("http://localhost:3001/profile", {
            headers: { Authorization: `Bearer ${token}` },
            });

            setUserData(response.data.user);
            console.log(response.data.user.avatar);

            if (response.data.user.avatar) {
                setAvatarPreview(`http://localhost:3001/uploads/avatars/${response.data.user.avatar}`); // Preenche o preview se o avatar já existir
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
        }
        fetchUserData();
    }, [token]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (values) => {
        // Cria um formData e adiciona o avatar somente se ele tiver sido alterado
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('phone', values.phone);
        formData.append('birth', values.birth);

        console.log("Avatar enviado: ", values.avatar);

        if (values.avatar) {
            formData.append('avatar', values.avatar);
        }

        try {
          const response = await Axios.put("http://localhost:3001/profile", formData,
            {
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            }
          );

          console.log("Resposta do servidor:", response.data);
          alert(response.data.msg);
          handleHome();
        } catch (error) {
          console.error("Erro ao atualizar perfil:", error);
        }
    };

    const validationProfile = yup.object().shape({
        name: yup
            .string(),
        phone: yup
            .string(),
        birth: yup
            .date(),
        avatar: yup
            .string()
            .nullable(),
      });

    // Aguarda os dados do usuário antes de renderizar o formulário
    if (!userData) return <p>Carregando...</p>;
  
    return (
      <Container>

        <Header
        onHeightChange={handleHeaderHeightChange}
        />
        <Menu $heightAdjuster={headerHeight} menuIsOpen={menuIsOpen} />
        <Header
        onHeightChange={handleHeaderHeightChange}
        inOpenMenu={() => setMenuIsOpen(true)}
        menuIsOpen={menuIsOpen}
        onCloseMenu={() => setMenuIsOpen(false)}
        />

        <Title>Editar Perfil</Title>
            <Formik
            initialValues={{
                name: userData.name || "",
                phone: userData.phone || "",
                birth: userData.birth_date || "",
                avatar: userData.avatar,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationProfile}
            >
            
            {({ setFieldValue, values }) => (
            <Form>
                
                    <FormGroup>

                        <Label>Nome:</Label>
                        <FormField name="name" type="text"/>
            
                        <FormError component="span"
                        name="name" />
        
                    </FormGroup>

                <FlexContainer>

                <FormSection>

                    <FormGroup>

                        <Label>Telefone:</Label>
                        <FormField name="phone" type="text"/>
            
                        <FormError component="span"
                        name="phone" />
                    
                    </FormGroup>
        
                    <FormGroup>

                        <Label>Data de Nascimento: </Label>
                        <FormField name="birth" type="date"/>
            
                        <FormError component="span"
                        name="birth" />
                    
                    </FormGroup>

                    </FormSection>

                    <FormGroup>

                        <CalendarSection>
                            <Label>Foto de perfil:</Label>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    setFieldValue("avatar", file);
                                    handleAvatarChange(event);
                                }}
                            />
                        </CalendarSection>
                        {avatarPreview && <img src={avatarPreview} alt="Prévia do avatar" style={{ margin: "10px", width: "120px",  borderRadius: "50%", marginLeft:"80px" }} />}
                        <FormError component="span" name="avatar" />

                    </FormGroup>

                </FlexContainer>
    
                <Button title="Salvar"
                className="newactivity-button"
                type="submit" $opacity />

                <Button title="Voltar"
                className="newactivity-button"
                type="button"
                onClick={handleGoBack} $opacity />
    
            </Form>
            )}
            </Formik>

      </Container>
    )
}