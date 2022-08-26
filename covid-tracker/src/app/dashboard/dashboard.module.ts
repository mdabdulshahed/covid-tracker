import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesMapModule } from 'countries-map';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WorldMapComponent } from './world-map/world-map.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MaterialModule } from '../material.module';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [WorldMapComponent, StatisticsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CountriesMapModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class DashboardModule { }
