import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // necessário para *ngIf e *ngFor
import { FormsModule } from '@angular/forms';   // necessário para [(ngModel)]

@Component({
  selector: 'app-control-panel',
  standalone: true,               // <-- deixa o componente independente
  imports: [CommonModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Output() remove = new EventEmitter<void>();

  clientes = ['Cliente A', 'Cliente B', 'Cliente C'];
  clienteSelecionado = '';
  dataAtual = new Date();
  documentosProcessar = 0;
  totalDocumentos = 0;
  percManual = 0;
  percAutomatico = 0;

  removerPanel() {
    this.remove.emit();
  }
}
