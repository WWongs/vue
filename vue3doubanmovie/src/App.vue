<template>
  <div id="app" class="index">
    <router-view></router-view>

    <Menu></Menu>
  </div>
  <!-- app -->
</template>

<script>
import Menu from "./components/Menu";
export default {
  name: "App",
  components: {
    Menu
  },
  methods: {
    
  }
};
</script>

<style lang="less">
.index {
  width: 100%;
  height: 100vh;
}
.van-loading {
  position: absolute;
  width: 2rem;
  height: 2rem;
  z-index: 4;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgb(0, 0, 0, .5);
}
</style>
