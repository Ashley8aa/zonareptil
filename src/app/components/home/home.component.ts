//LAST SAVE 15/04/2023 10:59 PM - TEMP/HUMEDAD BOTH GET UPDATED AND DISPLAYED PROPERLY 
//TODO SIRVE, EVEN DA CAROUSEL, YUUUP YUPP
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'zonareptil';

  editForm: FormGroup;
  
  @ViewChild('editModal') editModal: any;





  itemsRef: AngularFireList<any>;
  items$: Observable<any[]>;



/* RANGOS DE TEMP*/   
  tempInObjectRef: AngularFireObject<any>; //OBJECT FOR TEMP IN
  tempFinObjectRef: AngularFireObject<any>; //OBJECT FOR TEMP FIN

/* RANGOS DE HUM*/   
humInObjectRef: AngularFireObject<any>; //OBJECT FOR HUM IN
humFinObjectRef: AngularFireObject<any>; //OBJECT FOR HUM FIN




  public terrario: Observable<any>[];
  public terrario2: Observable<any>[];

/* RANGOS DE TEMP*/   
  data$: Observable<any[]>;
  finalData$: Observable<any[]>;


/* RANGOS DE HUM*/   
  data1$: Observable<any[]>;
  finalData1$: Observable<any[]>;


  user$ = this.authService.currentUser$;

  constructor(
    //private router: Router,
    private fb: FormBuilder,

    private authService: AuthenticationService,
    afDB: AngularFireDatabase,
    affDB: AngularFireDatabase,
    //af3DB: AngularFireDatabase,
    private modalService: NgbModal,

    private db: AngularFireDatabase,
    private db2: AngularFireDatabase



  ) {
    const itemRef: AngularFireList<any> = afDB.list('Humedad');
    itemRef.valueChanges().subscribe((x) => {
      this.terrario = x;
    });

    const item2Ref: AngularFireList<any> = affDB.list('Temperatura');
    item2Ref.valueChanges().subscribe((x) => {
      this.terrario2 = x;
    });





  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      rangoInicialTemp: [''],
      rangoFinalTemp: [''],

     
      rangoInicialHum: [''],
      rangoFinalHum: [''],
    });

/* RANGOS DE TEMP*/   

    this.tempInObjectRef = this.db.object('Rangos');

    this.tempFinObjectRef = this.db.object('Rangos');



/* RANGOS DE HUM*/   
this.humInObjectRef = this.db.object('Rangos');

this.humFinObjectRef = this.db.object('Rangos');



/* RANGOS DE TEMP*/   
    this.data$ = this.tempInObjectRef.valueChanges().pipe(
      map((value: any) => [{ id: '1', ...value }])
    );
 
    this.finalData$ = this.tempFinObjectRef.valueChanges().pipe(
      map((value: any) => [{ id: '1', ...value }])
    );

    
/* RANGOS DE HUM*/   
  this.data1$ = this.humInObjectRef.valueChanges().pipe(
  map((value: any) => [{ id: '1', ...value }])
);

this.finalData1$ = this.humFinObjectRef.valueChanges().pipe(
  map((value: any) => [{ id: '1', ...value }])
);

  
  }





  openEditModal() {
    const modalRef = this.modalService.open(this.editModal);
    modalRef.componentInstance.editForm.patchValue(this.editForm.value);
  }

  updateObject() {
/* RANGOS DE TEMP*/   
    this.tempInObjectRef.update(this.editForm.value);
    this.tempFinObjectRef.update(this.editForm.value);


/* RANGOS DE HUM*/   
    this.humFinObjectRef.update(this.editForm.value);
    this.humInObjectRef.update(this.editForm.value);

  }
}
