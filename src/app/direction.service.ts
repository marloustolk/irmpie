import { Injectable } from '@angular/core';

enum Direction { UP, DOWN, LEFT, RIGHT }

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private direction = Direction.RIGHT;
  private directionKey = Direction.RIGHT;
  private rowCount = 11;
  private touchStart: {pageX: number, pageY: number} | undefined;

  constructor() { }

  handleEvent(direction: string) {
    switch (direction) {
      case 'ArrowUp': if (this.direction !== Direction.DOWN) this.directionKey = Direction.UP; break;
      case 'ArrowDown': if (this.direction !== Direction.UP) this.directionKey = Direction.DOWN; break;
      case 'ArrowRight': if (this.direction !== Direction.LEFT) this.directionKey = Direction.RIGHT; break;
      case 'ArrowLeft': if (this.direction !== Direction.RIGHT) this.directionKey = Direction.LEFT; break;
    }
  }

  handleTouchEvent(event: TouchEvent) {
    if (event.type === 'touchstart'){
      this.touchStart = event.touches[0];
    } else {
      const touchEnd = event.touches[0]
      const divX = Math.abs(this.touchStart!.pageX - touchEnd.pageX);
      const divY = Math.abs(this.touchStart!.pageY - touchEnd.pageY);
      if (divX > divY) {
        this.handleEvent((this.touchStart!.pageX > touchEnd.pageX) ? 'ArrowLeft' : 'ArrowRight')
      } else {
        this.handleEvent((this.touchStart!.pageY > touchEnd.pageY) ? 'ArrowUp' : 'ArrowDown')
      }
    }
  }

  getNewHead(head: number) {
    const { UP, DOWN, LEFT, RIGHT } = Direction;
    this.direction = this.directionKey;
    switch (this.direction) {
      case Direction.UP: return this.isEndOfColumn(head, UP) ? head + 110 : head - 11;
      case Direction.DOWN: return this.isEndOfColumn(head, DOWN) ? head - 110 : head + 11;
      case Direction.LEFT: return this.isEndOfRow(head, LEFT) ? head + 10 : head - 1;
      case Direction.RIGHT: return this.isEndOfRow(head, RIGHT) ? head - 10 : head + 1;
    }
  }

  isEndOfRow(head: number, direction: Direction.LEFT | Direction.RIGHT) {
    const startOrEnd = direction === Direction.RIGHT ? 1 : 0;
    return ((head + startOrEnd) / this.rowCount) % 1 === 0;
  }

  isEndOfColumn(head: number, direction: Direction.UP | Direction.DOWN) {
    if (direction === Direction.UP) {
      return head < 11
    }
    return head > 109;
  }
}
