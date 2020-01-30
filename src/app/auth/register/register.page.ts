import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentialsForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(1)]],
    });

    // this.credentialsForm.setValue({
    //   displayName: 'TeemaNaja',
    //   email: 'tm@odds.team',
    //   password: '55589',
    //   confirmPassword: '55589',
    // });

    // this.storageService.getCredentialsInfo()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    // this.storageService.emptyCredentialsInfo()
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));

    // this.storageService.setCredentialsInfo({ email: 'tm@odds.team', password: '12345' })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  }

  async hintDisplayName() {
    const alert = await this.alertController.create({
      header: 'Display name',
      message: 'ชื่อที่ท่านกรอก จะนำไปแสดงให้ร้านค้าที่ท่านสั่งอาหาร. ท่านสามารถเปลี่ยนได้ในภายหลัง',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  onClickComplete() {
    const values = this.credentialsForm.value;
    if (values.password !== values.confirmPassword) {
      this.presentToast('Passwords don\'t match.');
      return;
    }

    console.log(values);

    this.authService.signUp(values.email, values.password, values.displayName)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
        this.presentToast('Email have been used.');
      });
  }

}
