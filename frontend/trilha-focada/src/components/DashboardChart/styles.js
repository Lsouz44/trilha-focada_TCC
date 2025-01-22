import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.COLORS.WHITE_BACKGROUND};

  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    

    padding: 25px;
    padding-top: 5px;
    margin-left: 10px;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 16px;
    
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

    background-color: ${({ theme }) => theme.COLORS.WHITE};

    width: 320px;

    > h2 {
    margin-top: 30px;
    font-size: 14.3px;
    font-weight: 400;
    color: ${({ theme }) => theme.COLORS.GRAY};
    }

  }
`;