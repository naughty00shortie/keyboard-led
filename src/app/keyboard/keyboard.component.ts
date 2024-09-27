import {Component, OnInit} from '@angular/core';
import {getDatabase, ref, set, onValue} from 'firebase/database';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent implements OnInit {
  private db = getDatabase();

  ngOnInit(): void {
    this.syncButtonStates();
    console.log(window.location.hostname);
  }

  changeButtonColor(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    const color = colorPicker.value;
    const keyId = button.getAttribute('data-key-id');

    this.updateButtonColor(keyId, color);
    this.saveButtonState(keyId, color);
  }

  private updateButtonColor(keyId: string | null, color: string): void {
    const buttons = document.querySelectorAll(`button[data-key-id="${keyId}"]`) as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      button.style.backgroundColor = color;
    });
  }

  private saveButtonState(keyId: string | null, color: string): void {
    set(ref(this.db, 'buttons/' + keyId), {
      color: color
    });
  }

  private syncButtonStates(): void {
    const buttonsRef = ref(this.db, 'buttons');
    onValue(buttonsRef, (snapshot) => {
      const data = snapshot.val();
      for (const keyId in data) {
        this.updateButtonColor(keyId, data[keyId].color);
      }
    });
  }

  changeAllButtonColors(): void {
    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    const color = colorPicker.value;
    const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      this.saveButtonState(button.getAttribute('data-key-id'), color);
    });
  }

  changeAllRandom() {
    const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      const keyId = button.getAttribute('data-key-id');
      this.saveButtonState(keyId, this.getRandColor());
    });
  }

  private getRandColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  changeAllRainbow() {
    const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      const keyId = button.getAttribute('data-key-id');
      this.saveButtonState(keyId, this.getRandRainbowColor());
    });
  }

  private getRandRainbowColor(): string {
    const randomValue = Math.floor(Math.random() * 256);
    const colors = [255, 0, randomValue];

    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    console.log(colors);
    const hexColor = colors.map(value => value.toString(16).padStart(2, '0')).join('');
    return `#${hexColor}`;
  }
}
