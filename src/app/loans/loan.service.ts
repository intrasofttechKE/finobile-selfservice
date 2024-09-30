import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanRequest } from './loanRequest.model';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getProductOptions() {
    const clients = this.authenticationService.getCredentials().clients;
    return this.http.get(`/self/loans/template?templateType=individual&clientId=${clients}`);
  }

  getProductOptionDetails(productId: number) {
    const clients = this.authenticationService.getCredentials().clients;
    return this.http.get(`/self/loans/template?templateType=individual&clientId=${clients}&productId=${productId}`);
  }

  requestNewLoan(loan: LoanRequest) {
    loan.clientId = this.authenticationService.getCredentials().clients[0];
    console.log('User credentials:', this.authenticationService.getCredentials());

    loan.principal = loan.principal.toString();
    console.log(loan);
    return this.http.post('/self/loans', loan);
  }

}
