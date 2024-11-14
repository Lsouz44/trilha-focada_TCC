import { useState } from 'react';
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Container } from './styles';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export function Home() {

    const [headerHeight, setHeaderHeight] = useState(0);

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

    return (
      <Container>

        <Header
        onHeightChange={handleHeaderHeightChange}
        />

        <section className="activity-section">
          <Button title="Nova atividade" icon={AiOutlinePlusCircle} onClick={handleClickNewActivity} $opacity></Button>
        </section>
        
      </Container>
    )
}