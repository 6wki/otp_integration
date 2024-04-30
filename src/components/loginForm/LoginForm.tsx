"use client";

import { useStoreRegister } from "@/utils/store";
import styles from "./loginForm.module.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase";
import { supabase } from "@/utils/supabaseConnection";

const LoginForm: React.FC = () => {
  const {
    phone,
    setHasFilled,
    setFirstName,
    setLastName,
    setPhone,
    setPassword,
    setEmail,
    firstName,
    email,
    lastName,
    password,
  } = useStoreRegister();

  const generateRecaptcha = (): void => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    });
  };

  const handleSend = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult: any) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error: any) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  return (
    <form className={styles.form}>
      <p className={styles.title}>Register </p>
      <p className={styles.message}>
        Signup now and get full access to our app.{" "}
      </p>
      <div className={styles.flex}>
        <label>
          <input
            required={true}
            placeholder=""
            type="text"
            className={styles.input}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>Firstname</span>
        </label>

        <label>
          <input
            required={true}
            placeholder=""
            type="text"
            className={styles.input}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>Lastname</span>
        </label>
      </div>

      <label>
        <input
          required={true}
          placeholder=""
          type="phone"
          className={styles.input}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span>Phone</span>
      </label>

      <label>
        <input
          required={true}
          placeholder=""
          type="email"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Email</span>
      </label>

      <label>
        <input
          required={true}
          placeholder=""
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Password</span>
      </label>
      <label>
        <input
          required={true}
          placeholder=""
          type="password"
          className={styles.input}
        />
        <span>Confirm password</span>
      </label>
      <button
        onClick={(event: any) => handleSend(event)}
        className={styles.submit}
      >
        Submit
      </button>
      {/* <p className={styles.signin}>
        Already have an acount ? <a href="#">Signin</a>
      </p> */}
    </form>
  );
};

export default LoginForm;
