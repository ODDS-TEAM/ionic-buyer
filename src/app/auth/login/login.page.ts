import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MailCredentials } from 'src/app/shared/models/MailCredentials.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  async reLogin() {
    this.authService.relogin();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  onClickLogin() {
    const values = this.credentialsForm.value;

    const router = this.router;
    this.authService.login(new MailCredentials({ email: values.email, password: values.password }))
      .then(res => router.navigate(['/main/home']))
      .catch(err => {
        console.log(err);
        this.presentToast('Email and password doesn\'t match or exist.');
      });
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }

}
