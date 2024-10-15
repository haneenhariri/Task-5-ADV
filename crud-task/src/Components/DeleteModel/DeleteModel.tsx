import './DeleteModel.css';

interface modaldata {
  msg: string;
  btn1: string;
  btn2: string;
}

export default function DeleteModel({ closeModal, modaldata, onConfirm }: { closeModal: () => void, modaldata: modaldata, onConfirm: () => void }) {
  return (
    <div className='modal'>
      <div className='overlay' onClick={closeModal}></div>
      <div className='model-content'>
        <h3>{modaldata.msg}</h3> 
        <div className='model-btns'>
          <button 
            onClick={onConfirm}>{modaldata.btn1}</button>
          <button onClick={closeModal}>{modaldata.btn2}</button> 
        </div>
      </div>
    </div>
  );
}
