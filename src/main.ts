import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuetify } from 'vuetify'
// @ts-ignore
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from "pinia";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        dark: false,
        colors: {
          background: "#F4F2FF",
          surface: "#FFFFFF",
          primary: "#695CCD",
          secondary: "#1F1283",
          warning: "#FFB23D",
          "grey-darken-1": "#717171",
          "grey-darken-2": "#53525D",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(vuetify);
app.mount("#app");
