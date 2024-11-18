import { useState, useEffect } from 'react';
import Axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { CalendarSection, Container, LeftColumn, RightColumn } from './styles';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Menu } from '../../components/Menu';
import { FormGroup, Label } from '../NewActivity/styles';

export function Home() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [markedDates, setMarkedDates] = useState([]);
    const token = localStorage.getItem("token");

    const handleHeaderHeightChange = (height) => {
        setHeaderHeight(height)
    }

    const navigate = useNavigate()

    function handleNewAcitivity() {
        navigate("/new-activity")
    }

    const handleClickNewActivity = () => {
          handleNewAcitivity();
    };

    useEffect(() => {
      Axios.get("http://localhost:3001/days-activities", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
          .then((response) => {
            const fetchedDays = response.data.activities.flat(); // Achatar o array caso seja um array de arrays
            const formattedDays = fetchedDays.map((day) =>
                new Date(day)
            ); // Converter para Date
            setMarkedDates(formattedDays);
        })
        .catch((error) => {
            console.error("Erro ao buscar atividades:", error);
        });
    }, []);

    return (
      <Container>

        <LeftColumn>
        <Menu $heightAdjuster={headerHeight} menuIsOpen={menuIsOpen} />
        <Header
        onHeightChange={handleHeaderHeightChange}
        inOpenMenu={() => setMenuIsOpen(true)}
        menuIsOpen={menuIsOpen}
        onCloseMenu={() => setMenuIsOpen(false)}
        />

        <section className="activity-section">
          <Button className="register-newactivity" title="Nova atividade" icon={AiOutlinePlusCircle} onClick={handleClickNewActivity} $opacity></Button>
        </section>
        </LeftColumn>

        <RightColumn>
          <CalendarSection>
            <div className='calendar-container'>
            <Calendar
              tileClassName={({ date, view }) =>
                // Adiciona classe personalizada se a data estiver marcada
                markedDates.some(
                  (markedDate) =>
                    markedDate.toDateString() === date.toDateString()
                )
                  ? "marked-date"
                  : null
              }
            />
            </div>
          </CalendarSection>
        </RightColumn>
        
      </Container>
    )
}