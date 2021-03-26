import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteService } from '../services/favorite.service';
import { GetplayersbynameService } from '../services/getplayersbyname.service';
import { RecommendationService } from '../services/recommendation.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { StatsDialogComponent } from '../stats-dialog/stats-dialog.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  playerName = '';
  players: any[];
  panelOpenState = false;
  status: string;
  breakpoint: number;

  loggedIn = false;

  constructor(private playerService: GetplayersbynameService, private recService: RecommendationService, private user: UserService, private favService: FavoriteService, private snack: MatSnackBar, private dialog: MatDialog) {
    this.user.getUserSubject().subscribe(data => {
      if(data) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit(): void {
  }

  search() {
    if(this.playerName.startsWith(' ') || this.playerName == ''){
      this.panelOpenState = false;
    }
    else {
      this.panelOpenState = true;
      console.log("searching for ", this.playerName);
    
      this.playerService.clearResults();

      this.playerService.checkErrors().subscribe(err => {
        this.status = err;
      });
      
      this.playerService.fetchPlayers(this.playerName).subscribe(data => {
        this.status = "LOADING... PLEASE WAIT..."
        this.players = data;

        this.players.forEach(player => {
          if(this.favService.exists(player)) {
            player.favorite = true;
          }
          if(this.recService.exists(player)) {
            player.recommended = true;
          }
        })
      });
    }
  }

  openSnackBar() {
    this.snack.open('Login/Register first!', 'Close');
  }

  toggleRec(pid) {
    if(!this.loggedIn) {
      this.openSnackBar();
    } else {
      let player = this.players.find((pl) => {
        return pl.id === parseInt(pid.innerText);
      });

      player.recommended = !player.recommended;

      if(player.recommended) {
        this.recService.recommend(player);
      } else {
        this.recService.unrecommend(player);
      }
    }
  }

  toggleFav(pid) {
    if (!this.loggedIn) {
      this.openSnackBar();
    } else {
      let player = this.players.find((pl) => {
        return pl.id === parseInt(pid.innerText);
      });

      player.favorite = !player.favorite;

      if (player.favorite) {
        this.favService.add(player);
      } else {
        this.favService.remove(player);
      }
    }
  }

  openDialog(id: number) {
    this.dialog.open(StatsDialogComponent, { 
      data: this.playerService.getStats(id),
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '500vw !important'
    });
  }

}
