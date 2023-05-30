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
  bio: string | undefined;
  avatarFile: File | undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {

  }


  updateProfile(userForm: NgForm) {
    // Handle the form submission and update the profile
    // You can make an API call to update the profile information
    
    const formData = new FormData();
    formData.append('bio', userForm.value.bio);
    

    console.log("User Data: " + userForm)
    console.log("bio: " + this.bio)
    console.log("avatarFile: " + this.avatarFile)

    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile);
    }

    if (!this.bio) {
      console.log("bio: " + this.bio)
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


  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedFile = target.files[0];
    }
  }




}