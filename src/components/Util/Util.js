import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fafafa;
    box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.1);
`;

const UtilList = styled.ul`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 7%;
    box-sizing: border-box;
`;

const List = styled.li`
    font-size: 14px;
    color: #111;
`;

const Menu = styled.div`
    display:flex;flex-direction:column;
    justify-content:center;gap:5px;height:100%;
`

const Button = styled.button`
    background: none;
    padding: 15px;
    border: 0;
    font-size: 14px;
    cursor: pointer;
    color: #007BFF;
`;

const Line = styled.span`
    width:25px;height:1px;
    background:#111;
`

function Util({ isAuthenticated, userId, onLogout }) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/login');
    };

    const handleAdminClick = () => {
        if (isAuthenticated && userId) {
            navigate(`/admin/${userId}`); // userId를 포함한 경로로 이동
        } else {
            alert("로그인이 필요합니다.");
            navigate('/login');
        }
    };

    return (
        <Container>
            <UtilList>
                <List>
                    {/* <Button onClick={() => navigate('/menu')}>Menu</Button> */}
                    <Menu>
                        <Line></Line>
                        <Line></Line>
                        <Line></Line>
                    </Menu>
                </List>
                <List>
                    <Button onClick={() => navigate('/')}>Home</Button>
                </List>
                <List>
                    <Button onClick={handleAdminClick}>My</Button>
                </List>
                <List>
                    {isAuthenticated ? (
                        <Button onClick={handleLogoutClick}>로그아웃</Button>
                    ) : (
                        <Button onClick={() => navigate('/login')}>로그인</Button>
                    )}
                </List>
            </UtilList>
        </Container>
    );
}

export default Util;