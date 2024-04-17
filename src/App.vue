<template>
  <!-- The root element of the application -->
  <div id="app">
    <!-- The <router-view> component renders the component for the current route -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // The name of the component, used for identification and debugging
  name: "App",
};
</script>

<style>
/* CSS styles for the component */
#app {
  font-family: Arial, sans-serif;
}
</style>
