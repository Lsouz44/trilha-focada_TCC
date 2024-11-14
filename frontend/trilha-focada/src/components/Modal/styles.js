import styled, { keyframes } from "styled-components"

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, -150%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`

export const Container = styled.div`
  position: fixed;
  z-index: 8;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: auto;
    max-width: 70%;
    padding: 3.625rem;
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    border-radius: 0.625rem;

    position: relative;

    animation: ${slideDown} 0.5s ease-out forwards;

    > h1 {
      font-size: 3rem;
      color: ${({ theme }) => theme.COLORS.GREEN_200};
      margin-bottom: 3rem;
      text-align: center;
    }

    > p {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.COLORS.GREEN_200};
      margin-bottom: 3rem;
      text-align: center;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
    }
  }
`

export const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  background-color: transparent;
  border: none;

  cursor: pointer;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_200};
    font-size: 1.875rem;
  }

  &:hover {
    > svg {
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }
  }
`
