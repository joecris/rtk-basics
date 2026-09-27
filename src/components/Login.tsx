import styled from "styled-components";
import viteImgSrc from "../assets/vite.svg";

const LoginContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px;
  border-radius: 5px;
  box-shadow: 10px 5px 5px #cfcfcf;
  padding: 2rem 4rem;
  background-color: oklch(96.8% 0.007 247.896);
`;

const LoginHeader = styled.h1`
  text-align: center;
  color: oklch(20.8% 0.042 265.755);
`;

const CTAButtonsContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled.button<{ $variant?: string }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) =>
    props.$variant === "primary" ? "#BF4F74" : "white"};
  color: ${(props) => (props.$variant === "primary" ? "white" : "#BF4F74")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

export default function Login() {
  return (
    <>
      <LoginContainer>
        <img src={viteImgSrc} alt="vite logo" />
        <LoginHeader>Login to the app</LoginHeader>
        <CTAButtonsContainer>
          <StyledButton $variant="primary">Login</StyledButton>
          <StyledButton>Signup</StyledButton>
        </CTAButtonsContainer>
      </LoginContainer>
    </>
  );
}
