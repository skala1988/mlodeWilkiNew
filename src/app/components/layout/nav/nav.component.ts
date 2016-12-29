import { Component, HostListener, OnInit } from '@angular/core';
import {NavService} from '../../../providers/nav/nav.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['nav.component.scss']
})
export class NavComponent implements OnInit {
  private isScrolled: BehaviorSubject<boolean>;
  private isResponsiveMenuActive: BehaviorSubject<boolean>;

  constructor(
    private navService: NavService
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
}
