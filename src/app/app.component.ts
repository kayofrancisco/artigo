import { Component, OnInit } from '@angular/core';
import { ArtigoService } from './service/artigo.service';
import { Artigo } from './models/artigo';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  artigos: Artigo[] = [];
  totalArtigos = 0;
  primeiroArtigo = 0;


  constructor(private service: ArtigoService) {
  }

  ngOnInit(): void {
    this.buscarArtigos(1);
  }

  buscarArtigos(pagina: number) {
    this.service.buscarArtigos(pagina).subscribe(res => {
      this.totalArtigos = res.totalResults;
      this.artigos = res.articles;
    });
  }

  mudouPagina({ first, rows }: { first: number; rows: number }) {
    console.log(first, rows)
    this.buscarArtigos(first == 0 ? 1 : (first / 10) + 1);
  }
}
