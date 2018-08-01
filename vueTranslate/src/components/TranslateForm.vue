<template>
  <div class="row" id="translateForm">
  	<div class="col-md-12 col-md-offset-2">
	    <form class="well el-form-item__content" style="width: 50%;margin: 10px auto;">
	    	<input class="form-control" type="text" placeholder="请输入需要翻译的内容" v-model="textToTranslate"/>
	    	<select v-model="language" class="form-control" style="width: 30%;margin: 10px auto;">
	    		<option value="en">English</option>
	    		<option value="ru">Russian</option>
	    		<option value="ko">Korean</option>
	    		<option value="ja">Janpenese</option>
	    	</select>
	    	<input type="submit" value="翻译" class="btn btn-primary" @click="formSubmit"/>
	    </form>
    </div>
  </div>
</template>

<script>


export default {
  name: 'translateForm',
  components: {
    
  },
  data:function(){
  	return {
  		textToTranslate:'',
  		language:''
  	}
  },
  methods:{
  	formSubmit:function(e){
  		this.$emit("submitValue",this.textToTranslate,this.language);
  		e.preventDefault();	
  	}	
  },
  created:function(){
  		this.language = 'en';
  	}
}
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
