<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  titulo: string;
  descricao?: string;
  destaqueDescricao?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "confirmar"): void;
  (e: "cancelar"): void;
}>();

function cancelar() {
  emit("update:modelValue", false);
  emit("cancelar");
}

function confirmar() {
  emit("confirmar");
  emit("update:modelValue", false);
}
</script>
<template>
  <VDialog v-model="props.modelValue" persistent max-width="582">
    <div class="icon-container elevation-3">
      <VIcon icon="mdi-delete-outline" size="30" color="white" />
    </div>
      <VCard class="rounded-lg pa-8 text-center">

      <VCardTitle class="mt-4">
        <h6 class="text-secondary text-h6 font-weight-bold">
          {{ props.titulo }}
        </h6>
      </VCardTitle>

      <VDivider class="my-4" />

      <VCardText class="text-body-2 text-medium-emphasis">
        <div v-if="props.descricao" class="text-body-1 mb-2">
          {{ props.descricao }}
        </div>
        <h5
          v-if="props.destaqueDescricao"
          class="text-h5 mt-2 text-high-emphasis"
        >
          {{ props.destaqueDescricao }}
        </h5>
      </VCardText>

      <VRow class="d-flex flex-wrap justify-space-between align-center">
        <VCol>
            <VBtn
            block
            size="large"
              variant="outlined"
              color="primary"
              class="text-none rounded-pill mr-4 flex-1"
              @click="cancelar"
            >
              Cancelar
            </VBtn>
        </VCol>
        <VCol>
            <VBtn size="large" block class="text-none rounded-pill flex-1" color="primary" @click="confirmar">
              Confirmar
            </VBtn>
        </VCol>

    </VRow>
    </VCard>
  </VDialog>
</template>
<style scoped lang="scss">
.icon-container {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6c4de2;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>
