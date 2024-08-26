// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// createApp(App)
// .use(router)
// .mount('#app')


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the Toast CSS

const app = createApp(App); // Create the Vue application instance

app.use(router); // Use Vue Router
app.use(Toast); // Use Vue Toastification plugin

app.mount('#app'); // Mount the application to the DOM
