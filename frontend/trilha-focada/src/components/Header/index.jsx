import { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios";

import { TiHome } from "react-icons/ti"
import { FiMenu, FiX } from "react-icons/fi"
import { IoIosNotifications } from "react-icons/io";
import logo from "../../assets/logo/logo_icon_trilhafocada.png"
import escrita from "../../assets/logo/logo_trilhafocada_escrita.png"

import { ButtonText } from "../../components/ButtonText"

import { Container, Nav, NotificationDropdown } from "./styles"

export function Header({
  onHeightChange,
  menuIsOpen,
  inOpenMenu,
  onCloseMenu,
}) {
  const headerRef = useRef(null)
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem("token");

  function handleGoHome() {
    navigate("/home")
    window.scrollTo(0, 0)
  }

   // Função para buscar notificações do backend
   async function fetchNotifications() {
    try {
      const response = await Axios.get("http://localhost:3001/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setNotifications(response.data.notifications);
        setHasNewNotifications(response.data.notifications.length > 0);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  }

   // Aceitar convite
   async function handleAccept(notificationId) {
    console.log("Tentando aceitar notificação:", notificationId);

    try {
      const response = await Axios.post(
        "http://localhost:3001/accept-invite",
        { notificationId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("Convite aceito com sucesso!");
        fetchNotifications(); // Atualiza a lista de notificações
      }
    } catch (error) {
      console.error("Erro ao aceitar o convite:", error);
    }
  }

  // Recusar convite
  async function handleReject(notificationId) {
    console.log("Tentando rejeitar notificação:", notificationId);

    try {
      const response = await Axios.post(
        "http://localhost:3001/reject-invite",
        { notificationId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("Convite recusado.");
        fetchNotifications(); // Atualiza a lista de notificações
      }
    } catch (error) {
      console.error("Erro ao recusar o convite:", error);
    }
  }

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight
      onHeightChange(height)
    }
  }, [onHeightChange])

  useEffect(() => {
    fetchNotifications();
  }, []); // Carrega notificações ao montar o componente

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
            <ButtonText
              icon={IoIosNotifications}
              $fontSizeIcon="35"
              onClick={() => setShowDropdown(!showDropdown)} // Alterna o menu
            />
            {hasNewNotifications && <span className="notification-badge">+1</span>}

            {showDropdown && (
              <NotificationDropdown>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <p>{notification.message}</p>
                      <div className="actions">
                        <button
                          onClick={() => handleAccept(notification.id)}
                          className="accept"
                        >
                          Aceitar
                        </button>
                        <button
                          onClick={() => handleReject(notification.id)}
                          className="reject"
                        >
                          Recusar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Sem notificações pendentes.</p>
                )}
              </NotificationDropdown>
            )}

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
