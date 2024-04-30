import firebase from "firebase/compat/app";

declare global {
  interface Window {
    confirmationResult: firebase.auth.ConfirmationResult | undefined;
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  }
}
