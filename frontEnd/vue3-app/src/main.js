import router from './router'
import store from './store'
import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import { client } from './apolloService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: client,
    });
  },
  render: () => h(App),
});
app.use(store);
app.use(router);
app.mount('#app');
