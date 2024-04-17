<!-- ContactList component: for dispaly contacts list -->
<template>
  <div>
    <!-- Search bar -->
    <input
      v-model="search"
      type="text"
      placeholder="Search contacts..."
      class="form-control mb-3"
    />
    <!-- Contacts Card -->
    <div class="card">
      <div class="card-title d-flex justify-content-between">
        <h3>Contacts Book</h3>
        <router-link to="/add" class="btn btn-primary bg-primary fw-bold"
          >Add Contact</router-link
        >
      </div>
      <hr />
      <!-- Dialog box for confirmation of deleting contact -->
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
                class="btn btn-secondary btn-delete btn-sm mx-1"
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
      <!-- Contacts Table where all contacts are listed -->
      <table v-if="!showToast" class="table text-center">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone #</th>
            <!-- Hide email column on medium and smaller screens -->
            <th class="d-none d-md-table-cell">Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-if="filteredContacts.length > 0">
          <tr v-for="contact in filteredContacts" :key="contact.id">
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar mx-3">
                  {{ getAvatarInitials(contact) }}
                </div>
                {{ contact.firstName }} {{ contact.lastName }}
              </div>
            </td>
            <td>{{ contact.phone }}</td>
            <!-- Hide email column on medium and smaller screens -->
            <td class="d-none d-md-table-cell">{{ contact.email }}</td>
            <td>
              <!-- Actions: View, Edit, Delete contact icon -->
              <div class="d-flex justify-content-around">
                <router-link
                  :to="'/contact/' + contact.id"
                  class="btn btn-primary btn-radius btn-view"
                >
                  <span class="material-symbols-outlined icon-color"
                    >visibility</span
                  >
                </router-link>
                <router-link
                  :to="'/edit/' + contact.id"
                  class="btn btn-success btn-radius btn-edit"
                >
                  <span class="material-symbols-outlined icon-color">edit</span>
                </router-link>
                <button
                  class="btn btn-danger btn-radius btn-delete"
                  @click="confirmDeleteContact(contact.id)"
                >
                  <span class="material-symbols-outlined icon-color"
                    >delete</span
                  >
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- Display message if no contacts are available -->
        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center">No contacts available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "../style.css";
export default {
  data() {
    return {
      search: "", // Search query
      contacts: [], // Array to store contacts
      showToast: false, // Flag to show/hide delete confirmation toast
      contactToDelete: null, // ID of contact to be deleted
    };
  },
  created() {
    this.fetchContacts(); // Fetch contacts from localStorage on component creation
  },
  methods: {
    fetchContacts() {
      // Retrieve contacts from localStorage or initialize an empty array
      const contactsJson = localStorage.getItem("contacts");
      this.contacts = contactsJson ? JSON.parse(contactsJson) : [];

      // Sort contacts by last name if available, otherwise by first name
      this.contacts.sort((a, b) => {
        if (a.lastName && b.lastName) {
          return a.lastName.localeCompare(b.lastName);
        } else if (a.lastName && !b.lastName) {
          return -1;
        } else if (!a.lastName && b.lastName) {
          return 1;
        } else {
          return a.firstName.localeCompare(b.firstName);
        }
      });
    },
    // Get initials of contact for avatar
    getAvatarInitials(contact) {
      const firstInitial = contact.firstName.charAt(0).toUpperCase();
      const lastInitial = contact.lastName.charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    },
    // Show confirmation Dialog box before deleting contact
    confirmDeleteContact(contactId) {
      this.contactToDelete = contactId;
      this.showToast = true;
    },
    // Delete contact from the list
    deleteContact() {
      if (this.contactToDelete) {
        this.contacts = this.contacts.filter(
          (contact) => contact.id !== this.contactToDelete
        );
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
        // After Delete contact close Dialog box
        this.showToast = false;
        this.contactToDelete = null;
      }
    },
    // Hide confirmation Dialog box
    hideToast() {
      this.showToast = false;
      this.contactToDelete = null;
    },
  },
  computed: {
    // Filter contacts based on search query
    filteredContacts() {
      const searchQuery = this.search.toLowerCase().trim();
      return this.contacts.filter((contact) => {
        const fullName =
          `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return fullName.includes(searchQuery);
      });
    },
  },
};
</script>
