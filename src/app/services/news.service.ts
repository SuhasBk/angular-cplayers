import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private news: any[];
  private newsSubject: BehaviorSubject<any[]>;

  constructor(private http: HttpClient) {
    this.news = [];
    this.newsSubject = new BehaviorSubject([]);
  }

  fetchNewsFromServer() {
    return this.http.get('http://localhost:4200/api/matches/').subscribe(response => {
      this.news = response['matches'];
      this.newsSubject.next(this.news);
    }, error => {
      this.newsSubject.error(error);
    })
  }

  getNews(): BehaviorSubject<any[]> {
    return this.newsSubject;
  }
}
