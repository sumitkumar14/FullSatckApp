import router from './router'
import store from './store'
import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import App from './App.vue';
import { client } from './apolloService';

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
