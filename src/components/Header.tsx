import { NavLink } from "react-router";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: oklch(27.9% 0.041 260.031);
  width: 100%;
  margin-bottom: 4rem;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem;

  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: white;
      color: oklch(27.9% 0.041 260.031);
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <StyledNav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/todos" end>
          Todos
        </NavLink>
        <NavLink to="/cases" end>
          Cases
        </NavLink>
      </StyledNav>
    </StyledHeader>
  );
}
