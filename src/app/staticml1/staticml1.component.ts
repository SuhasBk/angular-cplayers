import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-staticml1',
  templateUrl: './staticml1.component.html',
  styleUrls: ['./staticml1.component.css']
})
export class Staticml1Component implements OnInit {

  constructor(private newsService: NewsService) { 
  }

  ngOnInit(): void {
    this.newsService.fetchNewsFromServer();
  }

}
