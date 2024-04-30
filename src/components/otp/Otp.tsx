"use client";
import React, { useRef, useEffect, useState, KeyboardEvent } from "react";
import styles from "./otp.module.css";
import { supabase } from "@/utils/supabaseConnection";
import { useStoreRegister } from "@/utils/store";
import { createClient } from "@supabase/supabase-js";

const OTPForm: React.FC = () => {
  const [otpValue, setOtpValue] = useState<string>(""); // State to store the OTP value
  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleInputChange = (
    index: number,
    value: string,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus();
    } else if (!value && index > 0 && event.key === "Backspace") {
      event.preventDefault();
      inputRefs[index - 1]?.current?.focus();
      setOtpValue((prevValue) => prevValue.slice(0, -1)); // Remove the last character from the OTP value
    } else if (!value && index === 0 && event.key === "Backspace") {
      event.preventDefault();
    } else if (value.length === 1) {
      setOtpValue((prevValue) => prevValue + value); // Append the input value to the OTP value
    }
  };

  useEffect(() => {
    // Focus on the first input field when the component mounts
    inputRefs[0].current?.focus();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const { phone, firstName, email, lastName, password } = useStoreRegister();

  const supbaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SERVICE_ROLE as string
  );

  const handleSignUp = async () => {
    await supbaseAdmin.auth.admin.createUser({
      email,
      password,
      phone,
      email_confirm: true,
      phone_confirm: true,
      user_metadata: {
        full_name: firstName + " " + lastName,
      },
    });
  };

  const verifyOtp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const concatenatedValue = inputRefs.reduce((acc, inputRef) => {
      return acc + (inputRef.current?.value || "");
    }, "");
    if (concatenatedValue.length === 6) {
      // verify otp
      let confirmationResult = window.confirmationResult;
      confirmationResult!
        .confirm(concatenatedValue)
        .then((result: any) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          handleSignUp();
          alert("User signed in successfully");
          // ...
        })
        .catch((error: any) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.title}>OTP</div>
      <div className={styles.title}>Verification Code</div>
      <p className={styles.message}>
        We have sent a verification code to your mobile number
      </p>
      <div className={styles.inputs}>
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            id={`input${index + 1}`}
            type="text"
            maxLength={1}
            className={styles.input}
            onKeyDown={(e) =>
              handleInputChange(index, e.currentTarget.value, e)
            }
            onChange={() => {}} // Prevent React warnings about uncontrolled inputs
          />
        ))}
      </div>
      <button onClick={(e) => verifyOtp(e)} className={styles.action}>
        verify me
      </button>
    </form>
  );
};

export default OTPForm;
