import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthProvider } from '../auth/auth.service';

@Injectable()
export class LoggedGuardProvider implements CanActivate {
  constructor(
    private authProvider: AuthProvider
  ) {}

  canActivate(): Observable<boolean> {
    return this.authProvider.checkLogged();
  }
}
