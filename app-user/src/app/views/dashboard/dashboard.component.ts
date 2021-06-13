import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userInfo:any = {};

  ngOnInit(): void {
    if (localStorage.getItem('tokenUser')) {
      this.userInfo = JSON.parse(localStorage.getItem('user'));
    }
  }
}
