import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/core/models/';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../../core/models/user.model';
import { FillScoreboardsService } from '../../core/services/fill-scoreboards.service';
import { PageEvent } from '@angular/material';
import { Match } from 'src/app/core/models/match.model';

@Component({
  selector: 'app-fill-scoreboards',
  templateUrl: './fill-scoreboards.component.html',
  styleUrls: ['./fill-scoreboards.component.css']
})
export class FillScoreboardsComponent implements OnInit {

  isLoading = false;
  matches: Match[] = [];
  totalMatches = 0;
  matchesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  homeScore: number;
  awayScore: number;
  matchId: string;
  private matchesSub: Subscription;

  constructor(public fillScoreboardService: FillScoreboardsService, public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.fillScoreboardService.getMatches(this.matchesPerPage, this.currentPage);
    // this.homeScore = this.fillScoreboardService.getHomescore();
    // this.awayScore = this.fillScoreboardService.getAwayscore();
    this.matchId = this.fillScoreboardService.getMatchId();
    this.matchesSub = this.fillScoreboardService
      .getMatchUpdateListener()
      .subscribe((matchData: { matches: Match[]; matchCount: number }) => {
        this.matches = matchData.matches;
        // console.log(this.charges);
        this.isLoading = false;
        this.totalMatches = matchData.matchCount;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.matchesPerPage = pageData.pageSize;
    this.fillScoreboardService.getMatches(this.matchesPerPage, this.currentPage);
  }

  onSave(matchId: string, homeScore: number, awayScore: number) {
    this.isLoading = true;
    this.fillScoreboardService.saveScores(matchId, homeScore, awayScore).subscribe(() => {
      this.fillScoreboardService.getMatches(this.matchesPerPage, this.currentPage);
      this.fillScoreboardService.setSportWinners().subscribe();
    }, () => {
      this.isLoading = false;
    });
  }
}
