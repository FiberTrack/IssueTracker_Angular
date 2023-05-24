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
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  issue: IssueData = {
    subject: '',
    description: '',
    assign: 'Not Assigned',
    severity: 'Wishlist',
    priority: 'Low',
    issue_type: 'Bug',
    status: 'New',
    watcher_ids: [],
    created_by: ''
  };
  usuaris: Person[] = [];

  constructor(private apiService: ApiService, private location: Location) { }


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


  ngOnInit() {
    //this.createIssue();
    console.log("Inici fins aqui")
    this.getUsuaris()
    // Inicializar cualquier otra lógica necesaria al iniciar el componente
  }

  // Implementar la función para enviar la petición de creación del issue
  createIssue(formValues: IssueData) {
    console.log("Funciona fins aqui")
    this.apiService.createIssue(formValues).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa de la API
        console.log('Issue creado:', response);
        this.location.go('/issues');
        window.location.href = this.location.path();
      },
      (error: any) => {
        // Manejar el error de la API
        console.error('Error al crear el issue:', error);
      }
    );
  }


}
