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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.createIssue();
    // Inicializar cualquier otra lógica necesaria al iniciar el componente
  }

  // Implementar la función para enviar la petición de creación del issue
  createIssue() {
    console.log("Funciona fins aqui")
    this.apiService.createIssue(this.issue).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa de la API
        console.log('Issue creado:', response);
      },
      (error: any) => {
        // Manejar el error de la API
        console.error('Error al crear el issue:', error);
      }
    );
  }


}
