<template>
  <!-- Edit Contact Component -->
  <div class="container mt-5 contact-card">
    <div class="card">
      <h3 class="card-header fw-bold">Edit Contact</h3>
      <!-- Dialog Box for confirming changes -->
      <div class="toast-div">
        <div
          class="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          :class="{ show: showToast }"
        >
          <div class="toast-body">
            Are you sure you want to save changes?
            <div class="mt-2 pt-2 border-top">
              <button
                type="button"
                class="btn btn-secondary btn-sm btn-edit mx-1"
                @click="saveChanges"
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

      <!-- Display edit form -->
      <div v-if="!showToast">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group my-2">
                <label for="firstName" class="fw-bold">First Name</label>
                <input
                  id="firstName"
                  v-model="contact.firstName"
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
                  v-model="contact.lastName"
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
                  v-model="contact.phone"
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
                  v-model="contact.email"
                  type="email"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <!-- Save Changes button -->
          <div class="d-flex justify-content-center mt-4">
            <button
              @click="confirmSaveChanges"
              class="btn btn-primary btn-edit mx-1"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import global styles
import "../style.css";

export default {
  data() {
    return {
      contact: {},      // Object to store the contact details
      showToast: false, // Flag to show/hide the save changes confirmation toast
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
    // Method to save the changes to the contact
    saveChanges() {
      const contactsJson = localStorage.getItem("contacts");
      let contacts = contactsJson ? JSON.parse(contactsJson) : [];
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === this.contact.id
      );
      // Update the contact in the contacts array
      contacts[contactIndex] = this.contact;
      // Save the updated contacts array to local storage
      localStorage.setItem("contacts", JSON.stringify(contacts));
      // Hide the Dialog Box and navigate back to the contact details page
      this.showToast = false;
      this.$router.push("/contact/" + this.contact.id);
    },
    // Method to show the save changes confirmation Dialog Box
    confirmSaveChanges() {
      this.showToast = true;
    },
    // Method to hide the save changes confirmation Dialog Box
    hideToast() {
      this.showToast = false;
    },
  },
};
</script>
