import { useLocation } from 'react-router-dom';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import './Sign.css';

interface formData {
  img: string;
  title: string;
  p: string;
}

export default function Sign({ img, title, p }: formData) {
  const location = useLocation();

  return (
    <section className='sign'>
      <div className='box'>
        <div className='head'>
          <img src={img} alt="" />
          <h3>{title}</h3>
          <p>{p}</p>
        </div>
        {location.pathname === '/signIn' ? (
          <SignInForm
            signInData={{
              label1: {
                text: 'Email',
                type: 'email',
                place: 'Enter your email',
              },
              label2: {
                text: 'Password',
                type: 'password',
                place: 'Enter your password',
              },
              btn: 'Sign In',
              signP: "Don’t have an account?",
              link: 'Create one',
            }}
          />
        ) : location.pathname === '/signUp' ? (
          <SignUpForm
            signUpData={{
              label1: {
                text: 'Name',
                type: 'text',
                place1: 'First Name',
                place2: 'Last Name',
              },
              label2: {
                text: 'Email',
                type: 'email',
                place: 'Enter your email',
              },
              label3: {
                text: 'Password',
                type: 'password',
                place1: 'Enter password',
                place2: 'Re-enter your password',
              },
              label4: {
                text: 'Profile Image',
                type: 'file',
              },
              btn: 'Sign Up',
              signP: 'Do you have an account?',
              link: 'Sign in',
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
