<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import logo from "@/assets/images/logo.svg";
import { VAppBar } from "vuetify/components";
import useFormProjeto from "../store/formProjeto";

defineProps<{ search: boolean }>();

const formStore = useFormProjeto();

const searchActive = ref(false);
const searchQuery = ref("");

const toggleSearch = () => {
  searchActive.value = !searchActive.value;
};

const timerId = ref();
const delaySearch = (delay: number = 500) => {
  if (timerId.value) clearTimeout(timerId.value);
  timerId.value = setTimeout(() => {
    if(searchQuery.value.length > 2 || searchQuery.value.length === 0) {
      formStore.busca = searchQuery.value;
    }
  }, delay);
};

watch(searchQuery, () => {
  delaySearch();
});

</script>

<template>
  <VAppBar v-if="!searchActive || searchActive && !search" class="px-8" color="#1C1930">
    <VContainer class="d-flex justify-space-between align-center">
      <div class="d-flex justify-center flex-grow-1">
        <VImg :src="logo" alt="Logo" max-width="190" max-height="72"></VImg>
      </div>
    </VContainer>
    <VIcon
      v-if="search"
      icon="mdi-magnify"
      size="24"
      color="white"
      @click="toggleSearch"
    />
  </VAppBar>

  <div v-if="searchActive && search" class="search-expanded shadow-sm">
    <div class="input-group">
      <VTextField
        type="text"
        class="form-control bg-white"
        v-model="searchQuery"
        placeholder="Digite o nome do projeto..."
      >
        <template v-slot:prepend>
          <VIcon color="primary" icon="mdi-magnify" @click="toggleSearch" />
        </template>
      </VTextField>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-expanded {
  width: 100%;
  position: absolute;
}
.v-input {
  background: white;
  border: 3px solid rgb(var(--v-theme-primary));
  border-radius: 16px;
  display: flex;
  padding-left: 10px;

  .v-input__prepend > .v-icon {
    opacity: 1;
  }
  :deep(input) {
    background-color: white;
  }
}
:deep(.v-input__control) {
  width: 100% !important;
  background-color: white;
  opacity: 1;
  border: none;
}
</style>
