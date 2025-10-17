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
    static contextType?: React.Context<any>;
    navigate = (window as any).navigate || null;

    constructor(props: HomeProps) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            userName: localStorage.getItem("userName"),
            redirectToRegister: false,
        };
    }

    componentDidMount() {
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

    @withUserActivity("goToStats")
    handleGoToStats() {}

    @withUserActivity("goToGroupStats")
    handleGoToStatsGroup() {}

    render() {
        const { userName, redirectToRegister } = this.state;

        if (redirectToRegister) {
            return <Navigate to="/register" replace />;
        }

        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)",
                    color: "#f5f5f5",
                    fontFamily: "Inter, sans-serif",
                    margin: 0,
                    padding: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "rgba(44, 44, 44, 0.95)",
                        borderRadius: "20px",
                        padding: "40px 50px",
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                        backdropFilter: "blur(12px)",
                        maxWidth: "420px",
                        width: "90%",
                    }}
                >
                    <ImageHolder label="Аватар" />

                    <h2
                        style={{
                            marginTop: "20px",
                            fontSize: "22px",
                            fontWeight: 600,
                        }}
                    >
                        Привіт, {userName || "користувач"} 👋
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            width: "100%",
                            marginTop: "25px",
                        }}
                    >
                        <Link
                            to="/stats"
                            onClick={this.handleGoToStats}
                            style={{
                                display: "block",
                                width: "100%",
                                backgroundColor: "#4a90e2",
                                color: "white",
                                padding: "10px 0",
                                borderRadius: "8px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "background 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#5aa0f2")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#4a90e2")
                            }
                        >
                            Перейти до статистики
                        </Link>

                        <Link
                            to="/stats/group"
                            onClick={this.handleGoToStatsGroup}
                            style={{
                                display: "block",
                                width: "100%",
                                backgroundColor: "#4a90e2",
                                color: "white",
                                padding: "10px 0",
                                borderRadius: "8px",
                                fontWeight: 600,
                                textDecoration: "none",
                                transition: "background 0.2s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "#5aa0f2")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "#4a90e2")
                            }
                        >
                            Групова статистика
                        </Link>
                    </div>

                    <button
                        onClick={() => this.handleLogout()}
                        style={{
                            marginTop: "25px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            padding: "12px 28px",
                            borderRadius: "10px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            boxShadow: "0 6px 15px rgba(231, 76, 60, 0.3)",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#ff5c4c")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e74c3c")
                        }
                    >
                        Вийти
                    </button>

                    <p
                        style={{
                            marginTop: "28px",
                            fontSize: "14px",
                            opacity: 0.7,
                        }}
                    >
                        Потрібен інший користувач?{" "}
                        <Link
                            to="/register"
                            style={{
                                color: "#4a90e2",
                                textDecoration: "none",
                                fontWeight: 500,
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.textDecoration = "underline")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.textDecoration = "none")
                            }
                        >
                            Зареєструйтесь знову
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}
