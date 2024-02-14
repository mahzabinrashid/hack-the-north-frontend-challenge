import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoutButton from "./LogoutButton";
import { authService } from "src/services/AuthService";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #141425;
  padding: 0 20px;
  border-bottom: 1px solid white;
  z-index: 1000;
`;

const Brand = styled.div`
  font-size: 18px;
`;

const NavLinksContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 40px;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #141425;
  padding: 20px;

  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: auto;

  &:hover {
    color: #aaa;
  }
`;
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onAuthChange = () => {
      setIsLoggedIn(authService.isAuthenticated());
    };

    window.addEventListener("authChange", onAuthChange);

    return () => {
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  return (
    <NavbarContainer>
      <Brand>
        <NavbarLink to="/">Hack the North</NavbarLink>
      </Brand>
      <NavLinksContainer>
        <NavLinks>
          <NavbarLink to="/events">Events</NavbarLink>
          {!isLoggedIn ? (
            <NavbarLink to="/login">Login</NavbarLink>
          ) : (
            <LogoutButton />
          )}
        </NavLinks>
      </NavLinksContainer>
      <MenuToggle onClick={toggleMenu}>{isOpen ? "✕" : "☰"}</MenuToggle>
      <MobileMenu isOpen={isOpen}>
        <NavbarLink to="/events">Events</NavbarLink>
        {!isLoggedIn ? (
          <NavbarLink to="/login">Login</NavbarLink>
        ) : (
          <LogoutButton />
        )}
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;
