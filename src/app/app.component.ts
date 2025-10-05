import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  mostrarOpcao = false;

  panels: {id: number, type: 'controle' | 'relatorio', top: number, left: number}[] = [];

  nextId = 1;

  dataAtual: Date = new Date(); 

  ngOnInit() {
    // data
    setInterval(() => {
      this.dataAtual = new Date();
    }, 1000);
  }

  adicionarPanel(tipo: 'controle' | 'relatorio') {
  this.panels.push({
    id: this.nextId++,
    type: tipo,
    top: 50,   // posição inicial (px)
    left: 50
  });
}


  drop(event: any) {
    const prevIndex = event.previousIndex;
    const currIndex = event.currentIndex;
    const temp = this.panels[prevIndex];
    this.panels[prevIndex] = this.panels[currIndex];
    this.panels[currIndex] = temp;
  }

  startDrag(event: MouseEvent, panel: any) {
  event.preventDefault(); // evita seleção de texto
  const startX = event.clientX;
  const startY = event.clientY;
  const startTop = panel.top;
  const startLeft = panel.left;

  const move = (e: MouseEvent) => {
    panel.top = startTop + (e.clientY - startY);
    panel.left = startLeft + (e.clientX - startX);
  };

  const up = () => {
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
  };

  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
}

}
