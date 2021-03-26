import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private recommendations: any[];
  private recBehavior: BehaviorSubject<any[]>;

  constructor(private user: UserService) { 
    this.recommendations = [];
    this.recBehavior = new BehaviorSubject(this.recommendations);

    this.user.getUserSubject().subscribe(data => {
      this.recommendations = data?.recommendations
      this.recBehavior.next(this.recommendations);
    })
  }

  exists(player) {
    let exists = this.recommendations?.find((pl) => {
      return pl.id == player.id.toString();
    })

    if (exists) {
      return true;
    }
    return false;
  }

  recommend(player) {
    if (!this.exists(player)) {
      this.recommendations.push(player);
      this.user.updateRecommendations(this.recommendations);
      this.recBehavior.next(this.recommendations);
    }
  }

  unrecommend(player) {
    this.recommendations = this.recommendations.filter((pl) => {
      return pl.id != player.id;
    });

    this.user.updateRecommendations(this.recommendations);
    this.recBehavior.next(this.recommendations);
  }

  fetch() {
    return this.recBehavior;
  }
}
