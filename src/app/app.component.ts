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

  artigos: Artigo[] = [
    {
      author: 'MarketWatch Automation',
      content: 'Shares of Workhorse Group Inc. WKHS, -4.50% slipped 4.50% to $0.86 Monday, on what proved to be an all-around great trading session for the stock market, with the NASDAQ Composite Index COMP… [+747 chars]',
      description: 'Shares of Workhorse Group Inc. slipped 4.50% to $0.86 Monday, on what proved to be an all-around great trading session for the stock market, with the NASDAQ...',
      publishedAt: '2023-08-14T21:38:47Z',
      source: {
          id: 2,
          name: "MarketWatch"
        },
      title: 'Company Close Updates: Workhorse Group Inc. stock underperforms Monday when compared to competitors',
      url: '"https://www.marketwatch.com/data-news/workhorse-group-inc-stock-underperforms-monday-when-compared-to-competitors-3e488c4-8c8113957e60',
      urlToImage: '"https://images.mktw.net/im-220105/social'
    }
  ];
  totalArtigos = 1;
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
          // this.buscarArtigos(1);
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
