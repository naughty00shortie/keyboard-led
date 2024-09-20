import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private db = getDatabase();

  ngOnInit(): void {
    this.syncButtonStates();
  }

  changeButtonColor(event: Event): void {
    const button = event.target as HTMLButtonElement;
    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    const color = colorPicker.value;
    const keyId = button.getAttribute('data-key-id');

    button.style.backgroundColor = color;
    this.saveButtonState(keyId, color);
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
        const button = document.querySelector(`button[data-key-id="${keyId}"]`) as HTMLButtonElement;
        if (button) {
          button.style.backgroundColor = data[keyId].color;
        }
      }
    });
  }
}
