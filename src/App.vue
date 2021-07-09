<template>
   <div id="app">
  <img alt="Vue logo" src="./assets/logo.png">
  <h1
    @click= "isStartFire = true"
  >Click here to start Firework</h1>
  
  <Firework position = "center"
    v-if = "isStartFire"
    @Close = "isStartFire=false"

  > Welcom to Firework 
  </Firework>
   </div>
  
</template>

<script>
 import Firework from '@/components/Firework/Firework.vue';
 import { ref } from 'vue';

export default {
  name: 'App',

  setup() {
     const isStartFire =  ref(false);
     return {
       isStartFire
     }

  },

  components: {
    Firework
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  background-color: skyblue;
  height: 100vh;
}

h1{
  color : white;
  cursor: pointer;
}  
</style>
