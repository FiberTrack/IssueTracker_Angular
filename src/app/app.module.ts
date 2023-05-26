import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { InfoIssueComponent } from './components/info-issue/info-issue.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { BulkInsertComponent } from './components/bulk-insert/bulk-insert.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoIssueComponent,
    CreateIssueComponent,
    EditIssueComponent,
    BulkInsertComponent,
    InfoUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
