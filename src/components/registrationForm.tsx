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
            userName: name,
        });

        await this.handleRedirect();
    }

    @withUserActivity("successRegistration")
    async handleRedirect() {
        this.setState({ redirectToHome: true });
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        this.handleRegister();
    }

    render() {
        const { userName, redirectToHome } = this.state;

        if (redirectToHome || localStorage.getItem("userId")) {
            return <Navigate to="/home" replace />;
        }

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "100vh",
                    background: "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)",
                    color: "#f5f5f5",
                    fontFamily: "Inter, sans-serif",
                    margin: 0,
                    padding: 0,
                }}
            >
                <form
                    onSubmit={(e) => this.handleSubmit(e)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "14px",
                        background: "rgba(44, 44, 44, 0.95)",
                        padding: "40px 50px",
                        borderRadius: "16px",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                        minWidth: "320px",
                        textAlign: "center",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <h2 style={{ marginBottom: "8px", fontSize: "20px", fontWeight: 600 }}>
                        Реєстрація
                    </h2>

                    <input
                        type="text"
                        placeholder="Введіть ім’я"
                        value={userName}
                        onChange={(e) => this.setState({ userName: e.target.value })}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            border: "1px solid #555",
                            background: "#3a3a3a",
                            color: "#fff",
                            fontSize: "14px",
                            outline: "none",
                            transition: "border-color 0.2s ease",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#555")}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "8px",
                            border: "none",
                            backgroundColor: "#4a90e2",
                            color: "white",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.2s ease, transform 0.1s ease",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#5aa0f2")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#4a90e2")
                        }
                        onMouseDown={(e) =>
                            (e.currentTarget.style.transform = "scale(0.97)")
                        }
                        onMouseUp={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        Зареєструватися
                    </button>
                </form>
            </div>
        );
    }
}
