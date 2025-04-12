export interface IProjeto {
  id: number | null;
  nome: string;
  cliente: string;
  dataInicio: Date;
  dataFim: Date;
  imagemProjeto: null | string;
  favorito: boolean;
}