import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favorites: any[];
  private favBehavior: BehaviorSubject<any[]>;

  constructor(private user: UserService) {
    this.favorites = [];
    this.favBehavior = new BehaviorSubject(this.favorites);

    this.user.getUserSubject().subscribe(data => {
      this.favorites = data?.favorites
      this.favBehavior.next(this.favorites);
    })
  }

  exists(player) {
    let exists = this.favorites?.find((pl) => {
      return pl.id == player.id.toString();
    })

    if (exists) {
      return true;
    }
    return false;
  }

  add(player) {
    if (!this.exists(player)) {
      this.favorites.push(player);
      this.user.updateFavorites(this.favorites);
      this.favBehavior.next(this.favorites);
    }
  }

  remove(player) {
    this.favorites = this.favorites.filter((pl) => {
      return pl.id != player.id;
    });

    this.user.updateFavorites(this.favorites);
    this.favBehavior.next(this.favorites);
  }

  fetch() {
    return this.favBehavior;
  }
}
