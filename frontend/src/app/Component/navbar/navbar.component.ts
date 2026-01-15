import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isloggedIn: boolean = false;

  constructor(
    private router: Router,
    private customerservice: CustomerService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem("Loggedinuser")) {
      this.isloggedIn = true;
    } else {
      this.isloggedIn = false;
    }
  }

  handlelogout() {
    sessionStorage.removeItem('Loggedinuser');
    window.location.reload();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
