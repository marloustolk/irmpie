import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleClassService {

  getIrmpierStyle(irmpier: number[], head: number, place: number) {
    if (irmpier[0] === place) {
      const direction = this.getDirectionStyleClass(place, irmpier[1]);
      return `pier-tail ${direction}`;
    }
    if (head === place) {
      const direction = this.getDirectionStyleClass(irmpier[irmpier.length - 2], head);
      return `irm ${direction}`;
    }
    const index = irmpier.indexOf(place);
    const directionBefore = this.getDirectionStyleClass(irmpier[index - 1], place);
    const directionAfter = this.getDirectionStyleClass(place, irmpier[index + 1]);

    const isInCorner = directionBefore != directionAfter;
    if (isInCorner) {
      return `pier-corner ${directionBefore}-${directionAfter}`;
    }
    return `pier ${directionAfter}`;
  }

  private getDirectionStyleClass(place: number, next: number) {
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
