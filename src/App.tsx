import styled from "styled-components";
import Login from "./components/Login";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

function App() {
  return (
    <MainContainer>
      <Login />
    </MainContainer>
  );
}

export default App;
