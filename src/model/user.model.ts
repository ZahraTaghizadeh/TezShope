export class UserModel{
    firstName: string;
    lastName: string;
    role: number;
    phone: string;
    nationalCode: string;
    userName: string;
    password: string;
    constructor(firstName: string,lastName: string,role: number,nationalCode: string,phone: string,userName: string,password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.nationalCode = nationalCode;
        this.phone = phone;
        this.userName = userName;
        this.password = password;
      }

}