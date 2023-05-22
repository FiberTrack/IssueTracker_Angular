import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
    this.createIssue();
    // Inicializar cualquier otra lógica necesaria al iniciar el componente
  }

  // Implementar la función para enviar la petición de creación del issue
  createIssue() {
    this.apiService.createIssue(issue).subscribe(
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
