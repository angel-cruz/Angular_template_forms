import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { DataService } from '../data/data.service';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrl: './user-settings-form.component.css'
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings : UserSettings = {
    name: null,
    emailoffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  }

  userSettings : UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]> | undefined;

  ngOnInit() {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }
  onBlur(field : NgModel){
    console.log('in onBlur: ', field.valid);
}
  constructor(private dataService: DataService) { }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
  console.log('in onSubmit: ', form.valid);

if (form.valid) {
  this.dataService.postUserSettingsForm(this.userSettings).subscribe(
    result => console.log('success: ', result),
    error => this.onHttpError(error)
  );
} else {
  this.postError = true;
  this.postErrorMessage = "Please fix the above errors"
}
  
}

}
