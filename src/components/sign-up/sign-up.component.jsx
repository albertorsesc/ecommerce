import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss';
import Button from "../button/button.component";

const formData = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [form, setForm] = useState(formData);
  const { displayName, email, password, confirmPassword } = form;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName })

      resetForm();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use!');
      } else {
        console.log('user creation encountered an error: ' + error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({...form, [name]: value});
  };

  const resetForm = () => {
    setForm(formData);
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Display Name"
          onChange={handleChange} 
          name="displayName" 
          value={displayName}
          type="text" 
          required />

          <FormInput 
          label="Email"
          onChange={handleChange} 
          name="email" 
          value={email}
          type="email" 
          required />

        <FormInput 
          label="Password"
          onChange={handleChange} 
          name="password" 
          value={password}
          type="password" 
          required />

        <FormInput 
          label="Confirm Password"
          onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword}
          type="password" 
          required />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;