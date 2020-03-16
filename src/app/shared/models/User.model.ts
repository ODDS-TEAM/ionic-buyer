export class User {
    uid: string;
    email: string;
    displayName: string;
    imageUrl: string;

    constructor(obj: { uid: string, email: string, displayName: string, token?: string}) {
        this.uid = obj.uid;
        this.email = obj.email;
        this.displayName = obj.displayName;
    }
}
