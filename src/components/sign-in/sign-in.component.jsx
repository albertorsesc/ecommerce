import { useState } from "react";
import { 
  signInWithGooglePopup, 
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import Button from "../button/button.component";

const formData = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [form, setForm] = useState(formData);
  const { email, password } = form;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      
      resetForm();
    } catch (error) {
      if (
        error.code === 'auth/wrong-password' || 
        error.code === 'auth/user-not-found'
      ) {
        alert('Incorrect credentials');
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

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>

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

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button 
            onClick={signInWithGoogle} 
            buttonType='google' 
            type='button'>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;