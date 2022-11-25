import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  nationalities:string[] = ['Française', 'Espagnol'];
  cities:string[] = ['Nouméa', 'Païta', 'Dumbéa'];

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    this.http
    .post('http://localhost:1337/api/contacts', this.contactForm.value)
    .subscribe((response: any)=>{
      console.log(response);
    });
    // console.warn(this.contactForm.value);
  }
}