import { Component, HostListener, Input, OnInit } from '@angular/core';

enum Direction { UP, DOWN, LEFT, RIGHT }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  private interval: any;
  private rowCount = 11;
  private raisin = 20;
  dialogVisible = false;
  numberOfRaisinEaten = 0;
  places: number[] = [];
  styles: string[][] = [];
  irmpier: number[] = []
  direction = Direction.RIGHT;

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
      this.direction = Direction.RIGHT;
      this.irmpier = [56, 57, 58]
      this.setStyleClasses();
      this.interval = setInterval(() => this.move(), 250);
    }

    stop() {
      this.dialogVisible = true;
      clearInterval(this.interval);
    }

    move() {
      let newHead = this.getNewHead();
      if (newHead !== this.raisin) {
        this.irmpier.shift();
      } else {
        this.numberOfRaisinEaten++;
        this.placeRandomRaisin();
      }
      this.irmpier.includes(newHead) ? this.stop() : this.irmpier.push(newHead);
      this.setStyleClasses();
    }

    getNewHead() {
      const head = this.getHead();
      const {UP, DOWN, LEFT, RIGHT} = Direction;

      switch(this.direction) {
        case Direction.UP: return this.isEndOfColumn(UP) ? head + 110 : head - 11;
        case Direction.DOWN: return this.isEndOfColumn(DOWN) ? head - 110 : head + 11;
        case Direction.LEFT: return this.isEndOfRow(LEFT) ? head + 10 : head - 1;
        case Direction.RIGHT: return this.isEndOfRow(RIGHT) ? head - 10 : head + 1;
      }
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

    isEndOfRow(direction: Direction.LEFT | Direction.RIGHT) {
      const startOrEnd = direction === Direction.RIGHT ? 1 : 0;
      return ((this.getHead() + startOrEnd) / this.rowCount) % 1 === 0;
    }

    isEndOfColumn(direction: Direction.UP | Direction.DOWN) {
      if (direction === Direction.UP) {
        return this.getHead() < 11
      }
      return this.getHead() > 109;
    }

    setStyleClasses() {
      const newStyles: string[][] = [];
      this.places.forEach(place => {
        const placeStyle = [];
        if (this.raisin === place) {
          placeStyle.push('raisin');
        } else if (this.irmpier.includes(place)) {
          placeStyle.push(this.getirmpierStyle(place));
        }
        newStyles.push(placeStyle);
      });
      this.styles = newStyles;
    }

    getirmpierStyle(place: number) {
      if (this.irmpier[0] === place) {
        const direction = this.getDirection(place, this.irmpier[1]);
        return `pie-tail ${direction}`;
      }
      if (this.getHead() === place) {
        const direction = this.getDirection(this.irmpier[this.irmpier.length - 2], this.getHead());
        return `irm ${direction}`;
      }
      const index = this.irmpier.indexOf(place);
      const directionBefore = this.getDirection(this.irmpier[index - 1], place);
      const directionAfter = this.getDirection(place, this.irmpier[index + 1]);

      const isInCorner = directionBefore != directionAfter;
      if (isInCorner) {
        return `pie-corner ${directionBefore}-${directionAfter}`;
      }
      return `pie ${directionAfter}`;
    }

    getDirection(place: number, next: number) {
      if (next === place + 1 || next === place - 10) {
        return 'right';
      } else if (next === place - 11 || next === place + 110) {
        return 'up';
      } else if (next === place + 11 || next === place - 110) {
        return 'down';
      }
      return 'left';
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      switch(event.key) {
        case 'ArrowUp': if (this.direction !== Direction.DOWN) this.direction = Direction.UP; break;
        case 'ArrowDown': if (this.direction !== Direction.UP) this.direction = Direction.DOWN; break;
        case 'ArrowRight': if (this.direction !== Direction.LEFT) this.direction = Direction.RIGHT; break;
        case 'ArrowLeft': if (this.direction !== Direction.RIGHT) this.direction = Direction.LEFT; break;
      }
    }
  }
