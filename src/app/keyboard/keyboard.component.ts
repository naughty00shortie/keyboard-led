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
}
