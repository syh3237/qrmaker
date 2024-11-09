import react from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;flex-direction:column;
    width:50%;
    margin:30% auto;
`

const ImgWrap = styled.span`
    display:block;width:100%;padding-bottom:100%;background:gray;
`

function Profile(){
    return (
        <Container>
            <ImgWrap></ImgWrap>
        </Container>
    )
}

export default Profile;