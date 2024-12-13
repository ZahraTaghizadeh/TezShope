import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from '../model/user.model';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {

    }
    getUsers() {
        return this.http.get('http://localhost:3000/api/users');
    }
    getUser(nationalCode:string):Observable<any>{
        return this.http.get('http://localhost:3000/api/user/'+nationalCode);
    }
    adduser(user:UserModel):Observable<any>{
        return this.http.post<UserModel>('http://localhost:3000/api/user/add',user)
    }
    editUser(user:UserModel){
        return this.http.put<UserModel>('http://localhost:3000/api/user/edit',user)
    }
}