// Import necessary functions from vue-router
import { createRouter, createWebHistory } from "vue-router";

// Import Vue components for routing
import ContactList from "../components/ContactList.vue";
import ContactDetails from "../components/ContactDetails.vue";
import AddContact from "../components/AddContact.vue";
import EditContact from "../components/EditContact.vue";

// Define routes for the application
const routes = [
  { path: "/", component: ContactList },       // Route to display contact list
  { path: "/contact/:id", component: ContactDetails },  // Route to display contact details by ID
  { path: "/add", component: AddContact },     // Route to add a new contact
  { path: "/edit/:id", component: EditContact }, // Route to edit an existing contact by ID
];

// Create a router instance with history mode
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Export the router instance
export default router;
