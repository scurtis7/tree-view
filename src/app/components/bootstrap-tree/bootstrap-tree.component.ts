import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-bootstrap-tree',
  templateUrl: './bootstrap-tree.component.html',
  styleUrl: './bootstrap-tree.component.scss'
})
export class BootstrapTreeComponent {

  constructor(private router: Router) {
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }

}
