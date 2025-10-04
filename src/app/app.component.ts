import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, ControlPanelComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarOpcao = false;

  panels: {id: number, type: 'controle' | 'relatorio'}[] = [];
  nextId = 1;

  adicionarPanel(tipo: 'controle' | 'relatorio') {
    this.panels.push({ id: this.nextId++, type: tipo });
  }

  drop(event: any) {
    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;
    const temp = this.panels[prevIndex];
    this.panels[prevIndex] = this.panels[currIndex];
    this.panels[currIndex] = temp;
  }
}
