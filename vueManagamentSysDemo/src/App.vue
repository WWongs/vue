<template>
  <div id="app">
    <Header/> 
    <sideBar/>
    <main class="app-content" id="index">
    <router-view/>
    </main>
  </div>
</template>

<script>
import Header from './components/Header'
import sideBar from './components/sideBar'
export default {
  name: 'App',
  components: {
    Header,sideBar
  }
}
</script>

<style scoped>

</style>
