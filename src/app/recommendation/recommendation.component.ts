import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetplayersbynameService } from '../services/getplayersbyname.service';
import { RecommendationService } from '../services/recommendation.service';
import { StatsDialogComponent } from '../stats-dialog/stats-dialog.component';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  recommendations: any[];

  constructor(private recService: RecommendationService, private dialog: MatDialog, private playerService: GetplayersbynameService) { }

  ngOnInit(): void {
    this.recService.fetch().subscribe(data => {      
      this.recommendations = data;
    })
  }

  remove(pid) {
    let player = this.recommendations.find((pl) => {
      return pl.id == pid.innerText;
    })
    player.recommended = !player.recommended;
    this.recService.unrecommend(player);
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