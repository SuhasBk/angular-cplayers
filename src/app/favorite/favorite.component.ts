import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteService } from '../services/favorite.service';
import { GetplayersbynameService } from '../services/getplayersbyname.service';
import { StatsDialogComponent } from  '../stats-dialog/stats-dialog.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favorites: any[];

  constructor(private favService: FavoriteService, private dialog: MatDialog, private playerService: GetplayersbynameService) {
    this.favService.fetch().subscribe(data => {
      this.favorites = data;
    })
  }

  ngOnInit(): void {
  }

  remove(pid) {
    let player = this.favorites.find((pl) => {
      return pl.id == pid.innerText;
    })
    
    player.favorite = !player.favorite;
    this.favService.remove(player);
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
