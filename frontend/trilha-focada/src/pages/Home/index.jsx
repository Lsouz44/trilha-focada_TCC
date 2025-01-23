import { useState, useEffect } from 'react';
import Axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { CalendarSection, Container, LeftColumn, RightColumn, ListFeed, FormList } from './styles';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiDeleteBin5Line, RiEdit2Line, RiFilter2Fill, RiFilter2Line, RiCheckLine, RiTimerFlashLine } from "react-icons/ri"
import { LiaTrophySolid } from "react-icons/lia";
import { MdPersonAdd } from "react-icons/md";
import { PiUserCircleDuotone, PiSmileySad } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled  } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Menu } from '../../components/Menu';
import { DashboardChart } from '../../components/DashboardChart';

export function Home() {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [markedDates, setMarkedDates] = useState([]);
    const [activities, setActivities] = useState([]);
    const [filterType, setFilterType] = useState("date");
    const [companion, setCompanion] = useState(null);
    const [reactions, setReactions] = useState({conquest: 0, intime: 0, sad: 0,});
    const [allReactions, setAllReactions] = useState({});

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

    function handleSendInvite() {
      navigate("/send-invite")
    }

    const handleClickNewActivity = () => {
      handleNewAcitivity();
    };

    const handleClickEditActivity = (id) => {
      handleEditActivity(id);
    };

    const handleClickSendInvite = () => {
      handleSendInvite();
    };

    const handleClickCompletedActivity = async (id) => {
      const confirm = window.confirm("Tem certeza de que deseja marcar esta trilha como concluída?");
      if (!confirm) return;

      try {
          const response = await Axios.put(
              `http://localhost:3001/activity/${id}/complete`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(response.data);

          alert(response.data.msg);
  
          // Atualizar a lista de atividades
          setActivities((prevActivities) =>
              prevActivities.map((activity) =>
                  activity.idactivity === id
                      ? { ...activity, status: 'concluído' }
                      : activity
              )
          );
      } catch (error) {
          console.error("Erro ao marcar atividade como concluída:", error);
      }
  };

    const handleDelete = async (id) => {
      const confirm = window.confirm("Tem certeza de que deseja deletar esta trilha? Essa ação não pode ser desfeita.");
      if (!confirm) return;

      try {
        const response = await Axios.put(`http://localhost:3001/activity/${id}/delete`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
  
    const handleReactionClick = (reactionType, activityId) => {

      Axios.post('http://localhost:3001/reactions',  {
        activity_id: activityId,
        reaction_type: reactionType,
      }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          setReactions((prevReactions) => ({
            ...prevReactions,
            [reactionType]: prevReactions[reactionType] + 1,
          }));
      }).catch((error) => {
          console.error("Erro ao cadastrar atividade:", error);
      });
    };

    useEffect(() => {
      Axios.get('http://localhost:3001/reactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setAllReactions(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar todas as reações:", error);
        });
    }, [token]);

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

    // Função para buscar o acompanhante
    async function fetchCompanion() {
      try {
        const response = await Axios.get("http://localhost:3001/user-companion", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setCompanion(response.data.companion);
        }
      } catch (error) {
        console.error("Erro ao buscar acompanhante:", error);
      }
    }

    useEffect(() => {
      fetchCompanion();
    }, []);

    const avatarUrl = companion && companion.avatar
      ? `http://localhost:3001/uploads/avatars/${companion.avatar}` 
      : 'http://localhost:3001/uploads/avatars/default-avatar.jpg';

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
          <Button className="register-newactivity" title="Nova Trilha" icon={AiOutlinePlusCircle} onClick={handleClickNewActivity} $opacity></Button>
        </section>

        <FormList>
          <fieldset>
                <legend>Próximos passos
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
                        <div className='content'>
                            <span>
                              {activity.priority === 1 ? (
                                <TbCircleNumber1Filled  style={{ backgroundColor: '#FDFDFD', borderRadius: '50%', color: `#B60000`, width: "40px", height: "40px" }} />
                              ) : activity.priority === 2 ? (
                                <TbCircleNumber2Filled   style={{ backgroundColor: '#FDFDFD', borderRadius: '50%', color: `#e6d816`, width: "40px", height: "40px" }} />
                              ) : (
                                <TbCircleNumber3Filled  style={{ backgroundColor: '#FDFDFD', borderRadius: '50%', color: `#158038`, width: "40px", height: "40px" }} />
                              )}
                            </span>
                          <div>
                            <p className='title'>{activity.activity_name}</p>
                            <p className='subtitle'> Horário: {activity.start_time} </p>
                          </div>
                        </div>

                        <div>
                          <Button
                            icon={RiCheckLine}
                            className="inline-button-green"
                            onClick={() => handleClickCompletedActivity(activity.idactivity)}
                          />
                          <Button
                            icon={RiEdit2Line}
                            className="inline-button"
                            onClick={() => handleClickEditActivity(activity.idactivity)}
                          />
                          <Button
                            icon={RiDeleteBin5Line}
                            className="inline-button"
                            onClick={() => handleDelete(activity.idactivity)}
                          />
                        </div>

                        <div className="reactions">
                          <Button
                            icon={LiaTrophySolid}
                            className="reactions"
                            onClick={() => handleReactionClick('conquest', activity.idactivity)}
                          />
                          <span>{allReactions[activity.idactivity]?.conquest || 0}</span>

                          <Button
                            icon={RiTimerFlashLine }
                            className="reactions"
                            onClick={() => handleReactionClick('intime', activity.idactivity)}
                          />
                          <span>{allReactions[activity.idactivity]?.intime || 0}</span>

                          <Button
                            icon={PiSmileySad}
                            className="reactions"
                            onClick={() => handleReactionClick('sad', activity.idactivity)}
                          />
                          <span>{allReactions[activity.idactivity]?.sad || 0}</span>
                        </div>
                      </li>
                    ))}
                  </ListFeed>
                ) : (
                  <>
                    <h1>Fique tranquilo! Nenhuma trilha a ser caminhada no momento. Use o botão acima para adicionar uma trilha.</h1>
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

          <section className="invite-section">
            <div className="avatar">
              {companion ? (
                <img 
                  src={avatarUrl}
                  className="avatar-image" 
                />
              ) : (
                <PiUserCircleDuotone className="avatar-icon" />
              )}
            </div>

            {companion ? (
              <>
                <h1 className='companion'>Guia Terapêutico:</h1>
                <h1 className='name-companion'>{companion.name}</h1>
                <div className="companion-actions">
                  <Button className="icon-button"
                    icon={FaWhatsapp}
                    //onClick={""}
                    $opacity
                  />
                  <Button className="icon-button"
                    icon={ImProfile}
                    //onClick={""}
                    $opacity
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className='text-companion'>Você ainda não possui um guia para sua jornada.</h1>
                <Button className="invite"
                  title="Adicionar um guia terapêutico"
                  icon={ MdPersonAdd }
                  onClick={handleClickSendInvite}
                  $opacity />
              </>            
              )}
          </section>

          <section>
          <DashboardChart />
          </section>

        </RightColumn>
        
      </Container>
    )
}