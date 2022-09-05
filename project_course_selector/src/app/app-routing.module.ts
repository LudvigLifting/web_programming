import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LthComponent } from './lth/lth.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseChoiceComponent } from './course-choice/course-choice.component';
import { ResultDisplayComponent } from './result-display/result-display.component';

const routes: Routes = [
  { path: 'courses', component: LthComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'courseDetailComponent/:kod', component: CourseDetailComponent },
  { path: 'choice', component: CourseChoiceComponent },
  { path: 'display-results', component: ResultDisplayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
