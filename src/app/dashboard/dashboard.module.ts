import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './component/main/main.component';
import {CreateComponent} from './component/create/create.component';
import {SharedModule} from '../shared/shared.module';
import {CrudService} from './services/crud.service';
import { UpdateComponent } from './component/update/update.component';
import {AuthGuard} from '../guards/auth.guard';
import {AuthService} from '../auth/services/auth.service';


@NgModule({
  declarations: [MainComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [CrudService, AuthGuard, AuthService]
})
export class DashboardModule {
}
