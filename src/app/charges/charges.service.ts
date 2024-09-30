import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }


  getClientCharges() {
    const clients = this.authenticationService.getCredentials().clients;
    return this.http.get(`/self/clients/${clients}/charges`);
  }

}
