import { Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Menu } from '../../components/Menu';
import { Container, Title, Form, FormGroup, FormField, FormError,
        RadioLabel, RadioField, Label, TimeContainer, CalendarSection,
        FlexContainer, FormSection } from './styles';


export function Settings () {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
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

    const handleSubmit = async () => {
       
    };
      
    const validationAcompanhante = yup.object().shape({
       
      });

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

        <Title>Configurações</Title>
            <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            validationSchema={validationAcompanhante}
            >
            
            <Form>
                
                    <FormGroup>

                        <Label>Recuperar senha:</Label>
                        <FormField name="activityName"/>
            
                        <FormError component="span"
                        name="activityName" />
        
                    </FormGroup>

                <FlexContainer>

                <FormSection>

                    <FormGroup>
                        <Label></Label>
                    
                    </FormGroup>
        
                    <FormGroup>
                        <Label></Label>
                        <TimeContainer>
                        </TimeContainer>
                    
                    </FormGroup>

                    </FormSection>

                    <FormGroup>

                        <CalendarSection>
                            <Label></Label>
                        </CalendarSection>

                        <FormError component="span" name="days" />

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
            </Formik>

      </Container>
    )
}