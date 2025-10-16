export interface SaveActivityRequestDto {
    userId: string
    action: string
    metadata?: Record<string, unknown>
}

