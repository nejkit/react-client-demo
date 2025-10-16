// src/components/RegistrationForm.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { register } from "../services/login";
import { withUserActivity } from "../decorators/withUserActivity";

interface RegistrationFormState {
    userName: string;
    userId: string | null;
    redirectToHome: boolean;
}

export class RegistrationForm extends React.Component<{}, RegistrationFormState> {
    constructor() {
        super({});
        this.state = {
            userName: "",
            userId: localStorage.getItem("userId"),
            redirectToHome: false,
        };
    }

    async handleRegister(): Promise<void> {
        const name = this.state.userName.trim();
        if (!name) return;

        const newUser = await register({ name });
        localStorage.setItem("userId", newUser.userId);
        localStorage.setItem("userName", name);

        this.setState({
            userId: newUser.userId,
            userName: name
        });

        await this.handleRedirect()
    }

    @withUserActivity("successRegistration")
    async handleRedirect() {
        this.setState({
            ...this.state,
            redirectToHome: true,
            }
        )
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        this.handleRegister();
    }

    render() {
        const { userName, redirectToHome } = this.state;

        // ✅ Редирект после регистрации
        if (redirectToHome || localStorage.getItem("userId")) {
            return <Navigate to="/home" replace />;
        }

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#1e1e1e",
                    color: "#f5f5f5",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <form
                    onSubmit={(e) => this.handleSubmit(e)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        background: "#2c2c2c",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                        minWidth: "300px",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "8px" }}>
                        Регистрация
                    </h2>

                    <input
                        type="text"
                        placeholder="Введите имя"
                        value={userName}
                        onChange={(e) => this.setState({ userName: e.target.value })}
                        style={{
                            padding: "10px 12px",
                            borderRadius: "6px",
                            border: "1px solid #555",
                            background: "#3a3a3a",
                            color: "#fff",
                            fontSize: "14px",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            padding: "10px 16px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#4a90e2",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: 500,
                            transition: "background 0.2s ease",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#5aa0f2")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#4a90e2")
                        }
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        );
    }
}
