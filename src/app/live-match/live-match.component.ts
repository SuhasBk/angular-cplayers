import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LiveMatchService } from '../services/livematch.service';
import { MatchinfoService } from '../services/matchinfo.service';
import { MatchDialog } from './match-dialog';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.css']
})
export class LiveMatchComponent implements OnInit {

  liveMatches: any[];

  constructor(public dialog: MatDialog, private liveService: LiveMatchService, private matchService: MatchinfoService) { }

  openDialog(id) {
    this.dialog.open(MatchDialog, { 
      data: this.matchService.getMatchInfo(id),
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '500vw !important'
    });
  }

  ngOnInit(): void {
    this.liveService.getMatches().subscribe(data => {
      this.liveMatches = data;
      this.liveMatches.forEach(match => {
        match.winner = match['winner_team'];
      })
    }, err => {
      console.log(err);
    });
  }
}
