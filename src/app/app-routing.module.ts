import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoIssueComponent } from './components/info-issue/info-issue.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'issues', component: HomeComponent},
  { path: 'issues/:id', component: InfoIssueComponent},
  { path: 'create-issue', component: CreateIssueComponent },
  { path: 'update-issues/:id', component: EditIssueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
