import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
    this.initializeApp();
  }
  isLoggedIn = false;
  user:any = {
    full_name: '',
    profileUrl: '',
  };

  setSessionInfo() {
    if (localStorage.getItem('tokenUser')) {
      this.isLoggedIn = true;
      try {
        this.user = JSON.parse(localStorage.getItem('user'));
      } catch (err) {
        console.log(err);
      }
    } else {
      this.isLoggedIn = false;
      this.user = { full_name: '' };
    }
  }

  initializeApp() {
    setTimeout(() => {
      try {
        if (localStorage.getItem('tokenUser')) {
          this.setSessionInfo();
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
