import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsContent: any;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews().subscribe(data => {
      if (data[0]) {
        this.newsContent = data;
      }
    },
      err => {
        console.log(err);
      });
  }

}
