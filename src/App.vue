<script setup lang="ts">
import WizardProjetos from "./pages/WizardProjetos.vue";
import LayoutHeader from "./components/LayoutHeader.vue";

</script>

<template>
  <VApp>
    <div class="app-container d-flex flex-column h-100">
      <WizardProjetos/>
    </div>
  </VApp>
</template>

<style lang="scss">
@use "sass:math";
html,
body,
#app,
.v-layout {
  margin: 0;
  padding: 0;
  font-family: "Encode Sans Semi Expanded", sans-serif;
  background-color: rgb(var(--v-theme-background));
}
.v-application {
  min-height: 100vh;
}

.content {
  margin: 36px 24px;
  position: relative;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
}

/* Style plugin vuetify */

.v-input__control {
  background-color: #fff;
  .v-field {
    border-radius: 8px;
  }
}

.v-switch .v-input__control {
  background-color: initial;
}

.v-selection-control--density-compact {
  .v-switch__track {
    height: 24px;
    min-width: 48px;
  }
}

.v-switch__track {
  background-color: rgb(var(--v-theme-grey-darken-2));
  opacity: 1;
}
.v-selection-control__input {
  .v-switch__thumb {
    width: 12px;
    height: 12px;
    transform: none;
  }
}
.rounded-md {
  border-radius: 16px!important;
}

.dotted-border {
  border: 1px dotted rgb(var(--v-theme-grey-darken-1));
  border-radius: 8px;
}
</style>
