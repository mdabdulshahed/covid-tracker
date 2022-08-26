import { StatisticsComponent } from './statistics/statistics.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WorldMapComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
