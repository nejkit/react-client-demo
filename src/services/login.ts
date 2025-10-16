import type {RegisterUserRequestDto, RegisterUserResponseDto} from "../types/users.ts";

const BASE_API_PATH = 'http://localhost:1025/api/v1/users'

export const register = async (request: RegisterUserRequestDto) => {
    try {
        const response = await fetch(
            `${BASE_API_PATH}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request)
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json() as RegisterUserResponseDto
    }
    catch {
        throw new Error("fail call api");
    }
}