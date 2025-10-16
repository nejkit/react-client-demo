import type {SaveActivityRequestDto} from "../types/activity.ts";

const BASE_API_PATH = "http://localhost:1025/api/v1/activities"

export async function saveUserActivity(request: SaveActivityRequestDto): Promise<void> {
    try {
        const response = await fetch(
            `${BASE_API_PATH}`,
            {
                method: "POST",
                body: JSON.stringify(request)
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText)
        }
    }
    catch {
        throw new Error("fail call api");
    }
}