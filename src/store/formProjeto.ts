import { defineStore } from "pinia";
import { ref } from "vue";

export interface IProjeto {
  id: number | null;
  nome: string;
  cliente: string;
  dataInicio: Date | null;
  dataFim: Date | null;
  imagemProjeto: string | null;
  favorito: boolean;
}

const useFormProjeto = defineStore("formProjeto", () => {
  const id = ref<number | null>(null);
  const nome = ref<string>("");
  const cliente = ref<string>("");
  const dataInicio = ref<Date | null>(null);
  const dataFim = ref<Date | null>(null);
  const imagemProjeto = ref<string | null>(null);
  const favorito = ref<boolean>(false);
  const busca = ref<string>("");

  const limparFormulario = () => {
    id.value = null;
    nome.value = "";
    cliente.value = ""; 
    dataInicio.value = null;
    dataFim.value = null;
    imagemProjeto.value = null;
    favorito.value = false;
  }



  return {
    id,
    nome,
    cliente,
    dataInicio,
    dataFim,
    imagemProjeto,
    favorito,
    busca,
    limparFormulario,
  };
});

export default useFormProjeto;
