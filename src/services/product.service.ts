import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductModel } from "../model/product.model";

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) {

    }
    getProducts(token: string) {
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.get('http://localhost:3000/api/products',{headers});
    }
    addProduct(product:ProductModel,token: string):Observable<any>{
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<ProductModel>('http://localhost:3000/api/products',product,{headers})
    }
    editProduct(product:ProductModel,token:string){
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.put<ProductModel>('http://localhost:3000/api/products',product,{headers})
    }
    deleteProduct(procutId: string,token:string){
        const headers = new HttpHeaders({
            'Authorization' : `${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.delete(`http://localhost:3000/api/products/${procutId}`,{headers})
    }
}