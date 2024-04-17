// Import the createApp function from Vue
import { createApp } from "vue";
// Import the root component App.vue
import App from "./App.vue";
// Import the router configuration
import router from "./router";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";

// Create a new Vue app instance
// Use the root component App.vue
// Use the router configuration
// Mount the app to the #app element in the DOM
createApp(App).use(router).mount("#app");
