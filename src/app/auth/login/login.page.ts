import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(0)]],
      password: ['', [Validators.required, Validators.minLength(0)]]
    });
  }

  onClickLogin() {
    this.router.navigate(['/main/home'], { replaceUrl: true });
  }

  onClickRegister() {
    alert('create an account');
  }

}
