import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private urlApi = 'https://issuetrackerv1.herokuapp.com/'
  
  constructor(private http: HttpClient) { }

  public createIssue(issueData: any): Observable<any> {
    const apiUrl = this.urlApi + 'issues'; // URL de la API para crear un issue
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'c019a94d-2c6d-46b9-ba10-f58cc0b1c969');
    return this.http.post<any>(apiUrl, issueData, { headers }); // Realizar una solicitud POST a la URL de la API con los datos del issue y el encabezado de autorización
  }
  

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

  public getCommentsById(issueId: number): Observable<any> {
    const apiUrl = this.urlApi + 'issues/' + issueId + '/comments';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }

  public getActivitiesById(issueId: number): Observable<any> {
    const apiUrl = this.urlApi + 'issues/' + issueId + '/activities';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }

  public getAttachmentsById(issueId: number): Observable<any> {
    const apiUrl = this.urlApi + 'issues/' + issueId + '/attachments';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }


}

