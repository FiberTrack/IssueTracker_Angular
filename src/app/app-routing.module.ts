import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoIssueComponent } from './components/info-issue/info-issue.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { BulkInsertComponent } from './components/bulk-insert/bulk-insert.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'issues', component: HomeComponent},
  { path: 'issues/:id', component: InfoIssueComponent},
  { path: 'create-issue', component: CreateIssueComponent },
  { path: 'update-issues/:id', component: EditIssueComponent },
  { path: 'bulk-insert', component: BulkInsertComponent },
  { path: 'users/:usuari_id', component: InfoUserComponent },
  { path: 'user', component: EditUserComponent },
  { path: 'info/:usuari_id', component: ViewUserComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
