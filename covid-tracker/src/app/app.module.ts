import { SidenavModule } from './sidenav/sidenav.module';
import { MaterialModule } from './material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountriesMapModule } from 'countries-map';
import { CovidApiService } from './shared/covid-api.service';
import { HttpClientModule } from '@angular/common/http';
import { InterceptorsProvider } from './interceptor.provider';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MaterialModule,
    MatToolbarModule,
    SidenavModule,
    CountriesMapModule,
    
  ],
  providers: [CovidApiService, InterceptorsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
