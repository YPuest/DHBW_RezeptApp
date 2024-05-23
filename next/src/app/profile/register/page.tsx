"use client";
import React, { useState } from "react";
import Alert from "@/components/Alert";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const router = useRouter();

  const handleRegister = () => {
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
              setCookie("loggedIn", true);
              router.push("/"); // Nach erfolgreicher Registrierung zur Startseite weiterleiten
              router.refresh();
            } else if (response.status === 400) {
              setShowAlert(true);
              setAlertText("User existiert bereits, kein neuer User angelegt");
            } else {
              setShowAlert(true);
              setAlertText("Interner Serverfehler, siehe Log. Not 400");
            }
          })
          .catch((error) => {
            setShowAlert(true);
            setAlertText("User existiert bereits, kein neuer User angelegt");
            console.error("Error:", error);
          });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-xs mx-auto">
          {/* Username Input */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
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
                onKeyPress={handleKeyPress}
            />
          </label>

          {/* Password Input */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
            >
              <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
              />
            </svg>
            <input
                type="password"
                className="grow"
                placeholder="Passwort"
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
            />
          </label>

          {/* PasswordRepeat Input */}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
            >
              <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
              />
            </svg>
            <input
                type="password"
                className="grow"
                placeholder="Passwort wiederholen"
                onChange={(e) => setPasswordRep(e.target.value)}
                onKeyPress={handleKeyPress}
            />
          </label>

          {/* Register Button */}
          <button
              className="btn btn-primary w-full mb-4"
              onClick={handleRegister}
          >
            Registrieren
          </button>

          {/* Register Link */}
          <div className="text-center mb-4">
            <span>Schon einen Account? </span>
            <a
                href="#"
                className="text-blue-500"
                onClick={() => router.push("/profile/login")}
            >
              Hier Einloggen!
            </a>
          </div>

          {showAlert ? <Alert>{alertText}</Alert> : null}
        </div>
      </div>
  );
};

export default Register;
