import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IssueData {
  subject: string;
  description: string;
  assign: string;
  severity: string;
  priority: string;
  issue_type: string;
  status: string;
  watcher_ids: string[];
}

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  issue: IssueData = {
    subject: 'prova Angular',
    description: '',
    assign: '',
    severity: '',
    priority: '',
    issue_type: '',
    status: '',
    watcher_ids: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Inicializar cualquier otra lógica necesaria al iniciar el componente
  }

  // Implementar la función para enviar la petición de creación del issue
  createIssue() {
    const apiUrl = 'URL_DE_LA_API'; // Reemplazar con la URL de la API para crear el issue
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(apiUrl, this.issue, { headers }).subscribe(
      (response) => {
        // Manejar la respuesta exitosa de la API
        console.log('Issue creado:', response);
      },
      (error) => {
        // Manejar el error de la API
        console.error('Error al crear el issue:', error);
      }
    );
  }


}
