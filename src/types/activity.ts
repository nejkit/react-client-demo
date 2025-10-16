export interface SaveActivityRequestDto {
    userId: string
    action: string
    metadata?: Record<string, unknown>
}

export interface UserActivityEventDto {
    actionDate: string;
    action: string;
    metadata: Record<string, unknown>;
}

export interface GetUserActivityResponseDto {
    activities: UserActivityEventDto[];
}

export interface GetUsersActivityResponseDto {
    userActivities: Record<string, UserActivityEventDto[]>;
}

export interface UserActivityStatisticDto {
    fromDate: string;
    toDate: string;
    actionsCount: number;
}

export interface GetUserActivityStatisticResponseDto {
    statistics: UserActivityStatisticDto[];
}

export interface GetUsersActivityStatisticResponseDto {
    userActivities: Record<string, UserActivityStatisticDto[]>;
}
