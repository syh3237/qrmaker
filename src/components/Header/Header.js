import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #555;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #777;
  }
`;

function Header({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // 로그아웃 콜백 호출
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <HeaderContainer>
      <Logo to="/">MyLogo</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </Nav>
      <Actions>
        {isAuthenticated ? (
          <>
            <Button onClick={handleLogoutClick}>로그아웃</Button>
            <NavLink to="/admin">내정보</NavLink>
          </>
        ) : (
          <Button onClick={() => navigate('/login')}>로그인</Button>
        )}
      </Actions>
    </HeaderContainer>
  );
}

export default Header;