import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

//data
data: any = {};
issue: any = {};
activities: any[] = [];
watched: any[] = [];
usuariId = 0
name_issues_activities: any[][] = [];
name_issues_watched: any[][] = [];

constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }

ngOnInit(): void {
  //GET USER DATA
  this.usuariId = this.route.snapshot.params['usuari_id'];
  console.log(this.usuariId); // Use the parameter as required

  this.getUserById();
  this.getActivitiesByUserId();
  this.getWatchedByUserId();
}

getUserById(): void {
  const userId = this.route.snapshot.params['usuari_id'];
  if (userId) {
    this.apiService.getUserById(parseInt(userId)).subscribe(
      user => {
        this.data = user;
        console.log(this.data);
      },  
      error => {
        console.log('Error al obtenir Usuari: ', error);
      }
    );
  }

}

getSubjectIssues(id_issue: number): void {
      this.apiService.getIssueById(id_issue).subscribe(
        issue => {
          this.name_issues_activities.push([id_issue,issue.subject]);
        },
        error => {
          console.log('Error al obtener la issue:', error);
        }
      );
  console.log(this.name_issues_activities);
}

getSubjectIssues2(id_issue: number): void {
  this.apiService.getIssueById(id_issue).subscribe(
    issue => {
      this.name_issues_watched.push([id_issue,issue.subject]);
    },
    error => {
      console.log('Error al obtener la issue:', error);
    }
  );
console.log(this.name_issues_watched);
}

getActivitiesByUserId(): void {
  const userId = this.route.snapshot.params['usuari_id'];
  if (userId) {
    this.apiService.getActivitiesByUserId(parseInt(userId)).subscribe(
      activity => {
        this.activities = activity;
        console.log(this.activities);

        for (const activity of this.activities) {
          this.getSubjectIssues(activity.issue_id);
        }

      },  
      error => {
        console.log('Error al obtenir Usuari: ', error);
      }
    );
  }
}


getWatchedByUserId(): void {
  const userId = this.route.snapshot.params['usuari_id'];
  if (userId) {
    this.apiService.getWatchedByUserId(parseInt(userId)).subscribe(
      watch => {
        this.watched = watch;
        console.log(this.watched);

        for (const watch of this.watched) {
          this.getSubjectIssues2(watch.issue_id);
        }

      },  
      error => {
        console.log('Error al obtenir watched de Usuari: ', error);
      }
    );
  }
}

getSubjectActivity(id: number): string | undefined {
  const matchingItem = this.name_issues_activities.find(item => item[0] === id);
  if (matchingItem) {
    return matchingItem[1];
  }
  return undefined;
}

getSubjectWatcher(id: number): string | undefined {
  const matchingItem = this.name_issues_watched.find(item => item[0] === id);
  if (matchingItem) {
    return matchingItem[1];
  }
  return undefined;
}

}
