import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppServiceService} from '../../service/app-service.service';
import {ResponseModel} from '../../models/response-model';
import {ToastServiceService} from '../../service/toast-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form: FormGroup;
  isSubmit = false;
  response: ResponseModel ;
  loading = false ;
  constructor(private fb: FormBuilder, private router: Router, private service: AppServiceService, private toast: ToastServiceService) {
    this.form = this.fb.group({
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      name: ['', [Validators.required]],
      family: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    localStorage.clear();
  }
  confirm(){

    this.isSubmit = true ;
    if (this.form.valid){
      this.loading = true ;
      this.service.registerUser(this.form.value).subscribe(res => {
        this.response = res ;
        console.log(this.response.status);
        if (this.response.status){
          this.router.navigate(['/verify']).then();
          this.service.storeMobile(this.form.value.mobile);
          this.toast.presentToast(this.response.message).then();
          this.loading = false;
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


  login() {
    this.router.navigate(['/login']).then();
  }
}
