import styled from "styled-components"

export const Container = styled.button.attrs((props) => ({
  className: props.className,
}))`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  font-family: 'Baloo Bhai 2', serif;

  background: ${({ theme, $opacity }) =>
    $opacity ? `linear-gradient(${theme.COLORS.BLUE_LIGHT}, ${theme.COLORS.BLUE})` : theme.COLORS.WHITE};
  border: none;
  border-radius: 0.625rem;

  color: ${({ theme, $opacity }) =>
    $opacity ? theme.COLORS.WHITE : theme.COLORS.BLUE};
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;

  cursor: pointer;
  transition: 0.4s;

  opacity: 1;

  > svg {
    font-size: 1.125rem;
  }

  &:hover {
    background: ${({ theme }) => `linear-gradient(${theme.COLORS.BLUE_LIGHT}, ${theme.COLORS.BLUE_LIGHT2})`};
  }

  &:disabled {
    background: ${({ theme }) => theme.COLORS.GRAY_LIGHT};
    color: ${({ theme }) => theme.COLORS.WHITE};
    cursor: not-allowed;
  }

  &.welcome-login-button {
  max-height: 3.8rem;
  padding: 0.9rem 5rem;
  margin-bottom: 1.2rem;
  }

  &.login-button {
  max-height: 40px;
  max-width: 220px;
  margin-top: 20px;
  }

  &.singup-button {
  max-height: 40px;
  max-width: 220px;
  margin-top: 2px;
  margin-bottom: 10px;
  }

  &.newactivity-button {
  max-height: 50px;
  margin-top: 20px;
  padding: 5px 40px;
  }

  &.register-newactivity{
    padding: 0px 40px;
  }

  &.inline-button {
    width: auto;
    height: 50px;
    padding: 0.9375rem 1.25rem;
    margin: 0 auto;
  }

  &.inline-button-green {
    width: auto;
    height: 50px;
    background: ${({ theme }) => theme.COLORS.GREEN};
    color: ${({ theme }) => theme.COLORS.WHITE};
    padding: 0.9375rem 1.25rem;
    margin: 0 auto;
  }

  &.home-request {
    min-height: 10rem;
  }

  &.inline-button-home {
    width: auto;
  }

  &.reactions {
    width: 40px; /* Define largura menor */
    height: 40px; /* Define altura igual à largura */
    padding: 0; /* Remove o padding */
    border-radius: 50%; /* Botão redondo */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.2rem; /* Ajusta o tamanho da fonte */
    gap: 0; /* Remove espaço extra */
  }

  &.invite {
    padding: 0px 0px;
    font-size: 17px;
  }

  &.icon-button {
    flex: 1; /* Faz os botões crescerem igualmente */
    padding: 10px;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
  }

  &.reverse {
    flex-direction: row-reverse;
  }

  &.green {
    margin: 0;
    background: ${({ theme }) => `linear-gradient(${theme.COLORS.GREEN}, ${theme.COLORS.GREEN_DARK})`};

    &:hover {
      background: ${({ theme }) => `linear-gradient(${theme.COLORS.GREEN_LIGHT}, ${theme.COLORS.GREEN})`};
    }
  }

  &.no-wrap {
    white-space: nowrap;
  }
`
