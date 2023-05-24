import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


interface IssueData {
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

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  issue: IssueData = {
    subject: '',
    description: '',
    assign: '',
    severity: 'Wishlist',
    priority: 'Low',
    issue_type: 'Bug',
    status: 'New',
    watcher_ids: [],
    created_by: 'Arnau Gracia'
  };


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    //this.createIssue();
    console.log("Inici fins aqui")
    // Inicializar cualquier otra lógica necesaria al iniciar el componente
  }

  // Implementar la función para enviar la petición de creación del issue
  createIssue(formValues: IssueData) {
    console.log("Funciona fins aqui")
    this.apiService.createIssue(formValues).subscribe(
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
