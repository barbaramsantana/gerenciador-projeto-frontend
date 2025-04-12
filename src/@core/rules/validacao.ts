export const rulesDuasPalavras = [
  (v: string) =>
    (v && v.trim().split(/\s+/).length >= 2) ||
    "Por favor, digite ao menos duas palavras",
];
export const rulesUmaPalavra = [
  (v: string) =>
    (v && v.trim().split(/\s+/).length >= 1) ||
    "Por favor, digite ao menos uma palavra",
];

export const rulesDataValida = [
  (v: string) => {
    const dataSelecionada = new Date(v);
    return (
      (v && !isNaN(dataSelecionada.getTime())) || "Selecione uma data válida"
    );
  },
];
