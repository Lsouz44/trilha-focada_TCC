import styled from "styled-components"

export const Container = styled.button.attrs((props) => ({
  className: props.className,
}))`
  width: 100%;
  padding: 0.9375rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;

  background-color: ${({ theme, $opacity }) =>
    $opacity ? theme.COLORS.BLUE : theme.COLORS.WHITE};
  border: none;
  border-radius: 0.625rem;

  color: ${({ theme, $opacity }) =>
    $opacity ? theme.COLORS.WHITE : theme.COLORS.BLUE};
  font-size: 1rem;
  text-transform: uppercase;

  cursor: pointer;
  transition: 0.4s;

  opacity: 1;

  > svg {
    font-size: 1.125rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.RED_WHITE};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.COLORS.RED_WHITE};
    color: ${({ theme }) => theme.COLORS.WHITE};
    cursor: not-allowed;
  }

  &.login-button {
  max-height: 40px;
  margin-top: 20px;
  padding: 5px 40px;
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

  &.green {
    margin: 0;
    background-color: ${({ theme }) => theme.COLORS.GREEN_200};

    &:hover {
      background-color: ${({ theme }) => theme.COLORS.GREEN_WHITE};
    }
  }

  &.no-wrap {
    white-space: nowrap;
  }
`
