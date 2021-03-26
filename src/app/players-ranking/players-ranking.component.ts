import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetplayersbynameService } from '../services/getplayersbyname.service';
import { StatsDialogComponent } from '../stats-dialog/stats-dialog.component';

@Component({
  selector: 'app-players-ranking',
  templateUrl: './players-ranking.component.html',
  styleUrls: ['./players-ranking.component.css']
})

export class PlayersRankingComponent implements OnInit {
  players: any;
  batting_T20: any;
  batting_OD: any;
  batting_test: any;

  bowling_T20: any;
  bowling_OD: any;
  bowling_test: any;

  promises = [];
  ids = new Array(376116, 35320, 253802, 26421, 28763, 234675, 31107, 481896, 625371, 277916, 236779, 237095);
// 279810, 32540: tests, ODIs, no t20 || 398439
  constructor(private http: HttpClient, private dialog: MatDialog, private playerService: GetplayersbynameService) {
    this.players = [];
    this.batting_T20 = [];
    this.batting_OD = [];
    this.batting_test = [];
    this.bowling_T20 = [];
    this.bowling_OD = [];
    this.bowling_test = [];
  }

  openDialog(id: number) {
    console.log(id);
    
    this.dialog.open(StatsDialogComponent, {      
      data: this.playerService.getStats(id),
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '500vw !important'
    });
  }

  ngOnInit() {
    for(let i = 0; i < this.ids.length; i++) {
      //console.log("id ", this.ids[i]);
      this.promises.push(this.http.post('/api/playerStats', { 'pid': this.ids[i] }).toPromise());
    }    
    console.log(this.promises); 
    Promise.all(this.promises).then(response => {
      this.players = response;
      console.log("players Data: ", this.players);
      
      // Batting Ranking
      this.batting_test = [].concat(this.players).sort((player1, player2) => {
        let matchTypeData1 = player1['data']['batting']['tests'].Ave; 
        let matchTypeData2 = player2['data']['batting']['tests'].Ave;
        return -(matchTypeData1 - matchTypeData2);
      });
      // console.log("Sorted arr", this.batting_test);

      this.batting_OD = [].concat(this.players).sort((player1, player2) => {
        let matchTypeData1 = player1['data']['batting']['ODIs'].Ave; 
        let matchTypeData2 = player2['data']['batting']['ODIs'].Ave;
        return -(matchTypeData1 - matchTypeData2);
      });
      // console.log("Sorted arr", this.batting_OD);

      this.batting_T20 = [].concat(this.players).sort((player1, player2) => {
        let matchTypeData1 = player1['data']['batting']['T20Is'].Ave; 
        let matchTypeData2 = player2['data']['batting']['T20Is'].Ave;
        return -(matchTypeData1 - matchTypeData2);
      });
      // console.log("Sorted arr", this.batting_T20);

      //Bowling Ranking
      this.bowling_test = [].concat(this.players).sort((player1, player2) => {
        let matchTypeData1 = player1['data']['bowling']['tests'].Ave; 
        let matchTypeData2 = player2['data']['bowling']['tests'].Ave;
        return -(matchTypeData1 - matchTypeData2);
      });
      // console.log("Sorted arr", this.bowling_test);

      this.bowling_OD = [].concat(this.players).sort((player1, player2) => {
        let matchTypeData1 = player1['data']['bowling']['ODIs'].Ave; 
        let matchTypeData2 = player2['data']['bowling']['ODIs'].Ave;
        return -(matchTypeData1 - matchTypeData2);
      });
      // console.log("Sorted arr", this.bowling_OD);

      this.bowling_T20 = [].concat(this.players).sort((player1, player2) => {
        let matchTypeData1 = player1['data']['bowling']['T20Is'].Ave; 
        let matchTypeData2 = player2['data']['bowling']['T20Is'].Ave;
        return -(matchTypeData1 - matchTypeData2);
      });
      // console.log("Sorted arr", this.batting_T20);

    });
    
  }

}
 