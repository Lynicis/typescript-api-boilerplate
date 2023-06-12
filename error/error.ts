interface ICustomError {
    get Message(): string;
    get Code(): number;
}

class CustomError implements ICustomError {
    private readonly _code: number;
    private readonly _message: string;

    constructor(code: number, message: string) {
        this._code = code;
        this._message = message;
    }

    get Message(): string {
        return this._message;
    }

    get Code(): number {
        return this._code;
    }
}

export { ICustomError, CustomError };
