import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;
  loggedInUserDP: string;
  loggedInUser: string;

  constructor(private user: UserService, private router: RouterService) {
    this.user.getUserSubject().subscribe(data => {
      if(data) {
        this.loggedIn = true;
        this.loggedInUserDP = this.user.currentUser.dp;
        this.loggedInUser = this.user.currentUser.username;
      } else {
        this.loggedIn = false;
        this.loggedInUserDP = "";
        this.loggedInUser = "";
      }
    });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.user.logout();
    this.router.routeToStaticView();
  }

}
