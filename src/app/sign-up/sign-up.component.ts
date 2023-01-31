import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
loginForm: any;
googleBtn = 
 "/assets/btn_google_signin_light_normal_web@2x.png"

  constructor(private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null],
      password: [null],
      email: [null]
    });
  }

  signUp() {
    this.authService.SignUp(this.loginForm.value.email, this.loginForm.value.password) 
    console.log(this.loginForm.value.email, this.loginForm.value.password)
  }

}
