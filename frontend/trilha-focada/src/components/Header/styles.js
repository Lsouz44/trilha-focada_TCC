import styled from "styled-components"

export const Container = styled.header`
  grid-area: header;

  width: 100%;
  height: 65px;
  background: ${({ theme }) => theme.COLORS.BLUE_LIGHT2};
  background-size: cover;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  

  z-index: 5;

  position: fixed;
  top: 0;
  left: 0;

  > img {
    padding: 30px;
    width: 35px;
  }

  .central-logo {
    padding-left: 93px;
    width: 210px;
    height: auto;
  }

  .notification-badge {
    position: absolute;
    top: 9px;
    right: 88px;
    background-color: ${({theme}) => theme.COLORS.ORANGE};
    color: ${({theme}) => theme.COLORS.WHITE};
    font-size: 11px;
    border-radius: 50%;
    padding: 2px 6px;
    font-weight: bold;
  }
`

export const Nav = styled.nav`
  > ul {
    list-style: none;

    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;

    > li {
      > a {
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.25rem;
      }
    }
  }
`
export const NotificationDropdown = styled.div`
  position: absolute;
  top: 50px; /* Ajuste conforme necessário */
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;

  .notification-item {
    padding: 10px;
    border-bottom: 1px solid #eee;

    p {
      margin: 0 0 10px;
      font-size: 14px;
    }

    .actions {
      display: flex;
      justify-content: space-between;

      button {
        padding: 5px 10px;
        font-size: 12px;
        border: none;
        cursor: pointer;
        border-radius: 3px;

        &.accept {
          background-color: #4caf50;
          color: #fff;
        }

        &.reject {
          background-color: #f44336;
          color: #fff;
        }
      }
    }
  }

  .notification-item:last-child {
    border-bottom: none;
  }

  p {
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #555;
  }
`;
