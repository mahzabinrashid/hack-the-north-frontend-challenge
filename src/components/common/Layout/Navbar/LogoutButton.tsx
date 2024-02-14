import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../../../../services/AuthService";

const StyledButton = styled.button`
  padding: 10px 20px;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: white;
    color: #141425;
  }
`;

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return <StyledButton onClick={handleLogout}>Logout</StyledButton>;
};

export default LogoutButton;
