import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from './customer-material.module';
import {AuthGuard} from '../guards/auth.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
  ]
})
export class SharedModule {
}
