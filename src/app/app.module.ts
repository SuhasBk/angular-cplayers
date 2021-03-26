import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NewsComponent } from './news/news.component';
import { NewsService } from './services/news.service'
import { RecommendationService } from './services/recommendation.service';
import { GetplayersbynameService } from './services/getplayersbyname.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Staticml1Component } from './staticml1/staticml1.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouteGuard } from './route.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { AuthService } from './services/auth.service';
import { LiveMatchService } from './services/livematch.service';
import { RouterService } from './services/router.service';
import { MatchDialog } from './live-match/match-dialog';
import { MatchinfoService } from './services/matchinfo.service';
import { UserService } from './services/user.service';
import { FavoriteService } from './services/favorite.service';
import { FavoriteComponent } from './favorite/favorite.component';
import { PlayersRankingComponent } from  './players-ranking/players-ranking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StatsDialogComponent } from './stats-dialog/stats-dialog.component';
import { HeaderInterceptorInterceptor} from './header-interceptor.interceptor';


const routes = [
  { path : 'my-recommendations', component: Staticml1Component },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]},
  { path: 'edit', component: UserProfileComponent, canActivate: [RouteGuard]},
  { path: 'rankings', component: PlayersRankingComponent, canActivate: [RouteGuard]},
  { path: '', redirectTo: 'my-recommendations', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    Staticml1Component,
    HeaderComponent,
    SearchbarComponent,
    RecommendationComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    LiveMatchComponent,
    MatchDialog,
    FavoriteComponent,
    PlayersRankingComponent,
    UserProfileComponent,
    StatsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule,
    MatTreeModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [
    NewsService,
    GetplayersbynameService,
    RecommendationService,
    MatDialog,
    AuthService,
    LiveMatchService,
    RouterService,
    MatchinfoService,
    UserService,
    FavoriteService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorInterceptor, multi: true }
  ],
  entryComponents: [LiveMatchComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
