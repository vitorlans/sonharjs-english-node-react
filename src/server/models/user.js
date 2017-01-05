export default class User{
    constructor(name, credential, passkey) {
        this.name = name;
        this.credential = credential;
        this.passkey = passkey;
        this.toJSON = function() {
            return {
                name: this.name,
                credential: this.credential
            };
        };
    }
}

