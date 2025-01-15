import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  top: 80px;
  width: 50%;
  height: max-content;
  min-width: 290px;
  margin: auto;
  margin-bottom: 110px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 20px 30px;
  border-radius: 7px;
  font-family: "Baloo Bhai 2", serif;
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);

    .companion-actions {
      display: flex;
      gap: 30px;
    }

    .companion {
      margin-bottom: 1px;
      font-weight: 500;
    }

    .name-companion {
      margin-top: 30px;
      margin-bottom: 10px;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
    }

    .data-companion {
      margin: 0;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      margin-bottom: 12px;
      width: 200px;
      height: 200px;
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

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
`;

export const Label = styled.label`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  justify-content: center;
  color: ${({ theme }) => theme.COLORS.BLACK};

  &.children{
    font-size: 15px;
  }
`;