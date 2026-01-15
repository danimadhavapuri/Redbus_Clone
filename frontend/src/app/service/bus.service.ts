import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../config';
import { Booking } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private apiurl = url + 'api/bus/routes/';
  private busbookapi = url + 'booking/';

  constructor(private http: HttpClient) {}

  GETBUSDETAILS(depart: string, arrival: string, date: string): Observable<any> {
    const api = `${this.apiurl}${depart}/${arrival}/${date}`;
    console.log('Calling API:', api);
    return this.http.get(api);
  }

  addbusmongo(myBooking: any): Observable<Booking> {
    return this.http.post<Booking>(this.busbookapi, myBooking);
  }

  getbusmongo(id: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.busbookapi}${id}`);
  }
}
