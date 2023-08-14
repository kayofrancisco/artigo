import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Retorno } from '../models/retorno';

@Injectable({
  providedIn: 'root'
})
export class ArtigoService {
  private url = environment.url
  private key = environment.apiKey;

  constructor(private http: HttpClient) { }

  buscarArtigos(pagina: number) {
    return this.http.get<Retorno>(`${this.url}&pageSize=10&page=${pagina}&apiKey=${this.key}`);
  }
}
