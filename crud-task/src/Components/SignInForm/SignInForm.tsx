import { Link, useNavigate } from 'react-router-dom';
import './SignInForm.css';
import { useState } from 'react';
import axios from 'axios';
import ErrorModel from '../ErrorModel/ErrorModel';
import { signInData } from '../../data/SignIntype';
import Loding from '../Loding/Loding';

export default function SignInForm({ signInData }: { signInData: signInData }) {
  const { label1, label2, btn, signP, link } = signInData;
  const [loading, setLoading] = useState(false);
  const [informData, setInformData] = useState({
    email: '',
    password: '',
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const modalData = {
    msg: 'Incorrect email or password',
    signP: 'Don’t have an account?',
    link: 'Create one',
  };

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://test1.focal-x.com/api/login', {
        email: informData.email,
        password: informData.password,
      });
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      localStorage.setItem("first_name", `${response.data.user.first_name}`);
      localStorage.setItem("last_name", `${response.data.user.last_name}`);
      localStorage.setItem("img", `${response.data.user.profile_image_url}`);
      navigate('/dashboard', { state: { email: informData.email ,password: informData.password} });
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    } finally {
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
      {showErrorModal && <ErrorModel closeModal={() => setShowErrorModal(false)} modaldata={modalData} />}
      <form className='in-form' onSubmit={send}>
        {/* email */}
        <label>{label1.text}</label>
        <input
          required
          type={label1.type}
          placeholder={label1.place}
          onChange={(event) => setInformData({ ...informData, email: event.target.value })}
        />
        {/* password */}
        <label>{label2.text}</label>
        <input
          required
          type={label2.type}
          placeholder={label2.place}
          onChange={(event) => setInformData({ ...informData, password: event.target.value })}
        />
        <button type="submit">{btn}</button>
      </form>
      <p className='sign-pi'>
        {signP} <Link className='link' to={'/signUp'}>{link}</Link>
      </p>
    </>
  );
}
