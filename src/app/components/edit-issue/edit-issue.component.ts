import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



interface IssueData {
  id: number;
  subject: string;
  description: string;
  assign: string | undefined;
  severity: string | undefined;
  priority: string | undefined;
  issue_type: string | undefined;
  status: string | undefined;
  watcher_ids: string[] | undefined;
  created_by: string | undefined;
}

interface Person {
  id: number;
  full_name: string;
  uid: string;
  avatar_url: string;
  provider: string;
  email: string;
  bio: string;
  api_key: string
}

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent {

  issue: IssueData = {
    id: 0,
    subject: '',
    description: '',
    assign: '',
    severity: '',
    priority: '',
    issue_type: '',
    status: '',
    watcher_ids: [],
    created_by: ''
  };
  usuaris: Person[] = [];
  attachments: any[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    //this.createIssue();
    console.log("Inici fins aqui")
    this.getUsuaris()
    this.getIssueById()
    this.getAttachments()
    // Inicializar cualquier otra lógica necesaria al iniciar el componente
  }

  getIssueById(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.getIssueById(parseInt(issueId)).subscribe(
        issue => {
          this.issue = issue;
          console.log(this.issue);
          this.issue.id = parseInt(issueId)
        },
        error => {
          console.log('Error al obtener la issue:', error);
        }
      );
    }
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
      console.log(this.usuaris);
    });
  }

  // Implementar la función para enviar la petición de update del issue
  updateIssue(formValues: IssueData) {
    const issueId = this.route.snapshot.paramMap.get('id');
    console.log("Funciona fins aqui")
    if(issueId){
    this.apiService.updateIssue(parseInt(issueId), formValues).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa de la API
        console.log('Issue updated:', response);
        this.location.go(`/issues/${issueId}`);
        window.location.href = this.location.path();
      },
      (error: any) => {
        // Manejar el error de la API
        console.error('Error al actualizar el issue:', error);
      }
    );
  }
  }



  selectedFile: File | null = null;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadAttachment() {
  if (this.selectedFile) {
    console.log("Aquest es url del file: " + this.selectedFile)
    // Llamada a tu función para enviar el archivo adjunto
    this.apiService.addAttachment(this.issue.id, this.selectedFile).subscribe(
      response => {
        // Procesar la respuesta de éxito si es necesario
        console.log('Attachment uploaded successfully', response);
       // Recargar la página actual
    window.location.reload();
      },
      error => {
        // Procesar el error si es necesario
        console.error('Error uploading attachment', error);
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

deleteAttachment(attachmentId: number){
  if (attachmentId) {
    this.apiService.deleteAttachment(attachmentId).subscribe(
      response => {
        
        console.log("Attachment borrado", response);
       // Recargar la página actual
    window.location.reload();
      },
      error => {
        console.log('Error al borrar el attachment:', error);
      }
    );
  }
}



}
