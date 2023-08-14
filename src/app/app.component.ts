import { Component, OnInit } from '@angular/core';
import { ArtigoService } from './service/artigo.service';
import { Artigo } from './models/artigo';
import { first } from 'rxjs';
import { format } from 'date-fns';

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

  constructor(private service: ArtigoService) {
  }

  ngOnInit(): void {
    this.buscarArtigos(1);
  }

  buscarArtigos(pagina: number) {
    this.travarTela = true;
    this.service.buscarArtigos(pagina).subscribe(res => {
      this.totalArtigos = res.totalResults;
      this.artigos = res.articles;
      this.travarTela = false;
    });
  }

  mudouPagina({ first, rows }: { first: number; rows: number }) {
    this.buscarArtigos(first == 0 ? 1 : (first / 10) + 1);
  }

  formatarData(data: string) {
    return data ? format(new Date(data), 'dd/MM/yyyy') : 'Não Informado';
  }
}
