
import type { SaveActivityRequestDto } from "../types/activity";
import {saveUserActivity} from "../services/activity.ts";

/**
 * Автоматический декоратор отслеживания активности.
 * Берёт userId из localStorage, не требует передавать его вручную.
 */
export function withUserActivity(eventType: string) {
    return function(
        _target: object,
        _propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        if (typeof originalMethod !== "function") {
            throw new Error(`@withUserActivity можно применять только к методам, а не к ${typeof originalMethod}`);
        }

        descriptor.value = function (...args: unknown[]): unknown {
            // 🧠 достаём userId из localStorage
            const userId = localStorage.getItem("userId") ?? "anonymous";

            const metadata = buildActivityMetadata()

            const payload: SaveActivityRequestDto = {
                userId,
                action: eventType,
                metadata,
            };

            // 🚀 fire-and-forget
            void saveUserActivity(payload);

            // вызываем оригинальный метод
            return originalMethod.apply(this, args);
        };
    };
}

export function buildActivityMetadata(
): Record<string, unknown> {
    return {
        page: window.location.pathname,
        element: document.activeElement?.tagName?.toLowerCase() ?? null,
        elementId: document.activeElement?.id ?? null,
    };
}