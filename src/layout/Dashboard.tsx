import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "../components/Header";

const StyledMain = styled.main`
  background-color: oklch(92.9% 0.013 255.508);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export default function Dashboard() {
  return (
    <StyledMain>
      <Header />
      <Outlet />
    </StyledMain>
  );
}
