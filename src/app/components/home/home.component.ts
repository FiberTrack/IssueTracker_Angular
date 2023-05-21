import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void{
    this.getAllIssues();
  }

  getAllIssues(){
    this.apiService.getIssues().subscribe( data => {
      this.data = data;
      console.log(this.data);
    })
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
    // De momento al clicar no hace nada
  }

}
