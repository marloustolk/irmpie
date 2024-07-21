import { Component, HostListener } from '@angular/core';
import { DirectionService } from './direction.service';
import { StyleClassService } from './style-class.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private interval: any;
  private raisin = 20;
  dialogVisible = false;
  numberOfRaisinsEaten = 0;
  styles: string[][] = [];
  irmpier: number[] = [];
  lost = false;
  header = '';

  constructor(
    private directionService: DirectionService,
    private styleClassService: StyleClassService) { }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.stop();
    this.directionService.reset();

    this.numberOfRaisinsEaten = 0;
    this.dialogVisible = false;
    this.irmpier = [56, 57, 58]
    this.setStyleClasses();
    this.interval = setInterval(() => this.move(), 300);
  }

  stop() {
    this.header = 'You Lost!';
    this.lost = true;
    this.dialogVisible = true;
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
