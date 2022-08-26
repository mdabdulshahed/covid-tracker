import { SidenavComponent } from './sidenav.component';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    MatSidenavModule,
    MaterialModule,
    MatToolbarModule
  ]
})
export class SidenavModule { }
