import styled from "styled-components"

export const Container = styled.div`
  width: 340px;
  height: calc(
    100vh - ${({ $heightAdjuster }) => `${$heightAdjuster / 16}rem`}
  );

  background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT};

  position: fixed;
  z-index: 4;
  right: 0;
  top: ${({ $heightAdjuster }) => `${$heightAdjuster / 16}rem`};
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &[data-menu-is-open="true"] {
    transform: translateX(0);
  }

  > nav {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: start;

    overflow-y: auto;
    max-height: calc(
      100vh - ${({ $heightAdjuster }) => `${$heightAdjuster / 16}px`} - 60px
    );

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT};
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.COLORS.BLUE};
    }

    > button {
      margin-top: auto;
      margin-bottom: 1.25rem;
      font-size: 1rem;

      margin-right: 0.625rem;
    }
  }

  > div {
    width: 300px;
    padding: 1.25rem;
    background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT2};

    display: flex;
    align-items: center;
    justify-content: flex-end;

    position: fixed;
    bottom: 0;
    right: 0;
  }
`

export const Modules = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  .title-module {
    width: 100%;
    padding: 1.25rem;

    font-family: "Montserrat", sans-serif;
    text-align: start;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.COLORS.WHITE};
    background-color: ${({ theme, $active }) =>
      $active ? theme.COLORS.BLUE_DARK : theme.COLORS.BLUE_LIGHT};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.WHITE};

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.COLORS.BLUE};
    }
  }

  > li {
    width: 100%;
    padding: 1.25rem;

    font-family: "Montserrat", sans-serif;
    text-align: start;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.COLORS.WHITE};

    background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT2};
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.WHITE};

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.COLORS.BLUE};
    }
  }
`
