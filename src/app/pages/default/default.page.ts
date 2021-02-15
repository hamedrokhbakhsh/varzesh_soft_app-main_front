import { Component, OnInit } from '@angular/core';
import {AppServiceService} from '../../service/app-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {

  mobile = localStorage.getItem('mobile');
  token = localStorage.getItem('token');
  constructor(private service: AppServiceService, private router: Router) { }

  ngOnInit() {
  }

    logout() {
        this.service.logout();
        this.router.navigate(['/login']).then();
    }
}
