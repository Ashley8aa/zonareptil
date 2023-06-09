import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  

  constructor(
    private authService:AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }

  submit(){
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.authService
    .login(email, password)
    .pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error:  `There was an error `,
      })
    )
    .subscribe(() => {
      this.router.navigate(['/home']);
    });
}
}