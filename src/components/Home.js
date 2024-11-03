import React from 'react';
import { useState } from 'react';


function Home({ qrCodeUrl }) {
  let [modal, setModal] = useState(false);
  const phoneNumber = "01012345678";
  return  <div>
    <button onClick={()=>{
      setModal(!modal)
    }}>전화 걸기</button>
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
    <button>프로필 보기</button>
  </div>;
}

export default Home;