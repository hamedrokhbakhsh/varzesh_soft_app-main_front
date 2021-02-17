import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppServiceService} from '../../service/app-service.service';
import {ResponseModel} from '../../models/response-model';
import {ToastServiceService} from '../../service/toast-service.service';

@Component({
  selector: 'app-verify-number',
  templateUrl: './verify-number.page.html',
  styleUrls: ['./verify-number.page.scss'],
})
export class VerifyNumberPage implements OnInit {
  timeData = "90";
  config:any;
  form: FormGroup;
  isSubmit = false;
  response: ResponseModel;
  loading = false;
  data = {
    mobile: localStorage.getItem('mobile')
  };
 timer = true;
  constructor(private fb: FormBuilder, private router: Router, private service: AppServiceService, private toast: ToastServiceService) {
    this.form = this.fb.group({
      token: ['', [Validators.required]],
      mobile: [localStorage.getItem('mobile')],
    });
    this.config = {leftTime: this.timeData, demand:true, format: `mm:ss`};

  }
  ngOnInit() {
  }
  confirm() {
    this.isSubmit = true;

    if (this.form.valid){
      this.loading = true ;
      this.service.verifyUser(this.form.value).subscribe(res => {
        this.response = res ;
        if (this.response.status){
          this.router.navigate(['/home']).then();
          this.service.storeToken(this.response.data);
          this.loading= false;
        }else {
          this.toast.presentToast(this.response.message).then();
          this.loading= false;

        }
      }, err => {
        console.log(err);
        this.toast.presentToast('عدم ارتباط با سرور').then();
        this.loading= false;

      });
    }
  }

    resend() {
      if (this.timer){
        this.timer = false;
        this.config = {leftTime:this.timeData, demand:false};
        this.service.mobileCheck(this.form.value).subscribe(res => {
          this.response = res ;
          if (this.response.status){
            this.toast.presentToast(this.response.message).then();
          }else {
            this.toast.presentToast(this.response.message).then();
          }
        }, err => {
          console.log(err);
          this.toast.presentToast('عدم ارتباط با سرور').then();
        });
      }
  }

  onEvent($event): void {
    if($event.left === 0){
      this.timer= !this.timer;
    }
  }
}
