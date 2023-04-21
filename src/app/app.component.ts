import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   title = 'zonareptil'; 


  
  public terrario: Observable<any>[]; 

  constructor(public authService: AuthenticationService, private router: Router, afDB:AngularFireDatabase){
    const itemsRef: AngularFireList<any> = afDB.list('Terrario')
    itemsRef.valueChanges().subscribe(
      x => { this.terrario = x;}
    )

   


  }
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']); 

    });
  }
  
}


