export class LoginStatus {

    success: boolean;
    errorMessage: string;
    token: string;

    constructor(loginSuceess: boolean = true, loginErrorMessage: string = '', token:string = '') {
        this.success = loginSuceess;
        this.errorMessage = loginErrorMessage;
        this.token = token;
    }
}