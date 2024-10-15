import { Link } from 'react-router-dom';
import './ErrorModel.css';

interface modaldata {
  signP: string;
  link: string;
  msg: string;
}

export default function ErrorModel({ closeModal, modaldata }: { closeModal: () => void, modaldata: modaldata }) {
  return (
    <div className='modal'>
      <div className='overlay' onClick={closeModal}></div>
      <div className='model-content'>
        <h3>{modaldata.msg}</h3> 
        <p className='sign-p'>
          {modaldata.signP} <Link className='link' to={'/signUp'}>{modaldata.link}</Link> 
        </p>
        <button className='close-modal' onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
