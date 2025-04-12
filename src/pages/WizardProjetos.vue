<script setup lang="ts">
import { ref } from "vue";
import LayoutHeader from "../components/LayoutHeader.vue";
import ProjetosLista from "../views/ProjetosLista.vue";
import FormProjeto from "../views/FormProjeto.vue";

const ehApresentarFormProjeto = ref<boolean>(false);
const apresentarForm = () => {
  ehApresentarFormProjeto.value = true;
};
</script>

<template>
    <LayoutHeader :search="!ehApresentarFormProjeto" />
    <div class="content">
    <ProjetosLista
        v-if="!ehApresentarFormProjeto"
        @apresentarForm="apresentarForm"
    />
    <FormProjeto
        v-if="ehApresentarFormProjeto"
        @close="ehApresentarFormProjeto = false"
        @salvarProjeto="ehApresentarFormProjeto = false"
    />
    </div>
</template>