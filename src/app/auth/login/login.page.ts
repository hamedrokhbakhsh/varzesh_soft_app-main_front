import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastServiceService} from '../../service/toast-service.service';
import {Router} from '@angular/router';
import {AppServiceService} from '../../service/app-service.service';
import {ResponseModel} from '../../models/response-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  isSubmit = false;
  response: ResponseModel ;
  loading = false;
  resend = true;
  constructor(private fb: FormBuilder, private toast: ToastServiceService, private router: Router, private service: AppServiceService) {
    this.form = this.fb.group({
        mobile: ['', [Validators.required]],
    });
  }

  ngOnInit() {
      localStorage.clear();
  }

  submit() {
      this.isSubmit = true ;
      if (this.form.valid){
          this.loading = true;
          this.service.mobileCheck(this.form.value).subscribe(res => {
              this.response = res ;

              if (this.response.status){
                  this.router.navigate(['/verify']).then();
                  this.service.storeMobile(this.form.value.mobile);
                  this.toast.presentToast(this.response.message).then();

                  this.loading = false ;

              }else {
                  this.toast.presentToast(this.response.message).then();
                  this.loading = false ;

              }
          }, err => {
              this.loading = false ;
              console.log(err);
              this.toast.presentToast('عدم ارتباط با سرور').then();

          });
      }
  }
    signup() {
        this.router.navigate(['/signup']).then();
    }
}
