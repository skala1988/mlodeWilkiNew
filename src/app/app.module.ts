import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './app.router';
import * as Components  from './components';
import * as Providers  from './providers';
import { ParallaxDirective } from './directives/parallax.directive';

@NgModule({
  declarations: [
    Components.Layout.AppComponent,
    Components.Pages.MainComponent,
    Components.Pages.NotFoundComponent,
    Components.Layout.NavComponent,
    ParallaxDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes, {useHash: true})
  ],
  providers: [
    Providers.NavService
  ],
  bootstrap: [Components.Layout.AppComponent]
})
export class AppModule {}
