import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display:flex;flex-direction:column;justify-content:center;gap:50px;height:100%;
`

const ImgWrap = styled.span`
    display:block;width:50%;padding-bottom:50%;background:gray;margin:0 auto;
`
const BtnWrap = styled.div`
  display:flex;justify-content:center;gap:10px;
`
const Button = styled.button`
  padding:10px;background:none;border:1px solid #111;
`

function Profile(){
    return (
        <ImgWrap></ImgWrap>
    )
}


function Home({ qrCodeUrl }) {
  let [modal, setModal] = useState(false);
  const phoneNumber = "01012345678";
  return  <>
    <Container>
      <Profile></Profile>
      <BtnWrap>
        <Button onClick={()=>{
          setModal(!modal)
        }}>전화 걸기</Button>
        {
          modal === true ? <div className='modal'>
            <div className="inner">
              <div>010-0000-0000</div>
              <a href={`tel:${phoneNumber}`}>Call</a>
              <button className='btn_close' onClick={()=>{
                      setModal(false)
              }}>X</button>
            </div>
          </div> : null
        }
        <Button>프로필 보기</Button>
      </BtnWrap>
    </Container>
  </>;
}

export default Home;