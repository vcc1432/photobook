import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-components';
import aws_exports from './aws-exports';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Amplify.configure(aws_exports);

createApp(App).use(store).use(router).mount('#app');
