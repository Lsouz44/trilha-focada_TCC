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
    padding: 12.5px;
    padding-left: 17.5px;
    width: 35px;
  }

  .central-logo {
    justify-content: center;
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
    margin: 0;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;

    > a {
        margin-right: 15px;
        margin-top: 2px;
        min-inline-size: 180px;
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.25rem;
      }

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
  top: 65px;
  right: 0;
  background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT};
  border: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;

  .notification-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;

    p {
      margin: 0 0 10px;
      font-size: 15px;
    }

    .actions {
      display: flex;
      gap: 30px;

      button {
        margin-bottom: 10px;
        padding: 5px 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        font-size: 15px;
        border: none;
        cursor: pointer;
        border-radius: 3px;

        &.accept {
          background-color: ${({ theme }) => theme.COLORS.GREEN};
          color: ${({ theme }) => theme.COLORS.WHITE};
        }

        &.reject {
          background-color: ${({ theme }) => theme.COLORS.RED};
          color: ${({ theme }) => theme.COLORS.WHITE};
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
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`;
