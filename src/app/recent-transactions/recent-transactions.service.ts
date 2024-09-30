import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RecentTransactionsService {

  /**
   * @param {HttpClient} http Client for sending requests
   * @param {AuthenticationService} authenticationService Service to obtain authentication details
   */
  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getClientTransactions() {
    const clients = this.authenticationService.getCredentials().clients;
    return this.http.get(`/self/clients/${clients}/transactions`);
  }

}
