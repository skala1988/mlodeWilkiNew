import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.router';
import * as Components  from './components';
import * as Providers  from './providers';

@NgModule({
  declarations: [
    Components.Layout.AppComponent,
    Components.Pages.MainComponent,
    Components.Pages.NotFoundComponent,
    Components.Pages.LoginComponent,
    Components.Layout.NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes, {useHash: true})
  ],
  providers: [
    Providers.NavService,
    Providers.HttpProvider,
    Providers.AuthProvider
  ],
  bootstrap: [Components.Layout.AppComponent]
})
export class AppModule {}
