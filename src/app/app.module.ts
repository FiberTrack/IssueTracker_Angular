import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { InfoIssueComponent } from './components/info-issue/info-issue.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoIssueComponent,
    CreateIssueComponent
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
