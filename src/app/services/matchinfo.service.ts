import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchinfoService {

  private matchDetails: any;
  private matchBehavior: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.matchDetails = null;
    this.matchBehavior = new BehaviorSubject(null);
  }

  getMatchInfo(id) {
    this.http.post("http://localhost:4200/api/fantasySummary/", {'unique_id': id})
    .subscribe(response => {
      
      this.matchDetails = response;
      this.matchDetails.id = id;
      this.matchBehavior.next(this.matchDetails);
    }, err => {
      console.log("error this",err);
    });
    
    return this.matchBehavior;
  }
}
