import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoIssueComponent } from './components/info-issue/info-issue.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'issues', component: HomeComponent},
  { path: 'issues/:id', component: InfoIssueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
