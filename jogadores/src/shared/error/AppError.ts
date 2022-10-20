export default class AppError{
    private readonly message:string
    private readonly code:number

    constructor(message:string,code = 400){
        this.message = message
        this.code = code
    }
}