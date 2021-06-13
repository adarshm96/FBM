import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  constructor(public router: Router){

  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
