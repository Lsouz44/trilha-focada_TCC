import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  background: ${({ theme }) => theme.COLORS.BLUE};
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.section`
  max-width: 450px;

  text-align: center;

  > img {
    width: 90%;
    margin-bottom: 1.875rem;
  }

  > p {
    margin-top: 0.625rem;

    color: ${({ theme }) => theme.COLORS.WHITE};
    font-weight: 700;

    > a {
      color: ${({ theme }) => theme.COLORS.LEMON};
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
`
