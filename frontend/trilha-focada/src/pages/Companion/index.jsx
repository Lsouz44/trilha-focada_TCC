import Axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Menu } from '../../components/Menu';
import { PiUserCircleDuotone } from "react-icons/pi";
import { Container, Title, Label } from './styles';


export function Companion () {

    const [headerHeight, setHeaderHeight] = useState(0);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [companion, setCompanion] = useState(null);
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

    useEffect(() => {
        async function fetchCompanion() {
          try {
            const response = await Axios.get("http://localhost:3001/user-companion", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setCompanion(response.data.companion);
          } catch (error) {
            console.error("Erro ao buscar acompanhante:", error);
          }
        }
        fetchCompanion();
      }, [token]);

    const handleRemoveCompanion = async (companionId) => {
        try {
            const response = await Axios.put(
              `http://localhost:3001/user-companion/delete`,
                { companionId },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            alert(response.data.message);
            setCompanion(null); // Atualiza estado local
            handleHome();
        } catch (error) {
        console.error("Erro ao remover acompanhante:", error);
        }
    };

    const avatarUrl = companion && companion.avatar
      ? `http://localhost:3001/uploads/avatars/${companion.avatar}` 
      : 'http://localhost:3001/uploads/avatars/default-avatar.jpg';


    return (
      <Container>

        <Menu $heightAdjuster={headerHeight} menuIsOpen={menuIsOpen} />
        <Header
        onHeightChange={handleHeaderHeightChange}
        inOpenMenu={() => setMenuIsOpen(true)}
        menuIsOpen={menuIsOpen}
        onCloseMenu={() => setMenuIsOpen(false)}
        />

        <Title>Guia Terapêutico</Title>
                
                {companion ? (
                    <>
                        <p className='name-companion'>{companion.name}</p>
                        <div className="avatar">
                            {companion ? (
                                <img 
                                src={avatarUrl}
                                alt="avatar-companion"
                                className="avatar-image" 
                                />
                            ) : (
                                <PiUserCircleDuotone className="avatar-icon" />
                            )}
                        </div>
                        <Label>E-mail:</Label>
                        <p className='data-companion'>{companion.email}</p>
                        <Label>Contato:</Label>
                        <p className='data-companion'>{companion.phone}</p>
                    </>
                ) : (
                    <>
                    <p>Você ainda não possui um guia para sua jornada.</p>
                    </>
                )}
    
                <Button title="Remover"
                className="newactivity-button"
                type="button"
                onClick={() => handleRemoveCompanion(companion.id_acompanhante)} $opacity />

                <Button title="Voltar"
                className="newactivity-button"
                type="button"
                onClick={handleGoBack} $opacity />

      </Container>
    )
}