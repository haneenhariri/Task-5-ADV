import { Link, useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import { useState } from 'react';
import { signUpData, FormDatatype } from '../../data/SignUptype';
import SignUpApi from '../../Api/SignUpApi/SignUpApi';
import ErrorModel from '../ErrorModel/ErrorModel';
import Loding from '../Loding/Loding';

export default function SignInForm({ signUpData }: { signUpData: signUpData }) {
  const { label1, label2, label3, label4, btn, signP, link } = signUpData;
  const [UpformData, setUpformData] = useState<FormDatatype>({
    fname: '',
    lname: '',
    email: '',
    password: '',
    repassword: '',
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const modalData = {
    signP: 'Do you have an account? ',
    link: 'Sign in'
  };

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (UpformData.password !== UpformData.repassword) {
      setModalMessage('Passwords do not match'); 
      setShowErrorModal(true); 
      return;
    }

    const formData = new FormData();
    formData.append('first_name', UpformData.fname);
    formData.append('last_name', UpformData.lname);
    formData.append('user_name', UpformData.fname); 
    formData.append('email', UpformData.email);
    formData.append('password', UpformData.password);
    formData.append('password_confirmation', UpformData.repassword);
    
    if (UpformData.img) {
      formData.append('profile_image', UpformData.img);
    }
    try {
      setLoading(true);
      const response = await SignUpApi(formData);
      localStorage.setItem('token', `Bearer ${response.data.token}`);
      navigate('/dashboard');
    } 
    catch (error) {
      console.error(error);
      setModalMessage('Registration failed. Please try again.');
      setShowErrorModal(true);
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <Loding
         loading = {loading}
        />
      )}
      {showErrorModal && (
        <ErrorModel 
          closeModal={() => setShowErrorModal(false)} 
          modaldata={{ ...modalData, msg: modalMessage }} 
        />
      )}
      <form className="up-form" onSubmit={send}>
        <label>{label1.text}</label>
        <div className="input-box">
          <input
            type={label1.type}
            required
            placeholder={label1.place1}
            onChange={(event) =>
              setUpformData({ ...UpformData, fname: event.target.value })
            }
          />
          <input
            type={label1.type}
            required
            placeholder={label1.place2}
            onChange={(event) =>
              setUpformData({ ...UpformData, lname: event.target.value })
            }
          />
        </div>
        <label>{label2.text}</label>
        <input
          type={label2.type}
          required
          placeholder={label2.place}
          onChange={(event) =>
            setUpformData({ ...UpformData, email: event.target.value })
          }
        />
        <label>{label3.text}</label>
        <div className="input-box">
          <input
            type={label3.type}
            required
            placeholder={label3.place1}
            onChange={(event) =>
              setUpformData({ ...UpformData, password: event.target.value })
            }
          />
          <input
            type={label3.type}
            required
            placeholder={label3.place2}
            onChange={(event) =>
              setUpformData({ ...UpformData, repassword: event.target.value })
            }
          />
        </div>
        <label>{label4.text}</label>
        <div>
          <label htmlFor="img-input" className="label-img">
            <img src="./assets/image/Upload icon.png" alt="Upload icon" />
          </label>
          <input
            className="input-img"
            id="img-input"
            required
            type={label4.type}
            onChange={(event) => {
              const file = event.target.files ? event.target.files[0] : null;
              setUpformData({ ...UpformData, img: file });
            }}
          />
        </div>
        <button type="submit">{btn}</button>
      </form>

      <p className="sign-p">
        {signP} <Link className="link" to={'/signIn'}>{link}</Link>
      </p>
    </>
  );
}
