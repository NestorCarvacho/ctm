import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  
  private apiUrl: string = 'https://necarvacho.pythonanywhere.com/';

  constructor(private http: HttpClient) {}

  createVehiculo(vehiculoData: any) {
    return this.http.post<any>('https://necarvacho.pythonanywhere.com/api/vehiculo/', vehiculoData);
  }

  getVehiculos(): Observable<any> {
    return this.http.get<any>('https://necarvacho.pythonanywhere.com/api/vehiculo/');
  }
  
  createUser(userData: any){
    return this.http.post<any>('https://necarvacho.pythonanywhere.com/api/usuario/',userData);
  }

  createConductor(conductorData: any){
    return this.http.post<any>('https://necarvacho.pythonanywhere.com/api/conductor/',conductorData);
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
    .set('username', username)
    .set('password', password);

    return this.http.post<any>(`${this.apiUrl}api/login/`, body.toString(), { headers });
    
  }

  getUserById(userId: number) {
    const url = `${this.apiUrl}api/usuario/${userId}/`;
    return this.http.get(url);
  }

  getConductorById(conductorId: number) {
    const url = `${this.apiUrl}api/conductor/${conductorId}/`;
    return this.http.get(url);
  }

  getVehiculoById(conductorId: number){
    const url = `${this.apiUrl}api/vehiculos/usuario/${conductorId}/`;
    return this.http.get(url);
  }

  getViajes(): Observable<any> {
    return this.http.get<any>('https://necarvacho.pythonanywhere.com/api/viaje/');
  }

  private apiUrl2: string  = 'https://necarvacho.pythonanywhere.com/api/conductor/';
  actualizarNombre(conductorId: number, nuevoNombre: string): Observable<any> {
    const url = `${this.apiUrl2}${conductorId}/`;
    const data = { nombre_completo: nuevoNombre };

    return this.http.patch(url, data);
  }

  actualizarNumero(conductorId: number, nuevoNumero: number): Observable<any> {
    const url = `${this.apiUrl2}${conductorId}/`;
    const data = { numero_telefono: nuevoNumero };

    return this.http.patch(url, data);
  }

}
