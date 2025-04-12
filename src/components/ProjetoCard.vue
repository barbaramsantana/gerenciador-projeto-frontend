<script setup lang="ts">
import defaultProjeto from "@/assets/images/defaultProjeto.png";
import { formatarData } from "../@core/utils";
const props = defineProps<{
  id: number;
  favorito: boolean;
  imagem: string | null;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
}>();

interface Emit {
  (e: "editar", id: number): void;
  (e: "excluir", id: number): void;
  (e: "favoritar", id: number): void;
}

const emit = defineEmits<Emit>();
</script>

<template>
  <VCard class="mx-auto rounded-md" border flat min-width="346px">
    <VImg class="align-end text-white full-height" :src="props.imagem ?? defaultProjeto" cover>
      <VCardTitle class="d-flex justify-end align-center">
        <VIcon @click="emit('favoritar', props.id)" :icon="props.favorito ? 'mdi-star' : 'mdi-star-outline'" class="mr-2" :color="props.favorito ? 'warning' : ''" />
        <VMenu>
          <template #activator="{ props }">
            <VIconBtn icon="mdi-dots-horizontal-circle" v-bind="props" class="mr-2">
                <VIcon icon="mdi-dots-horizontal-circle" class="text-white" />
            </VIconBtn>
          </template>
          <VCard min-width="240" rounded="lg">
              <VList>
                <VListItem @click="emit('editar', props.id)">
                  <VListItemTitle class="text-primary"
                    ><VIcon icon="mdi-square-edit-outline"/> Editar</VListItemTitle
                  >
                </VListItem>
                <VDivider></VDivider>
                <VListItem @click="emit('excluir', props.id)">
                  <VListItemTitle class="text-primary"
                    ><VIcon icon="mdi-delete-outline"/> Excluir</VListItemTitle
                  >
                </VListItem>
              </VList>
          </VCard>
        </VMenu>
      </VCardTitle>
    </VImg>
    <VCardTitle>
      <h5 class="text-h5 text-secondary mt-3 font-weight-bold">{{ props.titulo }}</h5>
      <div class="text-body-2 d-flex align-center text-grey-darken-1">
        <div class="text-body-1 font-weight-bold mr-1">Cliente:</div>
        <div>{{ props.descricao }}</div>
      </div>
    </VCardTitle>
    <v-divider class="mx-4 mb-1"></v-divider>
    <VCardText class="mb-1">
      <div class="text-body-2 d-flex align-center text-grey-darken-1 mb-2">
        <VIcon icon="mdi-calendar" class="mr-2" />
        <div>{{ formatarData(props.dataInicio) }}</div>
      </div>
      <div class="text-body-2 d-flex align-center text-grey-darken-1">
        <VIcon icon="mdi-calendar-check" class="mr-2" />
        <div>{{ formatarData(props.dataFim) }}</div>
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped></style>
