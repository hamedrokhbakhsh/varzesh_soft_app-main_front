import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private toastController: ToastController) {}
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      cssClass: 'secondary'
    });
    toast.present().then();
  }

}
