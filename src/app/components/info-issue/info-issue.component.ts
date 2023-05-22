import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-issue',
  templateUrl: './info-issue.component.html',
  styleUrls: ['./info-issue.component.css']
})
export class InfoIssueComponent {

  data: any = {};
  comments: any;
  activities: any;
  attachments: any[] = [];

  today: Date = new Date();
  deadlineDate: string = "";

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getIssueById();
    this.getComments();
    this.getActivities();
    this.getAttachments();
  }

  getIssueById(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.getIssueById(parseInt(issueId)).subscribe(
        issue => {
          this.data = issue;
          console.log(this.data);
        },
        error => {
          console.log('Error al obtener la issue:', error);
        }
      );
    }
  }

  getComments(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.getCommentsById(parseInt(issueId)).subscribe(
        comment => {
          this.comments = comment;
          console.log(this.comments);
        },
        error => {
          console.log('Error al obtener la issue:', error);
        }
      );
    }
  }

  getActivities(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.getActivitiesById(parseInt(issueId)).subscribe(
        acitivity => {
          this.activities = acitivity;
          console.log(this.activities);
        },
        error => {
          console.log('Error al obtener la issue:', error);
        }
      );
    }
  }

  getAttachments(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.getAttachmentsById(parseInt(issueId)).subscribe(
        attachment => {
          this.attachments = attachment;
          console.log(this.attachments);
        },
        error => {
          console.log('Error al obtener la issue:', error);
        }
      );
    }
  }

  getAttachmentsLength(): number {
    return this.attachments.length;
  }

  getColorType(type: string): string {
    switch (type) {
      case 'Bug':
        return 'red';
      case 'Question':
        return 'blue';
      case 'Enhancement':
        return 'green';
      default:
        return 'black';
    }
  }

  getColorSeverity(severity: string): string {
    switch (severity) {
      case 'Critical':
        return 'red';
      case 'Minor':
        return 'blue';
      case 'Normal':
        return 'green';
      case 'Important':
        return 'orange';
      case 'Wishlist':
          return 'grey';
      default:
        return 'black';
    }
  }

  getColorPriority(priority: string): string {
    switch (priority) {
      case 'Low':
        return 'green';
      case 'Normal':
        return 'yellow';
      case 'High':
          return 'orange';
      default:
        return 'black';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'Bug':
      case 'Critical':
        return 'red';
      case 'Question':
      case 'Minor':
        return 'blue';
      case 'Enhancement':
      case 'Normal':
      case 'Low':
        return 'green';
      case 'Important':
        return 'orange';
      case 'Wishlist':
          return 'grey';
      default:
        return 'black';
    }
  }  

  goBack(): void {
    this.location.go('/issues');
    window.location.href = this.location.path();
  }

  goToEdit(): void {
  }

  deleteIssue(): void {
  }

  toggleBlocked(): void {
  }

  addDeadline(): void {
  }

  deleteDeadline(): void {
  }

  addComment(): void{
  }

  newComment(): void{
  }

}

