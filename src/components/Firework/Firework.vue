<template>
  <div class="fire" v-if="isActive">
    <p><slot></slot></p>
    <span class="fire--close" 
        @click="Close"> &times;</span>
    <canvas></canvas>
  </div>
</template>

<script>
import { firework } from "./firework.js";
import { ref } from "vue";

export default {

  setup(_, { emit }) {
      const isActive = ref(true)

      const Close = () => {
        isActive.value = false
        emit('Close', false)
      }

      return {
        isActive,
        Close
      }
  },

  props: {
    position: {
      type: String,
      default : () => 'left',
    }
  },

  mounted() {  
    firework(this.position);
  },
}

</script>
<style lang="scss" scoped>

.fire {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  & canvas {
    width: 100%;
    height: 100vh;
  }

  & p {
    position: fixed;
    width: 100%;
    text-align: center;
    color: rgba(255, 255, 255, 0.15);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
  }

  &--close {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 40px;
    height: 40px;

    top: 15px;
    right: 20px;

    color: black;
    font-size: 30px;
    font-weight: 600;
    border-radius: 100%;
    background-color: white;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
