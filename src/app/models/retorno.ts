import { Artigo } from "./artigo";

export interface Retorno {
  articles: Artigo[];
  status: string;
  totalResults: number;
}
