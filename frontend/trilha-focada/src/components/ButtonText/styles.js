import styled from "styled-components"

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background: none;
  border: none;

  color: ${({ theme }) => theme.COLORS.WHITE};
  text-transform: uppercase;

  .close {
    color: ${({ theme }) => theme.COLORS.GREEN_50};
  }

  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: ${({ theme }) => theme.COLORS.GRAY_DARK};
  }

  &.logout {
    &:hover {
      color: ${({ theme }) => theme.COLORS.RED};
    }
  }

  &.menu {
    font-family: "Montserrat", sans-serif;
    text-align: start;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  &.appleStore {
    color: ${({ theme }) => theme.COLORS.GRAY};
  }
`
