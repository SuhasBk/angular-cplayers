import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveMatchService {

  private live: any[];
  private liveSubject: BehaviorSubject<any[]>;

  constructor(private http: HttpClient) {
    this.live = [];
    this.liveSubject = new BehaviorSubject([]);

  }

  fetchLiveFromServer() {
    return this.http.get('https://cricapi.com/api/matches/').subscribe(response => {
      this.live = response['matches'].filter(match => {
        return match.matchStarted === true;
      })
      this.liveSubject.next(this.live);
    }, error => {
      this.liveSubject.error(error);
    })
  }

  getLiveScore(id: number) {
    return this.http.post('https://cricapi.com/api/cricketScore/', {'unique_id': id});
  }

  getMatches(): BehaviorSubject<any[]> {
    return this.liveSubject;
  }


}
