"use client";
import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState(""); //Tenemos el token

  return (
    <>
      {!isValidToken ? (
        <ValidateTokenForm
          setIsValidToken={setIsValidToken}
          token={token} //validamos en este componente
          setToken={setToken}
        />
      ) : (
        <ResetPasswordForm token={token} /> //Podemos pasar el token a este formulario
      )}
    </>
  );
}
