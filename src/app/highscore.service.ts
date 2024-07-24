import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Highscore {
  Id?: string;
  name: string;
  score: string;
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  private getUrl = 'php/get-scores.php';
  private postUrl = 'php/post-score.php';

  constructor(private http: HttpClient) {
  }

  postHighScore(highscore: Highscore): Observable<any> {
    const formData = new FormData();
    formData.append('name', highscore.name);
    formData.append('score', highscore.score.toString());
    return this.http.post<any>(this.postUrl, formData);
  }

  getHighScores(): Observable<Highscore[]> {
    return this.http.get<any>(this.getUrl);
  }
}
