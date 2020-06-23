<template>
  <div>
    
    <div id="app">
      <CTodoList />
      
    </div>
  </div>
</template>

<script>
import CTodoList from "./components/CTodoList.vue";

export default {
  name: "App",
  components: {
    CTodoList
  }
};
</script>

<style>
body {
  background-color: rgb(170, 170, 204);
}
</style>
