<template>
  <div id="app">
    <h1>在线翻译</h1>
    <h5 class="text-muted">简单 / 易用 / 便捷</h5>
    <translateform v-on:submitValue="translateText"></translateform>
    <translateOutput v-bind:translatedText="translatedText" style="margin-top: 20px;"></translateOutput>
  </div>
</template>

<script>
import translateform from './components/Translateform'
import translateOutput from './components/TranslateOutput'
export default {
  name: 'App',
  data:function(){
  	return {
  		translatedText:''
  	}
  },
  components: {
    translateform,
    translateOutput
  },
  methods:{
  	translateText:function(text,language){
  		let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180801T004315Z.4674ff432316dab3.c1f7db7cc5729751f0511e1a935fd508d41edf77&lang='+language+'&text=';
  		this.$http.get(url+text).then((response)=>{
  			this.translatedText = response.body.text[0];
  		});
  	}
  }
}



console.log("This people is out of his mind!!!");
console.log("Black People???");
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
