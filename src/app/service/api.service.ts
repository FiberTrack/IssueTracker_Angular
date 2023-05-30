import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private authorizationToken: string = '';
  private urlApi = 'https://issuetrackerv1.herokuapp.com/'
  
  constructor(private http: HttpClient) { 
    const storedToken = localStorage.getItem('authorizationToken');
  if (storedToken) {
    this.authorizationToken = storedToken;
  }
  }

  public createIssue(issueData: any): Observable<any> {
    const apiUrl = this.urlApi + 'issues'; // URL de la API para crear un issue
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
      console.log(this.authorizationToken)
    return this.http.post<any>(apiUrl, issueData, { headers }); // Realizar una solicitud POST a la URL de la API con los datos del issue y el encabezado de autorización
  }
  

  public getIssues(): Observable<any[]> {
    const apiUrl = this.urlApi + 'issues'; // URL de la API para obtener todas las issues
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any[]>(apiUrl, { headers }); // Realizar una solicitud GET a la URL de la API
  }

  public getOrderedIssues(direction: string, orderBy: string): Observable<any[]> {
    const apiUrl = this.urlApi + 'issues';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    let params = new HttpParams();
    params = params.set('direction', direction);
    params = params.set('order_by', orderBy);
    return this.http.get<any[]>(apiUrl, { headers, params });
  }

  public getOrderedIssuesBusqueda(direction: string, orderBy: string,busqueda: string ): Observable<any[]> {
    const apiUrl = this.urlApi + 'issues';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    let params = new HttpParams();
    params = params.set('direction', direction);
    params = params.set('order_by', orderBy);
    params = params.set('filtro', busqueda);
    return this.http.get<any[]>(apiUrl, { headers, params });
  }

  public getBusquedaIssue(busqueda: string): Observable<any[]> {
    const apiUrl = this.urlApi + 'issues';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    let params = new HttpParams();
    params = params.set('filtro', busqueda);
    return this.http.get<any[]>(apiUrl, { headers, params });
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

  public getUsuaris(): Observable<any[]> {
    const apiUrl = this.urlApi + 'users';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any[]>(apiUrl, { headers });
  }

  public getUserById(userId: number): Observable<any> {
    const apiUrl = this.urlApi + 'users/' + userId;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }

  public getActivitiesByUserId(userId: number): Observable<any> {
    const apiUrl = this.urlApi + 'users/' + userId + '/activities';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }

  public getWatchedByUserId(userId: number): Observable<any> {
    const apiUrl = this.urlApi + 'users/' + userId + '/watchers';
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<any>(apiUrl, { headers });
  }

  public updateIssue(issueId: number, issueData: any): Observable<any> {
    const apiUrl = this.urlApi + 'issues/' + issueId; // URL de la API para crear un issue
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
    return this.http.put<any>(apiUrl, issueData, { headers }); // Realizar una solicitud POST a la URL de la API con los datos del issue y el encabezado de autorización
  }

  public addAttachment(issueId: number, file: File): Observable<any> {
    const apiUrl = this.urlApi +'issues/' + issueId + '/attachments'; // URL de la API para añadir un archivo adjunto a un issue
    const formData = new FormData();
    formData.append('file', file); // Añadir el archivo al formulario FormData
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
    return this.http.post<any>(apiUrl, formData, { headers }); // Realizar una solicitud POST a la URL de la API con el formulario FormData y el encabezado de autorización
  }

  public deleteAttachment(attachmentId: number): Observable<any> {
    const apiUrl = this.urlApi +'attachments/' + attachmentId; // URL de la API para añadir un archivo adjunto a un issue
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
    return this.http.delete<any>(apiUrl, { headers }); // Realizar una solicitud POST a la URL de la API con el formulario FormData y el encabezado de autorización
  }

  public createMultipleIssues(subjects: string): Observable<any> {
    const apiUrl = this.urlApi + 'issues/create_multiple';
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
    const requestData = {
      subjects: subjects
    };
    return this.http.post<any>(apiUrl, requestData, { headers });
  }

  public BlockUnblockIssue(issueId: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
  
    const url = this.urlApi + 'issues/' + issueId + '/block';
    return this.http.post<any>(url, null, { headers });
  }

  public AddComments(issueId: number, content: String): Observable<any> {
    console.log("Entra en la función")
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', this.authorizationToken);
    const requestData = {
      content: content
    };
    const url = this.urlApi + 'issues/' + issueId + '/comments/new'; 
    return this.http.post<any>(url, requestData, { headers });
  }
  

  public setAuthorizationToken(token: string): void {
    this.authorizationToken = token;
    localStorage.setItem('authorizationToken', token);
  }


}

