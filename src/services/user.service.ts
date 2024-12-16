import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from '../model/user.model';
import { Observable } from "rxjs";
import { Token } from "@angular/compiler";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {

    }
    getUsers(token: string) {
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.get('http://localhost:3000/api/users',{headers});
    }
    adduser(user:UserModel,token: string):Observable<any>{
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<UserModel>('http://localhost:3000/api/users',user,{headers})
    }
    editUser(user:UserModel,token:string){
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.put<UserModel>('http://localhost:3000/api/users',user,{headers})
    }

    deleteUser(userId: string,token:string){
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.delete(`http://localhost:3000/api/products/${userId}`,{headers})
    }
    loginUser(username:string ,password:string): Observable<any>{
        return this.http.post('http://localhost:3000/api/auth',{username,password})
    }
}