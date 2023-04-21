import { Injectable } from '@angular/core';
import {Auth,authState,signInWithEmailAndPassword} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {

  currentUser$ = authState(this.Auth); 
  
  constructor(private Auth: Auth) {}
  
  login(username: string, password: string) {
   return from(signInWithEmailAndPassword(this.Auth, username, password)); 
  
  }

 

  logout(){
    return from(this.Auth.signOut());
  }

}
