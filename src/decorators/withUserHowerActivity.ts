// src/decorators/withSessionTracking.ts
import type { SaveActivityRequestDto } from "../types/activity";
import { saveUserActivity } from "../services/activity";

/**
 * Декоратор для отслеживания времени пребывания пользователя на сайте
 * Работает стабильно даже при закрытии или рефреше вкладки
 */
export function withSessionTracking(action: string = "session") {
    return function <T extends { new (...args: any[]): any }>(constructor: T) {
        return class extends constructor {
            private __sessionStart = performance.now();
            private __userId = localStorage.getItem("userId") ?? "anonymous";
            private __initialized = false;

            constructor(...args: any[]) {
                super(...args);

                if (!this.__initialized) {
                    this.__initialized = true;

                    this.__sessionStart = performance.now();

                    window.addEventListener("visibilitychange", this.__onVisibilityChange);
                    window.addEventListener("pagehide", this.__onPageHide);

                    console.log("[SessionTracking] started for:", this.__userId);
                }
            }

            /**
             * Отправка данных при скрытии вкладки или закрытии окна
             */
            private __onPageHide = () => {
                this.__sendSessionData("pagehide");
            };

            private __onVisibilityChange = () => {
                if (document.visibilityState === "hidden") {
                    this.__sendSessionData("hidden");
                }
            };

            private __sendSessionData(reason: string) {
                const duration = performance.now() - this.__sessionStart;
                const payload: SaveActivityRequestDto = {
                    userId: this.__userId,
                    action,
                    metadata: {
                        page: window.location.pathname,
                        duration,
                        timestamp: new Date().toISOString(),
                        reason,
                    },
                };

                void saveUserActivity(payload);

                console.log("[SessionTracking] Session sent:", payload);
            }
        };
    };
}
