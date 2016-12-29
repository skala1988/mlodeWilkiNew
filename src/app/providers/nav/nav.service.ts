import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable()
export class NavService {
  private isScrolled: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private isResponsiveMenuActive: BehaviorSubject<boolean> = new BehaviorSubject(false);

  toggleResponsiveMenu() {
    this.isResponsiveMenuActive.next(!this.isResponsiveMenuActive.getValue());
  }
  getIsResponsiveMenuActive() {
    return this.isResponsiveMenuActive;
  }

  setIsScrolled(value: boolean) {
    this.isScrolled.next(value);
  }
  getIsScrolled() {
    return this.isScrolled;
  }
}
