import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AuthProvider } from '../../../providers';

@Component({
  selector: 'app-main',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  user: FormGroup;
  loginToken: string = '';

  constructor(
    private authProvider: AuthProvider,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.authProvider.getCsrfToken().subscribe(res => this.loginToken = res.response.data);

    this.user = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(environment.patterns.email)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(environment.patterns.password),
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ]
    });
  }

  signIn(): void {
    let { email, password, loginToken } = this;
    this.authProvider.loginUser(email, password, loginToken);
  }
}
