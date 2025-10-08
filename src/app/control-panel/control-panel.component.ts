import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_CLIENTES } from '../mock-dados';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Output() remove = new EventEmitter<void>();
  @Output() mousedownTopbar = new EventEmitter<MouseEvent>();

  clientes = MOCK_CLIENTES.map(c => ({
    nome: c.nome,
    novos: c.documentosProcessar,
    processados: c.totalDocumentos,
    percManual: c.percManual,
    percAutomatico: c.percAutomatico
  }));

  clienteSelecionado = ''; // Nenhum cliente selecionado inicialmente
  efeitoNovo = false;
  private simulando = false; // Flag para controlar simulação deste card. Tudo funcionando

  // Chamado quando o cliente é selecionado no dropdown
  onClienteChange(clienteNome: string) {
    this.clienteSelecionado = clienteNome;

    if (!this.simulando) {
      this.simulando = true;
      setTimeout(() => this.simularFluxoDocumentos(), 2000);
    }
  }

  getClienteSelecionado() {
    return this.clientes.find(c => c.nome === this.clienteSelecionado);
  }

  simularFluxoDocumentos() {
    const cliente = this.getClienteSelecionado();
    if (!cliente) return;

    // Chegada aleatória de documentos
    const novosDocs = this.randomInt(1, 5);
    cliente.novos += novosDocs;

    // Processamento aleatório proporcional ao acúmulo
    const maxProcessar = cliente.novos > 10 ? 5 : 3; // mais rápido se houver acúmulo
    const processados = this.randomInt(1, Math.min(cliente.novos, maxProcessar));
    cliente.novos -= processados;
    cliente.processados += processados;

    // Atualiza percentuais
    const total = cliente.novos + cliente.processados;
    if (total > 0) {
      cliente.percAutomatico = Math.floor((cliente.processados / total) * 100);
      cliente.percManual = 100 - cliente.percAutomatico;
    }

    this.dispararEfeito();

    // Intervalo adaptativo: mais rápido se houver muitos documentos
    let intervalo: number;
    if (cliente.novos > 20) {
      intervalo = this.randomInt(1000, 2500); // processamento mais frequente
    } else if (cliente.novos > 10) {
      intervalo = this.randomInt(2000, 4000);
    } else {
      intervalo = this.randomInt(4000, 6000);
    }

    setTimeout(() => this.simularFluxoDocumentos(), intervalo);
  }

  dispararEfeito() {
    const cliente = this.getClienteSelecionado();
    if (cliente && cliente.novos <= 20) { // pisca verde apenas abaixo do alerta leve
      this.efeitoNovo = true;
      setTimeout(() => this.efeitoNovo = false, 1500);
    }
  }

  // Cor do texto do campo de documentos
  getCorDocumento(): string {
    const cliente = this.getClienteSelecionado();
    if (!cliente) return 'black';

    if (cliente.novos > 30) return 'black';   // alerta máximo → texto preto
    if (cliente.novos > 20) return 'red';     // alerta leve → texto vermelho
    if (this.efeitoNovo) return 'green';      // pisca verde para novos documentos
    return 'black';                            // normal
  }

  // Cor do fundo do campo de documentos
  getFundoDocumento(): string {
    const cliente = this.getClienteSelecionado();
    if (!cliente) return '#dcdcdc';

    if (cliente.novos > 30) return 'red';     // alerta máximo → fundo vermelho
    return '#dcdcdc';                          // normal
  }

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  removerPanel() {
    this.remove.emit();
  }

  dragStart(event: MouseEvent) {
    this.mousedownTopbar.emit(event);
  }
}
