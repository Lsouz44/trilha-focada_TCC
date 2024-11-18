import { useNavigate } from "react-router-dom"

import { FiLogOut } from "react-icons/fi"

import { ButtonText } from "../ButtonText"

import { Container, Modules } from "./styles"

export function Menu({ $heightAdjuster, menuIsOpen }) {

  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/'); // Redireciona para a tela de bem-vindo
  };

  function handleOptions(url) {
    scrollToTop()
    navigate(url)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
        <Container
          $heightAdjuster={$heightAdjuster}
          data-menu-is-open={menuIsOpen}
        >
          <nav>
          <Modules>
              <ButtonText
                title="Perfil"
                className="title-module"
                onClick={() =>
                  handleOptions("/home")
                }
              />
          </Modules>
          
          <Modules>
              <ButtonText
                title="Acompanhante"
                className="title-module"
                onClick={() =>
                  handleOptions("/home")
                }
              />
          </Modules>

          <Modules>
              <ButtonText
                title="Configurações"
                className="title-module"
                onClick={() =>
                  handleOptions("/home")
                }
              />
          </Modules>

          </nav>

          <div>
            <ButtonText
              title="Sair"
              icon={FiLogOut}
              $fontSizeIcon="20"
              className="logout"
              onClick={handleSignOut}
            />
          </div>
        </Container>
      )
  }
