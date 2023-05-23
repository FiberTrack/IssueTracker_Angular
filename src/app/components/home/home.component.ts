import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  priorities: string[] = ['Low', 'Normal', 'High'];
  statuses: string[] = ['New', 'In Progress', 'Ready For Test', 'Postponed', 'Closed', 'Information Needed', 'Rejected'];
  assigns: string[] = ['Abel Batalla', 'Abdelrahim Chelh El Azzaoui', 'Arnau Gracia', 'Gabriel Del Valle'];
  filtroValue: string = "";
  showFilters: boolean = false;
  filtroBusqueda: boolean = false;
  filtroFiltros: boolean = false;

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
    else this.apiService.getOrderedIssues(this.direction, orderBy).subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  getBusquedaIssue(busqueda: string) {
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
}


