import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-bulk-insert',
  templateUrl: './bulk-insert.component.html',
  styleUrls: ['./bulk-insert.component.css']
})
export class BulkInsertComponent {

  constructor(private apiService: ApiService, private location: Location) { }

  // Implementar la función para enviar la petición de creación del issue
  bulkInsert() {
    const subjectsTextarea = document.getElementById('subjects') as HTMLTextAreaElement;
    const subjects = subjectsTextarea.value;
    console.log("Funciona fins aqui")
    this.apiService.createMultipleIssues(subjects).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa de la API
        console.log('Issues created:', response);
        this.location.go('/issues');
        window.location.href = this.location.path();
      },
      (error: any) => {
        // Manejar el error de la API
        console.error('Error al crear los issues:', error);
      }
    );
  }


}
