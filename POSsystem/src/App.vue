<template>
  <div id="app">
		<leftNav></leftNav>
		<div class="main">
    <router-view/>
		</div>
  </div>
</template>

<script>
	import leftNav from '@/components/common/leftNav';
export default {
  name: 'App',
	components:{
		leftNav
	}
}
</script>

<style>
#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
	margin-left: 76px;
	background-color: #eff2f7;
	height: 100%;
	overflow: hidden;
}
</style>
