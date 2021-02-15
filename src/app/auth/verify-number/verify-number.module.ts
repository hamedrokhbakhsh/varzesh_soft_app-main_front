import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyNumberPageRoutingModule } from './verify-number-routing.module';

import { VerifyNumberPage } from './verify-number.page';
import {CountdownModule} from 'ngx-countdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerifyNumberPageRoutingModule,
        ReactiveFormsModule,
        CountdownModule
    ],
  declarations: [VerifyNumberPage]
})
export class VerifyNumberPageModule {}
