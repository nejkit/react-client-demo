// src/pages/Home.tsx
import React from "react";
import { Navigate, Link } from "react-router-dom";
import { withUserActivity } from "../decorators/withUserActivity";
import { ImageHolder } from "../components/imageHolder";

interface HomeProps {
    onLogout?: () => void;
}

interface HomeState {
    userId: string | null;
    userName: string | null;
    redirectToRegister: boolean;
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            userName: localStorage.getItem("userName"),
            redirectToRegister: false,
        };
    }

    componentDidMount() {
        // Проверяем при загрузке — если нет данных, ставим redirect флаг
        const { userId, userName } = this.state;
        if (!userId || !userName) {
            this.setState({ redirectToRegister: true });
        }
    }

    @withUserActivity("logout")
    handleLogout(): void {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        this.setState({ redirectToRegister: true });
        this.props.onLogout?.();
    }

    render() {
        const { userName, redirectToRegister } = this.state;

        // Если нет данных — переходим на страницу регистрации
        if (redirectToRegister) {
            return <Navigate to="/register" replace />;
        }

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#1e1e1e",
                    color: "#f5f5f5",
                    fontFamily: "Inter, sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        background: "#2c2c2c",
                        padding: "24px 32px",
                        borderRadius: "16px",
                        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                    }}
                >
                    <ImageHolder label="Avatar" />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "12px",
                        }}
                    >
                        <h2 style={{ fontSize: "20px", fontWeight: 600 }}>
                            Привет, {userName || "пользователь"} 👋
                        </h2>
                        <button
                            onClick={() => this.handleLogout()}
                            style={{
                                backgroundColor: "#e74c3c",
                                color: "white",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "background 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#ff5c4c")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#e74c3c")
                            }
                        >
                            Выйти
                        </button>
                    </div>
                </div>

                <p style={{ marginTop: "24px", opacity: 0.6 }}>
                    Нужен другой пользователь?{" "}
                    <Link to="/register" style={{ color: "#4a90e2" }}>
                        Зарегистрируйтесь снова
                    </Link>
                </p>
            </div>
        );
    }
}
