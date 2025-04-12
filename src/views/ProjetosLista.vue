<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useGerenciarProjetos } from "../services";
import type { IProjeto } from "../@core/services/gerenciaProjetos/interfaces/IGerenciarProjetos";
import ProjetoCard from "../components/ProjetoCard.vue";
import useFormProjeto from "../store/formProjeto";
import ConfirmacaoDialog from "../components/dialogs/ConfirmacaoDialog.vue";

interface Emit {
  (e: "apresentarForm"): void;
}

const emit = defineEmits<Emit>();
const lista = ref<IProjeto[]>([]);
const formProjeto = useFormProjeto();
const filtrarFavoritos = ref(false);
const ordenacoes = ref([
  { titulo: "Ordem alfabética", value: "alfa" },
  { titulo: "Iniciados mais recentes", value: "recentes" },
  { titulo: "Prazo mais próxmo", value: "prazo" },
]);
const ordenacaoSelecionada = ref(ordenacoes.value[0].value);
const listaAuxiliar = computed(() => {
  let listaFiltrada = lista.value;
  switch (ordenacaoSelecionada.value) {
    case "alfa":
      listaFiltrada = lista.value.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
    case "recentes":
      listaFiltrada = lista.value.sort(
        (a, b) =>
          new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
      );
      break;
    case "prazo":
      listaFiltrada = lista.value.sort(
        (a, b) => new Date(a.dataFim).getTime() - new Date(b.dataFim).getTime()
      );
      break;
    default:
      listaFiltrada = lista.value;
  }
  if (filtrarFavoritos.value) {
    listaFiltrada = listaFiltrada.filter((projeto) => {
      const valorBuscar = formProjeto.busca?.toLowerCase() ?? "";
      return (
        projeto.favorito && projeto.nome.toLowerCase().includes(valorBuscar)
      );
    });
  } else if (formProjeto.busca) {
    listaFiltrada = listaFiltrada.filter((projeto) =>
      projeto.nome.toLowerCase().includes(formProjeto.busca.toLowerCase())
    );
  }
  return listaFiltrada;
});

const ehExcluirProjeto = ref(false);
const excluirProjeto = (id: number) => {
  formProjeto.id = id;
  const nomeProjeto = lista.value.find((projeto) => projeto.id === id)?.nome;
  if (!nomeProjeto) return;
  formProjeto.cliente = nomeProjeto;
  ehExcluirProjeto.value = true;
};

const confirmarExclusao = () => {
  if (!formProjeto.id) return;
  fetchDelete(formProjeto.id);
  formProjeto.limparFormulario();
};

const fetchDelete = async (id: number) => {
  useGerenciarProjetos
    .requestDeleteProjeto(id)
    .then(() => {
      lista.value = lista.value.filter((projeto) => projeto.id !== id);
    })
    .catch((error) => {
      console.error("Erro ao excluir o projeto:", error);
    });
};

const fetchFavorito = async (id: number) => {
  useGerenciarProjetos
    .requestUpdateFavoritarProjeto(id)
    .then(() => {
      lista.value.find((projeto) => {
        if (projeto.id === id) {
          projeto.favorito = !projeto.favorito;
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao atualizar o projeto:", error);
    });
};

const editarProjeto = (id: number) => {
  const projeto = lista.value.find((projeto) => projeto.id === id);
  if (!projeto) return;
  formProjeto.nome = projeto.nome;
  formProjeto.cliente = projeto.cliente;
  formProjeto.dataInicio = projeto.dataInicio;
  formProjeto.dataFim = projeto.dataFim;
  formProjeto.imagemProjeto = projeto.imagemProjeto;
  formProjeto.favorito = projeto.favorito;
  formProjeto.id = projeto.id;
  emit("apresentarForm");
};

onMounted(() => {
  useGerenciarProjetos
    .requestGetProjetos()
    .then((response) => {
      lista.value = response;
    })
    .catch((error) => {
      console.error("Erro ao obter projetos:", error);
    });
});
</script>

<template>
  <VCard
    v-if="lista.length === 0"
    class="d-flex flex-column align-center justify-center"
    height="calc(100vh - 180px)"
    flat
  >
    <VCardText class="content-default">
      <h5 class="text-h5 text-secondary mb-5">Nenhum projeto</h5>
      <p class="text-body-1 text-grey-darken-1">
        Clique no botão abaixo para criar o primeiro e gerenciá-lo.
      </p>
      <VBtn
        class="ma-5 text-none rounded-pill d-flex"
        color="primary"
        variant="flat"
        @click="emit('apresentarForm')"
      >
        <v-icon icon="mdi-plus-circle-outline" start></v-icon>
        Novo projeto
      </VBtn>
    </VCardText>
  </VCard>
  <div v-else>
    <VRow class="d-flex align-center">
      <VCol cols="12" md="6">
        <h5 class="text-h5 text-secondary mb-5 d-flex align-center">
          Projetos
          <div class="ml-1 text-body-1 text-primary">({{ lista.length }})</div>
        </h5>
      </VCol>
      <VCol class="d-flex flex-wrap gap-3 justify-md-end justify-start">
        <VSwitch
          class="mr-sm-5 d-flex align-start"
          v-model="filtrarFavoritos"
          label="Apenas Favoritos"
          inset
          density="compact"
          color="warning"
        ></VSwitch>

        <VSelect
          max-width="296"
          class="mr-sm-6"
          :items="ordenacoes"
          v-model="ordenacaoSelecionada"
          density="compact"
          item-title="titulo"
          item-value="value"
          variant="outlined"
        ></VSelect>

        <VBtn
          class="text-none rounded-pill d-flex"
          color="primary"
          variant="flat"
          @click="emit('apresentarForm')"
        >
          <VIcon icon="mdi-plus-circle-outline" start width="24" height="24" />
          Novo projeto
        </VBtn>
      </VCol>
    </VRow>
    <VRow>
      <div v-for="(projeto, index) in listaAuxiliar">
        <VCol cols="12" sm="6" md="4" lg="3" :key="index">
          <ProjetoCard
            v-if="projeto.id"
            :id="projeto.id"
            :favorito="projeto.favorito"
            :imagem="projeto.imagemProjeto"
            :titulo="projeto.nome"
            :descricao="projeto.cliente"
            :dataInicio="projeto.dataInicio"
            :dataFim="projeto.dataFim"
            @editar="editarProjeto($event)"
            @excluir="excluirProjeto($event)"
            @favoritar="fetchFavorito($event)"
          />
        </VCol>
      </div>
    </VRow>
  </div>
  <ConfirmacaoDialog
    v-model="ehExcluirProjeto"
    titulo="Remover projeto"
    descricao="Essa ação removerá definitivamente o projeto:"
    :destaqueDescricao="formProjeto.cliente"
    @cancelar="formProjeto.limparFormulario()"
    @confirmar="confirmarExclusao()"
  ></ConfirmacaoDialog>
</template>
<style lang="scss" scoped>
.content-default {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
