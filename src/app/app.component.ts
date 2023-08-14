import { Component, OnInit } from '@angular/core';
import { ArtigoService } from './service/artigo.service';
import { Artigo } from './models/artigo';
import { first } from 'rxjs';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  artigos: Artigo[] = [];
  totalArtigos = 0;
  primeiroArtigo = 0;
  travarTela = false;

  constructor(
    private service: ArtigoService,
    private messageService: MessageService
    ) {
  }

  ngOnInit(): void {
    this.buscarArtigos(1);
  }

  buscarArtigos(pagina: number) {
    this.travarTela = true;
    this.service.buscarArtigos(pagina).subscribe(
      {
        next: (res) => {
          this.totalArtigos = res.totalResults;
          this.artigos = res.articles;
          this.travarTela = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao buscar artigos',
            detail: err.error.message
          });
          this.primeiroArtigo = 0;
          this.buscarArtigos(1);
          this.travarTela = false;
        }
      }
    );
  }

  mudouPagina({ first }: { first: number; rows: number }) {
    this.buscarArtigos(first == 0 ? 1 : (first / 10) + 1);
  }

  formatarData(data: string) {
    return data ? format(new Date(data), 'dd/MM/yyyy') : 'Não Informado';
  }
}
