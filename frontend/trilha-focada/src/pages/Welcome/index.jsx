import { Link, useNavigate } from "react-router-dom"
import { Container, Content } from "./styles"
import { Button } from "../../components/Button"
import logo from "../../assets/logo/logo_trilhafocada.png"
import GlobalStyle from "../../styles/GlobalStyle"


export function Welcome() {
    const navigate = useNavigate()

    function handleLogin() {
        navigate("./login")
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <Content>
                    <img src={logo} alt="Logo Trilha Focada." />

                    <Button title="Entrar" className="welcome-login-button" onClick={handleLogin} />
                    <p>
                        Não tem uma conta? <Link to="/register">Criar Conta</Link>
                    </p>
                </Content>
            </Container>
        </>
    )
}
