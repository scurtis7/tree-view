import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {
  }

  material() {
    this.router.navigate(['material']);
  }

  bootstrap() {
    this.router.navigate(['bootstrap']);
  }

}
