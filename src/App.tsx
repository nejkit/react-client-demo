// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistrationForm } from "./components/registrationForm";
import { Home } from "./components/Home";
import { withSessionTracking } from "./decorators/withUserHowerActivity";
import {UserActivityPage} from "./components/UserActivityPage.tsx";
import {AllUsersActivityPage} from "./components/AllUsersActiivtyPage.tsx";

@withSessionTracking("userSession")
export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    {/* Страница регистрации */}
                    <Route path="/register" element={<RegistrationForm />} />

                    {/* Домашняя страница */}
                    <Route path="/home" element={<Home />} />

                    <Route path="/stats" element={<UserActivityPage />} />

                    <Route path="/stats/group" element={<AllUsersActivityPage />} />

                    {/* Если пользователь зашел на / или неизвестный путь — перенаправляем */}
                    <Route path="*" element={<Navigate to="/register" replace />} />
                </Routes>

                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </BrowserRouter>
        );
    }
}
