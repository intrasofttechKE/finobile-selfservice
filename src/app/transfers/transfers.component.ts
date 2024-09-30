import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransfersService } from './transfers.service';
import { TransferRequest } from './transferRequest.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'online-banking-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  fromAccountOptions: any;
  toAccountOptions: any;
  displayedFromAccountOptions: any;
  displayedToAccountOptions: any;
  transferForm: FormGroup;
  date = new Date();
  isSubmitting: boolean = false;



  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private transfersService: TransfersService) {
    this.route.data.subscribe((data: { transferTemplate: any }) => {
      const { fromAccountOptions, toAccountOptions } = data.transferTemplate;
      this.fromAccountOptions = fromAccountOptions;
      this.displayedFromAccountOptions = fromAccountOptions;
      this.toAccountOptions = toAccountOptions;
      this.displayedToAccountOptions = toAccountOptions;
    });
  }

  ngOnInit(): void {
    this.createTransferForm();
  }

  createTransferForm() {
    this.transferForm = this.formBuilder.group({
      toAccount: ['', Validators.required],
      fromAccount: ['', Validators.required],
      amount: ['', Validators.required],
      date: this.date,
      remarks: ['', Validators.required]
    });
  }

  handleFromFieldOption(value: any) {
    this.displayedToAccountOptions = this.toAccountOptions.filter(account => value ? account.accountId !== value.accountId : true);
  }

  handleToFieldOption(value: any) {
    this.displayedFromAccountOptions = this.fromAccountOptions.filter(account => value ? account.accountId !== value.accountId : true);
  }
  submitTransferRequest() {
    this.isSubmitting = true;
    console.log('Trying to submit the transfer request', this.transferForm.value);

    const selectedFromAccount = this.transferForm.value.fromAccount;
    const selectedToAccount = this.transferForm.value.toAccount;

    const formattedDate = new Date(this.date).toISOString().split('T')[0];
    const transferRequest: TransferRequest = {
      fromOfficeId: selectedFromAccount.officeId,
      fromClientId: selectedFromAccount.clientId,
      fromAccountType: selectedFromAccount.accountType.id,
      fromAccountId: selectedFromAccount.accountId,
      toOfficeId: selectedToAccount.officeId,
      toClientId: selectedToAccount.clientId,
      toAccountType: selectedToAccount.accountType.id,
      toAccountId: selectedToAccount.accountId,
      dateFormat: 'yyyy-MM-dd',
      locale: 'en',
      transferDate: formattedDate,
      transferAmount: this.transferForm.value.amount,
      transferDescription: this.transferForm.value.remarks || ''
    };

    this.transfersService.createNewTransfer(transferRequest).subscribe({
      next: (response) => {
        console.log('Transfer successful', response);
        this.transferForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Transfer failed', error);
      }
    });
  }



}
