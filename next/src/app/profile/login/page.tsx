"use client";
import React, { useState } from "react";
import Alert from "@/components/Alert";
import Logo from "@/components/Logo";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (username === "") {
            setShowAlert(true);
            setAlertText("Kein Username");
        } else if (password === "") {
            setShowAlert(true);
            setAlertText("Kein Passwort");
        } else {
            // API call
            fetch("http://142.132.226.214:3010/users/auth", {
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
                        setCookie('user', username);
                        router.push("/"); // Redirect to home page after successful login
                        router.refresh();
                    } else if (response.status === 401) {
                        setShowAlert(true);
                        setAlertText("Die eingegebenen Daten stimmen nicht. Überprüfe sie.");
                    } else {
                        setShowAlert(true);
                        setAlertText("Es gab ein Problem. Bitte versuche es erneut.");
                    }
                })
                .catch((error) => {
                    setShowAlert(true);
                    setAlertText("Es existiert kein Benutzer mit diesem Benutzernamen.");
                    console.error("Error:", error);
                });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="mb-12">
                <Logo width={40} height={40} className="" />
            </div>
            <div className="w-full max-w-xs mx-auto">
                {/* Username Input */}
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
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
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
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

                {/* Login Button */}
                <button
                    className="btn w-full mb-4"
                    style={{ backgroundColor: "#4CAF50", color: "#fff" }} // Green color from the logo
                    onClick={handleLogin}
                >
                    Einloggen
                </button>

                {/* Register Link */}
                <div className="text-center mb-4">
                    <span>Noch keinen Account? </span>
                    <a
                        href="#"
                        className="text-blue-500"
                        onClick={() => router.push("/profile/register")}
                    >
                        Hier Registrieren!
                    </a>
                </div>

                {showAlert ? <Alert>{alertText}</Alert> : null}

            </div>
        </div>
    );
};

export default Login;
