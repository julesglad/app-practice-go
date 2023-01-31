import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
loginForm: any
  constructor(private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    
  this.loginForm = this.fb.group({
    username: [null],
    password: [null],
    email: [null]
  });
  }

  signIn() {
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
    console.log(this.loginForm.value.email, this.loginForm.value.password)

  }

}
