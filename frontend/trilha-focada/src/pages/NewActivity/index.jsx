import { Formik } from 'formik';
import * as yup from 'yup';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Axios from 'axios';
import { jwtDecode } from "jwt-decode";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Container, Title, Form, FormGroup, FormField, FormError,
        RadioLabel, RadioField, Label, TimeContainer, CalendarSection,
        FlexContainer, FormSection } from './styles';


export function NewActivity() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const navigate = useNavigate()

    const handleHeaderHeightChange = (height) => {
        setHeaderHeight(height)
    }

    function handleHome() {
        navigate("/home")
    }

    const handleClickRegisterActivity = (values) => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log("User ID: ", userId);
        console.log("info: ", values);

        Axios.post("http://localhost:3001/new-activity", {
            activityName: values.activityName,
            priority: values.priority,
            startTime: values.startTime,
            endTime: values.endTime,
            days: values.days
        }, {
            headers: {
                Authorization: `Bearer ${token}`  // Envie o token no cabeçalho
            }
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
            handleHome();
        }).catch((error) => {
            console.error("Erro ao cadastrar atividade:", error);
        });
    }

    const validationNewActivity = yup.object().shape({
        activityName: yup
            .string()
            .required("Este campo é obrigatório"),
        priority: yup
            .string()
            .required("Este campo é obrigatório"),
        startTime: yup
            .string()
            .required("Este campo é obrigatório"),
        endTime: yup
            .string(),
        days: yup
            .array()
            .min(1, "Selecione ao menos um dia")
            .required("Este campo é obrigatório"),
      });
  
    return (
      <Container>

        <Header
        onHeightChange={handleHeaderHeightChange}
        />

        <Title>Registrar uma nova atividade</Title>
            <Formik
            initialValues={{ endTime: "", days: [], }}
            onSubmit={handleClickRegisterActivity}
            validationSchema={validationNewActivity}
            >
            
            {({ setFieldValue }) => (
            <Form>
                
                    <FormGroup>

                        <Label>Atividade:</Label>
                        <FormField name="activityName"
                        placeholder="Ex.: Estudo para prova de Cálculo II" />
            
                        <FormError component="span"
                        name="activityName" />
        
                    </FormGroup>

                <FlexContainer>

                <FormSection>

                    <FormGroup>
                        <Label>Prioridade:</Label>
                        <RadioLabel>
                            <RadioField type="radio" name="priority" value="1" />
                            Alta
                        </RadioLabel>

                        <RadioLabel>
                            <RadioField type="radio" name="priority" value="2" />
                            Média
                        </RadioLabel>

                        <RadioLabel>
                            <RadioField type="radio" name="priority" value="3" />
                            Baixa
                        </RadioLabel>
                    
                    </FormGroup>
        
                    <FormGroup>
                        <Label>Horário: </Label>
                        <TimeContainer>
                            <div>
                                <Label className='children'>Início:</Label>
                                <FormField name="startTime" type="time" placeholder="Horário início" />
                                <FormError component="span" name="startTime" />
                            </div>

                            <div>
                                <Label className='children'>Término:</Label>
                                <FormField name="endTime" type="time" placeholder="Horário término" />
                                <FormError component="span" name="endTime" />
                            </div>
                        </TimeContainer>
                    
                    </FormGroup>

                    </FormSection>

                    <FormGroup>

                        <CalendarSection>
                            <Label>Selecione os dias:</Label>
                            <Calendar
                            onChange={(dates) => setFieldValue('days', dates)}
                            selectRange={true}
                            />
                        </CalendarSection>

                        <FormError component="span" name="calendar" />

                    </FormGroup>

                </FlexContainer>
    
                <Button title="Registrar atividade"
                className="newactivity-button"
                type="submit" $opacity />
    
            </Form>
            )}
            </Formik>

      </Container>
    )
}