import { Component, HostListener } from '@angular/core';
import { DirectionService } from './direction.service';
import { StyleClassService } from './style-class.service';
import { Highscore, HighscoreService } from './highscore.service';
import { first } from 'rxjs';
import { Dialog } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private interval: any;
  private raisin = 20;
  dialog = Dialog.NONE;
  numberOfRaisinsEaten = 0;
  scores: Highscore[] = [];
  styles: string[][] = [];
  irmpier: number[] = [];

  constructor(
    private directionService: DirectionService,
    private highscoreService: HighscoreService,
    private styleClassService: StyleClassService) { }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.stop();
    this.directionService.reset();

    this.numberOfRaisinsEaten = 0;
    this.dialog = Dialog.NONE;
    this.irmpier = [56, 57, 58]
    this.setStyleClasses();
    this.interval = setInterval(() => this.move(), 300);
  }

  closeDialog() {
    this.dialog = Dialog.NONE;
  }

  about() {
    this.dialog = Dialog.ABOUT;
  }

  stop() {
    clearInterval(this.interval);
    if (this.numberOfRaisinsEaten > 0 && this.isHighScore()) {
      this.dialog = Dialog.HIGHSCORE;
    } else {
      this.dialog = Dialog.LOST;
    }
    clearInterval(this.interval);
  }

  move() {
    const head = this.getHead();
    let newHead = this.directionService.getNewHead(head);
    if (newHead !== this.raisin) {
      this.irmpier.shift();
    } else {
      this.numberOfRaisinsEaten++;
      this.placeRandomRaisin();
      clearInterval(this.interval);
      this.interval = setInterval(() => this.move(), 300 - 3 * this.numberOfRaisinsEaten);
    }
    this.irmpier.includes(newHead) ? this.stop() : this.irmpier.push(newHead);
    this.setStyleClasses();
  }

  getHead() {
    return this.irmpier[this.irmpier.length - 1];
  }

  placeRandomRaisin() {
    let newPlace = this.raisin;
    do {
      newPlace = Math.floor(Math.random() * (120 - 0 + 1) + 0)
    } while (this.irmpier.includes(newPlace))
    this.raisin = newPlace;
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('touchstart', ['$event'])
  @HostListener('touchmove', ['$event'])
  listen(event: Event) {
    if (event instanceof TouchEvent) {
      this.directionService.handleTouchEvent(event);
    } else {
      this.directionService.handleEvent((event as KeyboardEvent).key);
    }
  }

  isHighScore() {
    this.getScores();
    if (this.scores.length < 10) {
      return true;
    }
    const lowestHighscore = this.scores[this.scores.length - 1].score;
    return this.numberOfRaisinsEaten > parseInt(lowestHighscore);
  }

  showScores() {
    this.getScores();
    this.dialog = Dialog.SCORES;
  }

  getScores() {
    this.highscoreService.getHighScores().pipe(first()).subscribe(scores => {
      this.scores = scores.sort((a,b) => parseInt(b.score) - parseInt(a.score)).slice(0, 10);
    });
  }

  async saveHighscore(name:string) {
    this.highscoreService.postHighScore({name:name, score:this.numberOfRaisinsEaten.toString()}).subscribe();
    this.getScores();
  }

  setStyleClasses() {
    const newStyles: string[][] = [];
    [...Array(121).keys()].forEach(place => {
      const placeStyle = [];
      if (this.raisin === place) {
        placeStyle.push('raisin');
      } else if (this.irmpier.includes(place)) {
        placeStyle.push(this.styleClassService.getIrmpierStyle(this.irmpier, this.getHead(), place));
      }
      newStyles.push(placeStyle);
    });
    this.styles = newStyles;
  }
}
