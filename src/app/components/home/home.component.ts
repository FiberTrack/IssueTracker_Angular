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
  api_key: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  data: any;
  direction: string = 'asc';
  severities: string[] = ['Wishlist', 'Minor', 'Normal', 'Important', 'Critical'];
  types: string[] = ['Bug', 'Question', 'Enhancement'];
  priorities: string[] = ['Low', 'Normal ', 'High'];
  statuses: string[] = ['New', 'In Progress', 'Ready For Test', 'Postponed', 'Closed', 'Information Needed', 'Rejected'];
  assigns: string[] = [];
  filtroValue: string = "";
  showFilters: boolean = false;
  filtroBusqueda: boolean = false;
  filtroFiltros: boolean = false;
  usuaris: Person[] = [];
  usuari_actual = 0;
  selectedOptions: any = {
    severities: [],
    types: [],
    priorities: [],
    statuses: [],
    assigns: []
  };

  constructor(private apiService: ApiService, private location: Location) { }


  ngOnInit(): void {
    this.getAllIssues();
    document.addEventListener('DOMContentLoaded', () => {
      const buscarButton = document.getElementById('buscarButton');
      if (buscarButton) {
        buscarButton.addEventListener('click', this.buscar.bind(this));
      }
    });
    this.filtroBusqueda = false;
    this.filtroFiltros = false;
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

      for (let i = 0; i < this.usuaris.length; i++) {
        const nom_usuario = this.usuaris[i].full_name;
        this.assigns.push(nom_usuario)
      }
    });
  }

  getAllIssues() {
    this.apiService.getIssues().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  getOrderedIssues(orderBy: string) {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    if (this.filtroBusqueda) {
      const filtroValue = (document.querySelector('.busqueda') as HTMLInputElement).value;
      this.apiService.getOrderedIssuesBusqueda(this.direction, orderBy, filtroValue).subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
    }
    else if(this.filtroFiltros) {
      this.apiService.getOrderedFilteredIssues(this.direction, orderBy, this.selectedOptions).subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
    }
    else this.apiService.getOrderedIssues(this.direction, orderBy).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  getBusquedaIssue(busqueda: string) {
    this.filtroFiltros = false;
    this.filtroBusqueda = true;
    this.apiService.getBusquedaIssue(busqueda).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  buscar() {
    const filtroValue = (document.querySelector('.busqueda') as HTMLInputElement).value;
    this.getBusquedaIssue(filtroValue);
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

  onCardClick(item: any) {
    const issueId = item.id;
    this.location.go(`/issues/${issueId}`);
    window.location.href = this.location.path();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onUserChange(event: any) {
    this.usuari_actual = event?.target?.value - 1;
    var authorizationToken = this.usuaris[this.usuari_actual].api_key;
    console.log(authorizationToken);
    this.apiService.setAuthorizationToken(authorizationToken);
  }

  applyFilters() {
    
    this.filtroBusqueda = false;
    this.filtroFiltros = true;

    this.apiService.getFilteredIssues(this.selectedOptions).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });

  }


  toggleSeverity(tipo: string) {
    let tipo2: string;
    tipo2 = "";
    if (tipo == 'Wishlist' || tipo == 'Minor' || tipo == 'Normal'  || tipo ==  'Important' || tipo == 'Critical') tipo2 = 'severities';
    if (tipo == 'Bug' || tipo == 'Question' || tipo == 'Enhancement') tipo2 = 'types';
    if (tipo == 'Low' || tipo == 'Normal ' || tipo == 'High') {
      tipo2 = 'priorities';
      tipo = 'Normal'
    }
    if (tipo == 'New' || tipo == 'In Progress' || tipo == 'Ready For Test' || tipo == 'Postponed' || tipo == 'Closed' || tipo == 'Information Needed' || tipo == 'Rejected') tipo2 = 'statuses';
    if (this.assigns.includes(tipo)) tipo2 = 'assigns';
    const index = this.selectedOptions[tipo2].indexOf(tipo);
  
    if (index === -1) {
      // El valor no está en el array, lo agregamos
      this.selectedOptions[tipo2].push(tipo);
    } else {
      // El valor ya está en el array, lo eliminamos
      this.selectedOptions[tipo2].splice(index, 1);
    }
  }

}


