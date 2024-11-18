import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { TiHome } from "react-icons/ti"
import { FiMenu, FiX } from "react-icons/fi"
import logo from "../../assets/logo/logo_icon_trilhafocada.png"
import escrita from "../../assets/logo/logo_trilhafocada_escrita.png"

import { ButtonText } from "../../components/ButtonText"

import { Container, Nav } from "./styles"

export function Header({
  onHeightChange,
  menuIsOpen,
  inOpenMenu,
  onCloseMenu,
}) {
  const headerRef = useRef(null)

  const navigate = useNavigate()

  function handleGoHome() {
    navigate("/home")
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight
      onHeightChange(height)
    }
  }, [onHeightChange])

  return (
    <Container ref={headerRef}>
      <img
        src={logo}
        alt="Logo Trilha Focada"
      />
      <img
        className="central-logo"
        src={escrita}
        alt="Logo Trilha Focada Escrita"
      />
      <Nav>
        <ul>
          <li>
            <ButtonText
              icon={TiHome}
              $fontSizeIcon="35"
              onClick={handleGoHome}
            />
          </li>
          <li>
            {menuIsOpen ? (
              <ButtonText
                icon={FiX}
                $fontSizeIcon="35"
                onClick={onCloseMenu}
                className="close"
              />
            ) : (
              <ButtonText
                icon={FiMenu}
                $fontSizeIcon="35"
                onClick={inOpenMenu}
              />
            )}
          </li>
        </ul>
      </Nav>
    </Container>
  )
}
