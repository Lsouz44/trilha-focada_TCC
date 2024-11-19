import { Formik } from 'formik';
import * as yup from 'yup';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addDays, differenceInDays } from 'date-fns';
import Axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Container, Title, Form, FormGroup, FormField, FormError,
        RadioLabel, RadioField, Label, TimeContainer, CalendarSection,
        FlexContainer, FormSection } from './styles';


export function EditActivity () {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    const handleHeaderHeightChange = (height) => {
        setHeaderHeight(height)
    }

    function handleHome() {
        navigate("/home")
    }

    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    
    useEffect(() => {
        const fetchActivity = async () => {
          try {
            const response = await Axios.get(`http://localhost:3001/activity/${id}`, {
            headers: { Authorization: `Bearer ${token}`, },
            });
            setActivity(response.data);
          } catch (error) {
            console.error("Erro ao buscar atividade:", error);
            alert("Erro ao carregar os dados da atividade.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchActivity();
      }, [id, token]);

    const handleUpdate = async (values) => {
        try {
            const response = await Axios.put(`http://localhost:3001/update-activity/${id}`, values, {
            headers: { Authorization: `Bearer ${token}`, },
            });                
            alert("Atividade atualizada com sucesso!");
            setActivity(response.data);
            handleHome();
        } catch (error) {
            console.error("Erro ao atualizar atividade:", error);
        }
    };
      
    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!activity) {
        return <div>Erro ao carregar atividade.</div>;
    }

    const validationEditActivity = yup.object().shape({
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

      const generateDateRange = (start, end) => {
            const dates = [];
            const daysDiff = differenceInDays(new Date(end), new Date(start));

            for (let i = 0; i <= daysDiff; i++) {
                dates.push(addDays(new Date(start), i));
            }
            return dates;
      };
  
    return (
      <Container>

        <Header
        onHeightChange={handleHeaderHeightChange}
        />

        <Title>Editar atividade</Title>
            <Formik
            initialValues={{
                activityName: activity.activity_name || "",
                priority: activity.priority || "",
                startTime: activity.start_time || "",
                endTime: activity.end_time || "",
                days: activity.days || [],
            }}
            onSubmit={handleUpdate}
            validationSchema={validationEditActivity}
            >
            
            {({ setFieldValue, handleChange, values }) => (
            <Form>
                
                    <FormGroup>

                        <Label>Atividade:</Label>
                        <FormField name="activityName"
                            onChange={handleChange}
                            value={values.activityName}/>
            
                        <FormError component="span"
                        name="activityName" />
        
                    </FormGroup>

                <FlexContainer>

                <FormSection>

                    <FormGroup>
                        <Label>Prioridade:</Label>
                        <RadioLabel>
                            <RadioField type="radio" name="priority" value="1" onChange={() => setFieldValue("priority", 1)} checked={values.priority === 1} />
                            Alta
                        </RadioLabel>

                        <RadioLabel>
                            <RadioField type="radio" name="priority" value="2" onChange={() => setFieldValue("priority", 2)} checked={values.priority === 2} />
                            Média
                        </RadioLabel>

                        <RadioLabel>
                            <RadioField type="radio" name="priority" value="3" onChange={() => setFieldValue("priority", 3)} checked={values.priority === 3} />
                            Baixa
                        </RadioLabel>
                    
                    </FormGroup>
        
                    <FormGroup>
                        <Label>Horário: </Label>
                        <TimeContainer>
                            <div>
                                <Label className='children'>Início:</Label>
                                <FormField name="startTime" type="time" onChange={handleChange} value={values.startTime} />
                                <FormError component="span" name="startTime" />
                            </div>

                            <div>
                                <Label className='children'>Término:</Label>
                                <FormField name="endTime" type="time" onChange={handleChange} value={values.endTime} />
                                <FormError component="span" name="endTime" />
                            </div>
                        </TimeContainer>
                    
                    </FormGroup>

                    </FormSection>

                    <FormGroup>

                        <CalendarSection>
                            <Label>Selecione os dias:</Label>
                            <Calendar
                            onChange={(dates) => {
                                if (Array.isArray(dates) && dates.length === 2) {
                                  const startDate = new Date(dates[0]).setHours(0, 0, 0, 0); // Ajusta para o início do dia
                                  const endDate = new Date(dates[1]).setHours(23, 59, 59, 999); // Ajusta para o final do dia  
                                  const allDates = generateDateRange(startDate, endDate); // Gere todas as datas no intervalo
                                  setFieldValue('days', allDates);
                                }
                              }}
                            selectRange={true}
                            value={
                                values.days.length > 0
                                  ? [
                                      new Date(values.days[0]).setHours(0, 0, 0, 0), // Converter para Date a primeira data do array de 'days'
                                      new Date(values.days[values.days.length - 1]).setHours(23, 59, 59, 999), // Converter para Date a última data do array de 'days'
                                    ]
                                  : undefined
                              }
                            />
                        </CalendarSection>

                        <FormError component="span" name="days" />

                    </FormGroup>

                </FlexContainer>
    
                <Button title="Salvar edição da atividade"
                className="newactivity-button"
                type="submit" $opacity />
    
            </Form>
            )}
            </Formik>

      </Container>
    )
}