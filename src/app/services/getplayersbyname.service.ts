import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetplayersbynameService {

  private stats: any;
  private statsSubject: BehaviorSubject<any>;

  private players: Array<any>;
  private playersSubject: BehaviorSubject<any[]>;
  private errorSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) { 
    this.stats = null;
    this.statsSubject = new BehaviorSubject(this.stats);

    this.players = [];
    this.playersSubject = new BehaviorSubject(this.players);

    this.errorSubject = new BehaviorSubject(null);
  }

  fetchPlayers(name: string) {
    this.http.post("http://localhost:4200/api/playerFinder/", {'name': name})
    .subscribe(response => {
      if(response['data'].length === 0) {
        this.errorSubject.next("No Players Found!");
        return;
      }
      let pids: Array<number> = response['data'].map(pl => {
        return pl.pid;
      });
      
      pids.forEach(id => {
        this.getAllData(id).subscribe(response => {
          let p = {
            'id': id,
            'fullName': response['name'],
            'team': response['majorTeams'],
            'imgUrl': response['imageURL'],
            'country': response['country'],
            'role': response['playingRole']
          }
          this.players.push(p);
          this.playersSubject.next(this.players);
        }, error => {
          console.log(error);
        });
      })
    },error =>{
      console.log(error);
    })
    return this.playersSubject;
  }

  getAllData(id) {
    return this.http.post("http://localhost:4200/api/playerStats/", { 'pid': id });
  }

  getStats(id) {
    this.getAllData(id).subscribe(response => {
      let pStats = {
        'id': id,
        'fullName': response['fullName'],
        'team': response['majorTeams'],
        'imgUrl': response['imageURL'],
        'country': response['country'],
        'role': response['playingRole'],
        'age': response['currentAge']?.split(" ")[0] + ' years',
        'profile': response['profile'],
        'bowlingStats': {
          'T20': response['data']?.bowling?.T20Is,
          'ODI': response['data']?.bowling?.ODIs,
          'Test': response['data']?.bowling?.tests,
        },
        'battingStats': {
          'T20': response['data']?.batting?.T20Is,
          'ODI': response['data']?.batting?.ODIs,
          'Test': response['data']?.batting?.tests,
        }
      }

      this.stats = pStats
      this.statsSubject.next(this.stats);
      }, error => {
        console.log(error);
      })

    return this.statsSubject;
  }

  clearResults() {
    this.players = [];
    this.playersSubject.next(this.players);
  }

  checkErrors() {
    return this.errorSubject;
  }
}
