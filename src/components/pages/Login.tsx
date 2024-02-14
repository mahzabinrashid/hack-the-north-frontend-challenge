import { useState } from "react";
import styled from "styled-components";
import { authService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import BrowserWindowGradient from "../common/UI/BrowserWindowGradient";
import theme from "src/styles/theme";
import { mediaQueries } from "src/utils/responsive";
import Button from "../common/UI/Button";
import HeaderWithGlow from "../common/UI/HeaderWithGlow";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.form`
  width: 800px;
  padding: 100px 50px;
  ${mediaQueries.tablet} {
    width: 500px;
  }
  ${mediaQueries.largeMobile} {
    width: 250px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid white;
  border-radius: 4px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (authService.login(username, password)) {
      navigate("/events");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <LoginContainer>
      <HeaderWithGlow text="Login" color={theme.colors.primary.orange} />
      <BrowserWindowGradient
        gradientStartColor={theme.colors.primary.orange}
        gradientEndColor={theme.colors.primary.pink}
      >
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div onClick={handleLogin}>
            <Button
              gradientStartColor={theme.colors.hover.orange}
              gradientEndColor={theme.colors.hover.pink}
              hoverGradientStartColor={theme.colors.primary.orange}
              hoverGradientEndColor={theme.colors.primary.pink}
              boxShadow={theme.colors.primary.orange}
              width={240}
            >
              LOG IN
            </Button>
          </div>
        </FormContainer>
      </BrowserWindowGradient>
    </LoginContainer>
  );
};

export default Login;
