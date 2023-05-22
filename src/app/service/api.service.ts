import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private urlApi = 'https://issuetrackerv1.herokuapp.com/'
  
  constructor(private http: HttpClient) { }

  public getIssues(): Observable<any[]> {
    const apiUrl = this.urlApi + 'issues'; // URL de la API para obtener todas las issues
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any[]>(apiUrl, { headers }); // Realizar una solicitud GET a la URL de la API
  }

  public getIssueById(issueId: number): Observable<any> {
    const apiUrl = this.urlApi + 'issues/' + issueId;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }
}

