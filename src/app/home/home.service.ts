import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  /**
   * @param {HttpClient} http Client for sending requests
   */
  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getAccounts(): Observable<any> {
    const clients = this.authenticationService.getCredentials().clients;
    console.log('From the home service get account method ', clients);
    return this.http.get(`/self/clients/${clients}/accounts`);
  }

}
