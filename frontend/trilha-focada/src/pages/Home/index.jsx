import { useState, useEffect } from 'react';
import Axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { CalendarSection, Container, LeftColumn, RightColumn, ListFeed, FormList } from './styles';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBin5Line, RiFilter2Fill, RiFilter2Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom";
import { Menu } from '../../components/Menu';

export function Home() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [markedDates, setMarkedDates] = useState([]);
    const [activities, setActivities] = useState([]);
    const [filterType, setFilterType] = useState("date");
    const token = localStorage.getItem("token");

    const handleHeaderHeightChange = (height) => {
        setHeaderHeight(height)
    }

    const navigate = useNavigate()

    function handleNewAcitivity() {
        navigate("/new-activity")
    }

    function handleEditActivity(id) {
      navigate(`/edit-activity/${id}`)
    }

    const handleClickNewActivity = () => {
      handleNewAcitivity();
    };

    const handleClickEditActivity = (id) => {
      handleEditActivity(id);
    };

    const handleDelete = async (id) => {
      try {
        const response = await Axios.delete(`http://localhost:3001/delete-activity/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(response.data.msg);
        setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.idactivity !== id)
        );
      } catch (error) {
          console.error("Erro ao excluir atividade:", error);
      }
    };

    const getFilteredActivities = () => {
      if (filterType === "priority") {
          return [...activities].sort((a, b) => a.priority - b.priority);
      }
      return activities;
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

    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await Axios.get("http://localhost:3001/feed-activities", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setActivities(response.data);
        } catch (error) {
          console.error("Erro ao buscar atividades:", error);
        }
      };
  
      fetchActivities();
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

        <FormList>
          <fieldset>
                <legend>Próximas atividades
                  <div className='filter-container'>
                  <Button icon={filterType === "date" ? RiFilter2Line : RiFilter2Fill}
                    className="inline-button"
                    $opacity
                    onClick={(e) => {
                      e.preventDefault();
                      setFilterType((prev) => (prev === "date" ? "priority" : "date"))}
                  }/>
                  <span>
                    {filterType === "date" ? 'Filtrar por prioridade' : 'Filtrar por data'}
                  </span>
                  </div>
                </legend>

                {activities.length > 0 ? (
                  <ListFeed>
                    {getFilteredActivities().map((activity, index) => (
                      <li key={index}>
                        <div>
                          <span
                            style={activity.priority === 1 ? {
                              backgroundColor: `#B60000`,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            } : activity.priority === 2 ? {
                              backgroundColor: `#08487C`,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            } : {
                              backgroundColor: `#158038`,
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                            }}
                          ></span>
                          <p>| {activity.activity_name} |</p>
                          <p>| Prioridade: {activity.priority} |</p>
                          <p>| Início: {activity.start_time} |</p>
                        </div>

                        <div>
                          <Button
                            title="Editar"
                            className="inline-button"
                            onClick={() => handleClickEditActivity(activity.idactivity)}
                          />
                          <Button
                            icon={RiDeleteBin5Line}
                            className="inline-button"
                            onClick={() => handleDelete(activity.idactivity)}
                          />
                        </div>
                      </li>
                    ))}
                  </ListFeed>
                ) : (
                  <>
                    <h1>Nenhuma atividade registrada. Use o botão acima para adicionar uma atividade.</h1>
                  </>
                )}
          </fieldset>
        </FormList>

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