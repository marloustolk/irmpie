import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DirectionService } from './direction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private interval: any;
  private raisin = 20;
  dialogVisible = false;
  numberOfRaisinEaten = 0;
  places: number[] = [];
  styles: string[][] = [];
  irmpier: number[] = []

  constructor(private directionService: DirectionService) { }

  ngOnInit(): void {
    this.places = new Array();
    for (let i = 0; i < 121; i++) {
      this.places.push(i);
    }
    this.start();
  }

  togglePlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    } else {
      this.interval = setInterval(() => this.move(), 250);
    }
  }

  start() {
    this.numberOfRaisinEaten = 0;
    this.dialogVisible = false;
    this.irmpier = [56, 57, 58]
    this.setStyleClasses();
    this.interval = setInterval(() => this.move(), 250);
  }

  stop() {
    this.dialogVisible = true;
    clearInterval(this.interval);
  }

  move() {
    const head = this.getHead();
    let newHead = this.directionService.getNewHead(head);
    if (newHead !== this.raisin) {
      this.irmpier.shift();
    } else {
      this.numberOfRaisinEaten++;
      this.placeRandomRaisin();
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

  setStyleClasses() {
    const newStyles: string[][] = [];
    this.places.forEach(place => {
      const placeStyle = [];
      if (this.raisin === place) {
        placeStyle.push('raisin');
      } else if (this.irmpier.includes(place)) {
        placeStyle.push(this.getIrmpierStyle(place));
      }
      newStyles.push(placeStyle);
    });
    this.styles = newStyles;
  }

  getIrmpierStyle(place: number) {
    if (this.irmpier[0] === place) {
      const direction = this.getDirectionStyleClass(place, this.irmpier[1]);
      return `pier-tail ${direction}`;
    }
    if (this.getHead() === place) {
      const direction = this.getDirectionStyleClass(this.irmpier[this.irmpier.length - 2], this.getHead());
      return `irm ${direction}`;
    }
    const index = this.irmpier.indexOf(place);
    const directionBefore = this.getDirectionStyleClass(this.irmpier[index - 1], place);
    const directionAfter = this.getDirectionStyleClass(place, this.irmpier[index + 1]);

    const isInCorner = directionBefore != directionAfter;
    if (isInCorner) {
      return `pier-corner ${directionBefore}-${directionAfter}`;
    }
    return `pier ${directionAfter}`;
  }

  getDirectionStyleClass(place: number, next: number) {
    if (next === place + 1 || next === place - 10) {
      return 'right';
    } else if (next === place - 11 || next === place + 110) {
      return 'up';
    } else if (next === place + 11 || next === place - 110) {
      return 'down';
    }
    return 'left';
  }
}
