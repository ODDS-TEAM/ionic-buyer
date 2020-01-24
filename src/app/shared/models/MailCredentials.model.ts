export class MailCredentials {

    email: string;
    password: string;

    constructor(obj: {email: string, password: string}) {
        this.email = obj.email;
        this.password = obj.password;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }
}
