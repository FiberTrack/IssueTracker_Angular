import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {


//DATA
  bio: string = "";
  full_name: string = "";
  avatar_url: File | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {

  }


  updateProfile(userForm: NgForm) {
    // Handle the form submission and update the profile
    // You can make an API call to update the profile information
    
    const formData = new FormData();
    
    console.log("User Data: " + userForm)
    console.log("nom nou: " + this.full_name)
    console.log("bio_nova: " + this.bio)
    console.log("avatar_url: " + this.avatar_url)

    if (userForm.value.full_name != "") {
      console.log("Actualitzant full_name")
      formData.append('full_name', userForm.value.full_name);
    }

    if (userForm.value.bio != "") {
      console.log("Actualitzant bio")
      formData.append('bio', userForm.value.bio);
    }

    if (this.avatar_url) {
      console.log("Aquest es el avatar_url: " + this.avatar_url)
      formData.append('avatar_url', this.avatar_url);
    }

    console.log("Form Data2: " + formData)
//CAL FER COSES AMB el AWS
//CAL NO CANVIAR EL PARAMETRES UNDEFINED

    this.apiService.updateUser(formData).subscribe(
      (response: any) => {
        // Manejar la respuesta exitosa de la API
        console.log('User updated: ', response);
        this.location.go(`/users/${response.id}`);
        window.location.href = this.location.path();
      },
      (error: any) => {
        // Manejar el error de la API
        console.error('Error al actualizar el usuari:', error);
      }
    );
  }


  onFileSelected(event: any) {
    this.avatar_url = event.target.files[0];
  }






}
