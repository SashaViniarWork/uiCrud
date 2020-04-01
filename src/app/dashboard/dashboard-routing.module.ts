import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {CreateComponent} from './component/create/create.component';
import {UpdateComponent} from './component/update/update.component';
import {AuthGuard} from '../guards/auth.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'list'},
  {path: 'list', component: MainComponent, canActivate: [AuthGuard] },
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  {path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
