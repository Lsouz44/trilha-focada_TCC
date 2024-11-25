import styled from "styled-components"

export const Container = styled.button.attrs((props) => ({
  className: props.className,
}))`
  width: 40%;
  padding: 0.9375rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  font-family: 'Baloo Bhai 2', serif;
  background: ${({ theme, $opacity }) =>
    $opacity ? `linear-gradient(${theme.COLORS.BLUE_LIGHT}, ${theme.COLORS.BLUE})` : theme.COLORS.WHITE};
  border: none;
  border-radius: 0.625rem;
  flex-direction: column;

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

  &.login-button {
  max-height: 40px;
  margin-top: 20px;
  padding: 5px 40px;
  align-items: center;
  justify-content: center;
  }

  &.inline-button {
    width: auto;
    padding: 0.9375rem 1.25rem;
    margin: 0 auto;
  }

  &.home-request {
    min-height: 10rem;
  }

  &.inline-button-home {
    width: auto;
  }

  &.reverse {
    flex-direction: row-reverse;
  }


justify-content: center;
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
