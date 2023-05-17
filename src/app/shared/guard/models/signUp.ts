export class SignUp {
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    private profileImg: string;

    constructor(firstName: string, lastName:string, email:string, password:string,profileImg:string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password =password;
        this.profileImg = profileImg;
    }
}