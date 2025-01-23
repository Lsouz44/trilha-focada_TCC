import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  background-size: cover;
  background-color: ${({ theme }) => theme.COLORS.WHITE_BACKGROUND};

  font-size: 70px;
  font-family: "Baloo Bhai 2", serif;

  .activity-section {
    position: absolute;
    left: 30px;
    top: 95px;
  }

  .feed {
    font-size: 16px;
    margin-top: 170px;
  }
`;

export const LeftColumn = styled.div`
  flex: 4; /* 60% da largura total */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const RightColumn = styled.div`
  flex: 2; /* 40% da largura total */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.COLORS.WHITE_BACKGROUND};

  .invite-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 25px;
    margin-left: 10px;
    margin-top: 200px;
    font-size: 12px;
    
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

    background-color: ${({ theme }) => theme.COLORS.WHITE};

    width: 320px;

    .companion-actions {
      display: flex;
      gap: 30px;
    }

    .companion {
      margin-bottom: 1px;
      font-weight: 500;
    }

    .name-companion {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 24px;
    }

    .text-companion {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }

  }

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #ccc;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-icon {
    font-size: 100px;
    color: ${({ theme }) => theme.COLORS.BLUE};
  }

`;

export const CalendarSection = styled.div`
  min-width: 280px;
  max-height: 100px;
  display: absolute;
  flex-direction: row;
  align-items: center;
  padding-left: 50px;
  padding-top: 90px;

  .react-calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 370px;
    margin-right: 40px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile.marked-date {
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
    color: white;
    border-radius: 50%;
  }
`;

export const FormList = styled.form`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 180px;

  > fieldset {
    width: 100%;
    border: none;

    display: flex;
    flex-direction: column;
    margin-top: 10px;

    > legend {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 1.76rem;
      font-weight: 600;
      color: ${({ theme }) => theme.COLORS.BLUE_DARK};
      margin-bottom: -40px;
      padding: 0rem 2.5rem;

      .filter-container {
        font-size: 1.1rem;
        margin-left: 335px;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }

    > h1 {
      color: ${({ theme }) => theme.COLORS.ORANGE};
      font-size: 1.5rem;
      font-weight: 400;
      margin: 3.5rem 2.5rem;
      border-top: 1px solid ${({ theme }) => theme.COLORS.BLACK};
      padding-top: 20px;
    }

    > strong {
      color: ${({ theme }) => theme.COLORS.BLACK};
      font-size: 1rem;
      margin-bottom: 0.625rem;
    }

    > p {
      color: ${({ theme }) => theme.COLORS.BLACK};
      font-size: 1rem;
      margin-bottom: 0.625rem;
    }
  }
`

export const ListFeed = styled.ul`
  width: 765px;
  display: flex;
  flex-direction: column;
  gap: 0.825rem;

  > li {
    width: 100%;
    padding: 0.5rem 1rem;

    display: grid;
    grid-template-areas:
      "content buttons"
      "reactions buttons";
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;

    background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT};
    border-radius: 0.625rem;

    > .content {
      grid-area: content;
      display: grid;
      grid-template-columns: 0.40fr 3.60fr;
      gap: 1.625rem;
      margin-left: 10px;

      > div {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        color: ${({ theme }) => theme.COLORS.WHITE};

        > span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
        }

        > p {
          height: 5px;
          font-size: 1.25rem;
          color: ${({ theme }) => theme.COLORS.WHITE};
        }
      }
    }

    > .reactions {
      grid-area: reactions;
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: flex-start;
      margin-bottom: 10px;
      margin-left: 5px;

      > span {
        margin-left: -5px;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.COLORS.WHITE};
      }
    }

    > div:nth-child(2) {
      grid-area: buttons;
      display: flex;
      flex-direction: row; /* Alinha os botões lado a lado */
      align-items: center;
      justify-content: center;
      gap: 0.625rem; /* Espaço entre os botões */
      margin-right: 20px;

      > button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .content p.title {
      font-size: 1.7rem;
      font-weight: bold;
    }

    .content p.subtitle {
      margin: 0;
      font-size: 1.2rem;
      align-self: flex-start;
    }
  }
`