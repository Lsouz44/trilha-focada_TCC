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

  background-color: ${({ theme }) => theme.COLORS.WHITE};

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
    width: 90%;
    border: none;
    font-size: 14px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile.marked-date {
    background-color: #4caf50;
    color: white;
    border-radius: 50%;
  }
`;