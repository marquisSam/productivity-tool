import { TimelineComponent } from './view/timeline/timeline.component';
import { IntroComponent } from './view/intro/intro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: IntroComponent,
  },
  {
      path: 'timeline',
      component: TimelineComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
