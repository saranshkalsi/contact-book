<template>
  <!-- Add Contact Form -->
  <div class="container mt-5 contact-card">
    <div class="card">
      <h3 class="card-header fw-bold">Add Contact</h3>
      <div class="card-body">
        <!-- Form for adding a new contact -->
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group my-2">
              <label for="firstName" class="fw-bold">First Name</label>
              <input
                id="firstName"
                v-model="newContact.firstName"
                type="text"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group my-2">
              <label for="lastName" class="fw-bold">Last Name</label>
              <input
                id="lastName"
                v-model="newContact.lastName"
                type="text"
                class="form-control"
                required
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group my-2">
              <label for="phone" class="fw-bold">Phone #</label>
              <input
                id="phone"
                v-model="newContact.phone"
                type="text"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group my-2">
              <label for="email" class="fw-bold">Email</label>
              <input
                id="email"
                v-model="newContact.email"
                type="email"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <!-- Button to add the new contact -->
        <div class="d-flex justify-content-center mt-4">
          <button @click="addContact" class="btn btn-primary btn-edit mx-1" :disabled="isAddButtonDisabled">
            Add Contact
          </button>
        </div>
      </div>
    </div>
    <!-- Button to navigate back to all contacts -->
    <router-link to="/" class="btn btn-secondary bg-primary mx-1 mt-3">
      Back to All Contacts
    </router-link>
  </div>
</template>

<script>
// Import the global styles
import "../style.css";

export default {
  data() {
    return {
      // Initialize newContact object to store form data
      newContact: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      },
    };
  },
  computed: {
    // Compute the disabled state of the "Add Contact" button based on the first name field
    isAddButtonDisabled() {
      return this.newContact.firstName.trim() === "";
    },
  },
  methods: {
    // Method to add a new contact
    addContact() {
      // Retrieve contacts from local storage or initialize an empty array
      const contactsJson = localStorage.getItem("contacts");
      let contacts = contactsJson ? JSON.parse(contactsJson) : [];

      // Generate a unique ID for the new contact
      const newId = Date.now().toString();
      // Add the new contact to the contacts array
      contacts.push({
        id: newId,
        ...this.newContact,
      });
      // Save the updated contacts array to local storage
      localStorage.setItem("contacts", JSON.stringify(contacts));
      // Redirect to the details page of the newly added contact
      this.$router.push("/contact/" + newId);
    },
  },
};
</script>
