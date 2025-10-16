import type {
    GetUserActivityResponseDto, GetUserActivityStatisticResponseDto,
    GetUsersActivityResponseDto, GetUsersActivityStatisticResponseDto,
    SaveActivityRequestDto
} from "../types/activity.ts";

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
    } catch {
        throw new Error("fail call api");
    }
}

export async function getUserActivities(userId: string, fromDate?: string, toDate?: string): Promise<GetUserActivityResponseDto> {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    try {
        const response = await fetch(`${BASE_API_PATH}/events?${params.toString()}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json() as GetUserActivityResponseDto;
    } catch {
        throw new Error("fail call api");
    }
}

export async function getUsersActivity(fromDate?: string, toDate?: string): Promise<GetUsersActivityResponseDto> {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    try {
        const response = await fetch(`${BASE_API_PATH}/events/group?${params.toString()}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json() as GetUsersActivityResponseDto;
    } catch {
        throw new Error("fail call api");
    }
}

export async function getUserStatistics(userId: string, fromDate?: string, toDate?: string): Promise<GetUserActivityStatisticResponseDto> {
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    try {
        const response = await fetch(`${BASE_API_PATH}/statistics?${params.toString()}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json() as GetUserActivityStatisticResponseDto;
    } catch {
        throw new Error("fail call api");
    }
}

export async function getUsersStatistic(fromDate?: string, toDate?: string): Promise<GetUsersActivityStatisticResponseDto> {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);

    try {
        const response = await fetch(`${BASE_API_PATH}/statistics/group?${params.toString()}`)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json() as GetUsersActivityStatisticResponseDto;
    } catch {
        throw new Error("fail call api");
    }
}
