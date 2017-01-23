import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthProvider, NavService } from '../../../providers';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit {
  private isScrolled: BehaviorSubject<boolean>;
  private isResponsiveMenuActive: BehaviorSubject<boolean>;

  constructor(
    private navService: NavService,
    private authService: AuthProvider
  ) {}

  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    this.navService.setIsScrolled(window.scrollY >= 100);
  }

  ngOnInit() {
    this.isScrolled = this.navService.getIsScrolled();
    this.isResponsiveMenuActive = this.navService.getIsResponsiveMenuActive();
    this.scrollHandler();
  }

  toggleResponsiveMenu() {
    this.navService.toggleResponsiveMenu();
  }

  logout() {
    this.authService.logout();
  }
}
