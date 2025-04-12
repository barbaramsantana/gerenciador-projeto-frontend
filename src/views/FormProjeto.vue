<script setup lang="ts">
import { ref, watch } from "vue";
import useFormProjeto from "../store/formProjeto";
import type { VFileInput } from "vuetify/components";
import { useGerenciarProjetos } from "../services";
import {
  rulesDataValida,
  rulesDuasPalavras,
  rulesUmaPalavra,
} from "../@core/rules/validacao";
import { handleFileChange } from "../@core/utils";
interface Emit {
  (e: "salvarProjeto"): void;
  (e: "close"): void;
}

const emit = defineEmits<Emit>();
const refFormularioProjeto = ref();
const formProjeto = useFormProjeto();
const ImagemFile = ref<File | null>();
const fileInput = ref<InstanceType<typeof VFileInput> | null>(null);

const triggerFileInput = () => {
  const inputElement = fileInput.value?.$el.querySelector("#input-file");
  if (inputElement) {
    inputElement.click();
  }
};

const handleSubmit = async () => {
  if (
    !formProjeto.nome ||
    !formProjeto.cliente ||
    !formProjeto.dataInicio ||
    !formProjeto.dataFim
  ) {
    return;
  }
  const body = {
    nome: formProjeto.nome,
    cliente: formProjeto.cliente,
    dataInicio: formProjeto.dataInicio,
    dataFim: formProjeto.dataFim,
    imagemProjeto: formProjeto.imagemProjeto,
    id: formProjeto.id,
    favorito: formProjeto.favorito,
  };
  if (formProjeto.id) {
    useGerenciarProjetos
      .requestUpdateProjeto(body)
      .then(() => {
        formProjeto.limparFormulario();
        emit("salvarProjeto");
      })
      .catch((error) => {
        console.error("Erro ao salvar o projeto:", error);
      });
  } else {
    useGerenciarProjetos
      .requestCreateProjeto(body)
      .then(() => {
        formProjeto.limparFormulario();
        emit("salvarProjeto");
      })
      .catch((error) => {
        console.error("Erro ao criar o projeto:", error);
      });
  }
};

const handleVoltar = () => {
  formProjeto.limparFormulario();
  emit("close");
};

const removerImagem = () => {
  ImagemFile.value = null;
  formProjeto.imagemProjeto = null;
};

const ehFormValido = ref(false);
watch(
  () => [
    formProjeto.nome,
    formProjeto.cliente,
    formProjeto.dataInicio,
    formProjeto.dataFim,
    formProjeto.imagemProjeto,
  ],
  async () => {
    if (refFormularioProjeto.value) {
      const refValid = await refFormularioProjeto.value.validate();
      ehFormValido.value = refValid.valid;
    } else {
      ehFormValido.value = false;
    }
  },
  { deep: true }
);

watch(
  () => ImagemFile.value,
  async (newValue) => {
    if (newValue && typeof newValue === "object") {
      formProjeto.imagemProjeto = await handleFileChange(newValue);
    } else {
      formProjeto.imagemProjeto = null;
    }
  }
);
</script>

<template>
  <VCard variant="text">
    <VBtn
      class="text-none rounded-pill d-flex pl-0"
      color="primary"
      variant="text"
      @click="handleVoltar"
    >
      <v-icon icon="mdi-arrow-left" start></v-icon>
      Voltar
    </VBtn>
    <VCardTitle class="pl-0">
      <h5 class="text-h5 text-secondary mb-5">
        {{ formProjeto.id ? "Editar Projeto" : "Novo projeto" }}
      </h5>
    </VCardTitle>
  </VCard>
  <VCard variant="text" border>
    <VCardText class="mx-auto my-5 content-form">
      <VForm @submit.prevent="handleSubmit" ref="refFormularioProjeto">
        <VRow>
          <VCol cols="12">
            <label
              for="nomeProjeto"
              class="text-subtitle-1 d-flex align-center text-primary"
              >Nome do projeto
              <spam class="text-body-2 ml-2 text-grey-darken-1"
                >(Obrigatório)</spam
              ></label
            >
            <VTextField
              id="nomeProjeto"
              density="compact"
              v-model="formProjeto.nome"
              :rules="rulesDuasPalavras"
              required
              variant="outlined"
            ></VTextField>
          </VCol>
          <VCol cols="12">
            <label
              for="cliente"
              class="text-subtitle-1 d-flex align-center text-primary"
              >Cliente
              <spam class="text-body-2 ml-2 text-grey-darken-1"
                >(Obrigatório)</spam
              ></label
            >
            <VTextField
              id="cliente"
              density="compact"
              v-model="formProjeto.cliente"
              :rules="rulesUmaPalavra"
              required
              variant="outlined"
            ></VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <label
              for="dataInicio"
              class="text-subtitle-1 d-flex align-center text-primary"
              >Data de Início
              <spam class="text-body-2 ml-2 text-grey-darken-1"
                >(Obrigatório)</spam
              ></label
            >
            <VTextField
              id="dataInicio"
              density="compact"
              v-model="formProjeto.dataInicio"
              :rules="rulesDataValida"
              required
              variant="outlined"
              type="date"
              placeholder=" "
            ></VTextField>
          </VCol>
          <VCol cols="12" sm="6">
            <label
              for="dataFim"
              class="text-subtitle-1 d-flex align-center text-primary"
              >Data Final
              <spam class="text-body-2 ml-2 text-grey-darken-1"
                >(Obrigatório)</spam
              ></label
            >
            <VTextField
              id="dataFim"
              density="compact"
              v-model="formProjeto.dataFim"
              :rules="rulesDataValida"
              required
              variant="outlined"
              type="date"
              placeholder=" "
            ></VTextField>
          </VCol>
          <VCol cols="12">
            <label
              for="dataFim"
              class="text-subtitle-1 d-flex align-center text-primary"
              >Capa do projeto</label
            >
            <VSheet
              class="d-flex flex-column align-center justify-center text-center dotted-border"
              elevation="0"
              rounded="lg"
              color="transparent"
            >
              <div
                class="my-5"
                v-if="!ImagemFile && !formProjeto.imagemProjeto"
              >
                <VIcon color="grey-darken-1" icon="mdi-upload" size="36" />

                <div class="ma-2 text-grey-darken-1 text-body-1">
                  Escolha uma imagem .jpg ou .png no seu dispositivo
                </div>

                <VBtn
                  class="text-none rounded-pill bg-white mt-2"
                  color="primary"
                  variant="outlined"
                  @click="triggerFileInput"
                >
                  Selecionar
                </VBtn>
                <VFileInput
                  id="input-file"
                  ref="fileInput"
                  accept="image/png, image/jpeg"
                  show-size
                  hide-details
                  prepend-icon=""
                  label="Selecionar"
                  class="d-none"
                  v-model="ImagemFile"
                  :multiple="false"
                />
              </div>
              <div v-else-if="formProjeto.imagemProjeto" class="content-imagem">
                <VImg
                  :src="formProjeto.imagemProjeto"
                  class="rounded-lg"
                  width="100%"
                  max-height="395"
                  cover
                />
                <VIcon
                  icon="mdi-delete-outline"
                  size="24"
                  color="primary"
                  variant="outlined"
                  class="ma-4 pa-4 bg-white elevation-2 rounded-circle icon-imagem"
                  @click="removerImagem"
                />
              </div>
            </VSheet>
          </VCol>
          <VCol cols="12">
            <VBtn
              class="mt-2 text-none rounded-pill"
              color="primary"
              type="submit"
              block
              :disabled="!ehFormValido"
            >
              Salvar projeto
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
<style lang="scss" scoped>
.content-form {
  max-width: 704px;
}

.content-imagem {
  position: relative;
  width: 100%;
  max-height: 395px;
}

.icon-imagem {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
