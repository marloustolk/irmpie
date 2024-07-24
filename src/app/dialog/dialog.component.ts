import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Highscore } from '../highscore.service';

export enum Dialog {
  ABOUT = 'About',
  FEEDBACK = 'Send feedback',
  HIGHSCORE = 'New Highscore!',
  LOST = 'You Lost!',
  SCORES = 'Highscores',
  THANKS = 'Thank You!',
  NONE = ''
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Output() play: EventEmitter<void> = new EventEmitter<void>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() highscore: EventEmitter<string> = new EventEmitter<string>();
  @Output() feedback: EventEmitter<{ name: string, feedback: string }> = new EventEmitter<{ name: string, feedback: string }>();
  @Input() numberOfRaisinsEaten: number = 0;
  @Input() scores: Highscore[] = [];
  @Input() set dialog(dialog: Dialog) {
    this._dialog = dialog;
    this.header = dialog;
    this.dialogVisible = dialog !== Dialog.NONE;
  };
  get dialog() { return this._dialog }
  dialogVisible = false;
  dialogEnum = Dialog;
  header = '';
  private _dialog = Dialog.NONE;
  name: string = '';
  text: string = '';
}
