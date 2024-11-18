import styled from "styled-components"

export const Container = styled.header`
  grid-area: header;

  width: 100%;
  height: 65px;
  background: ${({ theme }) => theme.COLORS.BLUE_LIGHT2};
  background-size: cover;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  

  z-index: 5;

  position: fixed;
  top: 0;
  left: 0;

  > img {
    padding: 30px;
    width: 35px;
  }

  .central-logo {
    width: 210px;
    height: auto;
  }
`

export const Nav = styled.nav`
  > ul {
    list-style: none;

    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;

    > li {
      > a {
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 1.25rem;
      }
    }
  }
`
