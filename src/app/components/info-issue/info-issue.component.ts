import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Person {
  id: number;
  full_name: string;
  uid: string;
  avatar_url: string;
  provider: string;
  email: string;
  bio: string;
  api_key: string;
}


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
  info_user: any;
  usuaris: Person[] = [];
  today: Date = new Date();
  deadlineDate: string = "";

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getIssueById();
    this.getComments();
    this.getActivities();
    this.getAttachments();
    this.getUsuaris();
  }

  getUsuaris(){
    this.apiService.getUsuaris().subscribe(usuaris => {
      this.usuaris = usuaris;
  
      // Verificar si todos los usuarios tienen la propiedad 'id'
      const usuariosConID = this.usuaris.every(user => user.hasOwnProperty('id'));
      if (!usuariosConID) {
        console.error('Algunos usuarios no tienen la propiedad "id".');
        return;
      }
  
      this.usuaris.sort((a, b) => a.id - b.id); // Ordenar los usuarios por su ID
      console.log(this.usuaris);
    });
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

  getUserAvatarUrl(userId: number): string {
    const user = this.usuaris.find(user => user.id === userId);
    return user?.avatar_url || '';
  }

  getFullName(userId: number): string {
    const user = this.usuaris.find((user: Person) => user.id === userId);
    return user ? user.full_name : '';
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
    const issueId = this.route.snapshot.paramMap.get('id');
    this.location.go(`/update-issues/${issueId}`);
    window.location.href = this.location.path();
  }

  deleteIssue(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.deleteIssueById(parseInt(issueId)).subscribe(
        issue => {
          this.data = issue;
          console.log(this.data);
          this.goBack()
        },
        error => {
          console.log('Error al eliminar la issue:', error);
        }
      );
    }
  }

  toggleBlocked(): void {
    this.apiService.BlockUnblockIssue(this.data.id).subscribe(
      () => {
        console.log(this.data.blocked);
        this.data.blocked = !this.data.blocked; // Actualiza el estado de bloqueo/desbloqueo en los datos de la issue
        console.log(this.data.blocked);

      },
      (error: any) => {
        console.log(this.data.blocked);

        console.error(error);
      }
    );
  }

  addDeadline(): void {
    console.log("Fecha deadline " + this.deadlineDate);
    this.apiService.addDeleteDeadline(this.data.id, this.deadlineDate).subscribe(
      () => {
         console.log("Fecha deadline: " + this.deadlineDate + " añadida");
         this.data.deadline = this.deadlineDate
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteDeadline(): void {
    console.log("Eliminando deadline ");
    this.apiService.addDeleteDeadline(this.data.id, "").subscribe(
      () => {
        console.log("Fecha deadline eliminada correctamente ");
        this.data.deadline = ""
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addComment(){
    
    const content = (document.getElementById('content') as HTMLTextAreaElement).value;
    this.apiService.AddComments(this.data.id, content).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa de la API
        this.comments.push(response)
        console.log(response);
        (document.getElementById('content') as HTMLTextAreaElement).value = '';
      },
      (error: any) => {
        // Manejar el error de la API
        console.error(error);
      }
    );
  }

  newComment(): void{
  }

}

