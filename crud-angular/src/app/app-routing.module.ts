import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HometableComponent } from './hometable/hometable.component';

const routes: Routes = [
  {path: 'app-hometable', component: HometableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
