import { Component, OnInit } from '@angular/core';
import {AppServiceService} from '../../service/app-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {


  constructor(private service: AppServiceService, private router: Router) { }




  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

    logout() {
        this.service.logout();
        this.router.navigate(['/login']).then();
    }
}
