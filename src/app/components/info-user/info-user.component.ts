import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent {

//data
  data: any = {};
  activities: any = {};
  watched: any = {};
  usuariId = 0

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    //GET USER DATA
    this.usuariId = this.route.snapshot.params['usuari_id'];
    console.log(this.usuariId); // Use the parameter as required

    this.getUserById();
    this.getActivitiesByUserId();
    this.getWatchedByUserId();


  }

  getUserById(): void {
    const userId = this.route.snapshot.params['usuari_id'];
    if (userId) {
      this.apiService.getUserById(parseInt(userId)).subscribe(
        user => {
          this.data = user;
          console.log(this.data);
        },  
        error => {
          console.log('Error al obtenir Usuari: ', error);
        }
      );
    }

  }

  getActivitiesByUserId(): void {
    const userId = this.route.snapshot.params['usuari_id'];
    if (userId) {
      this.apiService.getActivitiesByUserId(parseInt(userId)).subscribe(
        activity => {
          this.activities = activity;
          console.log(this.activities);
        },  
        error => {
          console.log('Error al obtenir Usuari: ', error);
        }
      );
    }

  }


  getWatchedByUserId(): void {
    const userId = this.route.snapshot.params['usuari_id'];
    if (userId) {
      this.apiService.getWatchedByUserId(parseInt(userId)).subscribe(
        watch => {
          this.watched = watch;
          console.log(this.watched);
        },  
        error => {
          console.log('Error al obtenir watched de Usuari: ', error);
        }
      );
    }

  }

/*
  getIssueById(): void {
    const issueId = this.route.snapshot.paramMap.get('id');
    if (issueId) {
      this.apiService.getIssueById(parseInt(issueId)).subscribe(
        issue => {
          this.data = issue;
          console.log(this.data);
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
  
      this.usuaris.sort((a, b) => a.id - b.id); // Ordenar los usuarios por su ID
      console.log(this.usuaris);
    });
  }
  */



}
