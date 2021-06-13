import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONT }   from './app.constant'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient) { }

  login(dt):any {
    return new Promise((resolve, reject)=>{
       this.http.post(APP_CONT.login,dt)
           .subscribe(
             (data) => {
               resolve(data);
             },
             (error) => {
               reject(error);
             }
           )
    })
  }
}
