import { Component, OnInit } from '@angular/core';
import { NavService } from '../../../providers';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private isScrolled: BehaviorSubject<boolean>;

  constructor(
    private navService: NavService
  ) {}

  ngOnInit() {
    this.isScrolled = this.navService.getIsScrolled();
  }
}
