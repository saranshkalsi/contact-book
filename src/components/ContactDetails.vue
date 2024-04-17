<template>
  <!-- Contact Details Component -->
  <div class="container mt-5 contact-card">
    <div class="card">
      <h3 class="card-header fw-bold">Contact Details</h3>
      <!-- Dialog Box for confirming contact deletion -->
      <div class="toast-div">
        <div
          class="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          :class="{ show: showToast }"
        >
          <div class="toast-body">
            Are you sure you want to delete this contact?
            <div class="mt-2 pt-2 border-top">
              <button
                type="button"
                class="btn btn-secondary btn-sm btn-delete mx-1"
                @click="deleteContact"
              >
                Yes
              </button>
              <button
                type="button"
                class="btn btn-secondary btn-sm mx-1"
                @click="hideToast"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Display contact details -->
      <div v-if="!showToast">
        <div class="card-body card-body-left">
          <div class="row">
            <div class="col-4 d-flex justify-content-center">
              <span class="avatar-detail">
                {{ getAvatarInitials(contact) }}
              </span>
            </div>
            <div class="col-8">
              <p class="card-text">
                <span class="fw-bold">Full Name:</span> {{ contact.firstName }} {{ contact.lastName }}
              </p>
              <p class="card-text">
                <span class="fw-bold">Phone:</span> {{ contact.phone }}
              </p>
              <p v-if="contact.email" class="card-text">
                <span class="fw-bold">Email:</span> {{ contact.email }}
              </p>
            </div>
          </div>
          <!-- Edit and Delete buttons -->
          <div class="d-flex justify-content-center mt-4">
            <router-link
              :to="'/edit/' + contact.id"
              class="btn btn-primary btn-edit mx-1"
              >Edit</router-link
            >
            <button
              @click="confirmDeleteContact"
              class="btn btn-danger btn-delete mx-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Back button to navigate to all contacts -->
    <router-link
      to="/"
      class="btn btn-secondary mt-3 bg-primary"
      v-if="!showToast"
      >Back to All Contacts</router-link
    >
  </div>
</template>

<script>
// Import global styles
import "../style.css";

export default {
  data() {
    return {
      contact: {},      // Object to store the contact details
      showToast: false, // Flag to show/hide the delete confirmation Dialog Box
    };
  },
  created() {
    // Fetch the contact details when the component is created
    this.fetchContact();
  },
  methods: {
    // Method to fetch the contact details from local storage
    fetchContact() {
      const contactId = this.$route.params.id;  // Get the contact ID from the route parameters
      const contactsJson = localStorage.getItem("contacts");
      const contacts = contactsJson ? JSON.parse(contactsJson) : [];
      // Find the contact with the matching ID
      this.contact = contacts.find((contact) => contact.id === contactId);
    },
    // Method to delete the contact
    deleteContact() {
      const contactId = this.$route.params.id;  // Get the contact ID from the route parameters
      let contactsJson = localStorage.getItem("contacts");
      let contacts = contactsJson ? JSON.parse(contactsJson) : [];
      // Filter out the contact with the matching ID
      contacts = contacts.filter((contact) => contact.id !== contactId);
      // Save the updated contacts array to local storage
      localStorage.setItem("contacts", JSON.stringify(contacts));
      // Hide the Dialog Box and navigate back to all contacts
      this.showToast = false;
      this.$router.push("/");
    },
    // Method to generate initials for the avatar
    getAvatarInitials(contact) {
      const firstInitial = contact.firstName.charAt(0).toUpperCase();
      const lastInitial = contact.lastName.charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    },
    // Method to show the delete confirmation Dialog Box
    confirmDeleteContact() {
      this.showToast = true;
    },
    // Method to hide the delete confirmation Dialog Box
    hideToast() {
      this.showToast = false;
    },
  },
};
</script>
