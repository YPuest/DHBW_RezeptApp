"use client";
import React, { useState } from "react";
import Alert from "@/components/Alert";
import { setCookie } from "cookies-next";

const handleRegister = () => {};

const Regsiter = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  return (
    <>
      <div>
        {/*Username Input*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        {/*Password Input*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Passwort"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/*PasswordRepeat Input*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Passwort wiederholen"
            onChange={(e) => setPasswordRep(e.target.value)}
          />
        </label>

        {/*Register Button*/}
        <button
          className="btn"
          onClick={() => {
            if (username === "") {
              setShowAlert(true);
              setAlertText("Kein Username");
            } else if (password === "") {
              setShowAlert(true);
              setAlertText("Passwort fehlt");
            } else if (password !== passwordRep) {
              setShowAlert(true);
              setAlertText("Die Passwörter stimmen nicht überein");
            } else {
              console.log(password);
              console.log(passwordRep);
              // API-Anruf
              fetch("http://142.132.226.214:3010/users/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: username,
                  pass: password,
                }),
              })
                .then((response) => {
                  if (response.ok) {
                    setShowAlert(true);
                    setAlertText("User erfolgreich angelegt");
                    setCookie("loggedIn", true);
                  } else if (response.status === 400) {
                    setShowAlert(true);
                    setAlertText(
                      "User existiert bereits, kein neuer User angelegt"
                    );
                  } else {
                    setShowAlert(true);
                    setAlertText("Interner Serverfehler, siehe Log. Not 400");
                  }
                })
                .catch((error) => {
                  setShowAlert(true);
                  setAlertText(
                    "User existiert bereits, kein neuer User angelegt"
                  );
                  {
                    /*error in api*/
                  }
                  console.error("Error:", error);
                });
            }
          }}
        >
          Registrieren
        </button>

        {showAlert ? <Alert>{alertText}</Alert> : <></>}
      </div>
    </>
  );
};

export default Regsiter;
