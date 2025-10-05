import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // necessário para *ngIf e *ngFor
import { FormsModule } from '@angular/forms';   // necessário para [(ngModel)]
import { MOCK_CLIENTES } from '../mock-dados';


@Component({
  selector: 'app-control-panel',
  standalone: true,               // independent
  imports: [CommonModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})

export class ControlPanelComponent implements OnInit{
  @Output() remove = new EventEmitter<void>();

  clientes = MOCK_CLIENTES.map(c => c.nome);
    clienteSelecionado = this.clientes[0];
    dataAtual = new Date();

    documentosProcessar = 0;
    totalDocumentos = 0;
    percManual = 0;
    percAutomatico = 0;

    efeitoNovo = false;

  constructor() {
    this.atualizarDados(this.clienteSelecionado);
  }

  ngOnInit() {
    this.simularChegadaDocumentos();
    this.simularProcessamento();
  }

  simularChegadaDocumentos() {
    setInterval(() => {
      const novosDocs = Math.floor(Math.random() * 3) + 1; // 1 a 3 documentos
      this.documentosProcessar += novosDocs;

      this.dispararEfeito(); // pisca o campo
      this.atualizarPercentuais();
    }, 10000);
  }

  simularProcessamento() {
    setInterval(() => {
      if (this.documentosProcessar > 0) {
        this.documentosProcessar--;
        this.totalDocumentos++;
        this.atualizarPercentuais();
      }
    }, 20000);
  }

  // Dispara efeito visual temporário
  dispararEfeito() {
    this.efeitoNovo = true;
    setTimeout(() => this.efeitoNovo = true, 50);
    setTimeout(() => this.efeitoNovo = false, 1550);
  }

  // Atualiza as porcentagens de processamento
  atualizarPercentuais() {
    const total = this.documentosProcessar + this.totalDocumentos;
    if (total > 0) {
      this.percAutomatico = Math.floor((this.totalDocumentos / total) * 100);
      this.percManual = 100 - this.percAutomatico;
    }
  }

  removerPanel() {
    this.remove.emit();
  }

  atualizarDados(cliente: string) {
    const c = MOCK_CLIENTES.find(c => c.nome === cliente);
    if (c) {
      this.documentosProcessar = c.documentosProcessar;
      this.totalDocumentos = c.totalDocumentos;
      this.percManual = c.percManual;
      this.percAutomatico = c.percAutomatico;
    }
  }
}


