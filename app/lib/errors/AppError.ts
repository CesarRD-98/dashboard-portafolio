export type AppErrorType = 'error' | 'warning' | 'info';

export class AppError extends Error {
    public readonly type: AppErrorType;

    constructor(type: AppErrorType, message: string) {
        super(message);
        this.type = type;
        this.name = 'AppError';
    }
}