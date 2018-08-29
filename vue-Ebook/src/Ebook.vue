<template>
	<div class="ebook">
		<TitleBar :ifShowTitleAndMenu="ifShowTitleAndMenu"></TitleBar>
		<div class="read-wrapper">
			<div id="read"></div>
			<div class="mask">
				<div class="left" @click="prevPage"></div>
				<div class="center" @click="toggleTitleAndMenu"></div>
				<div class="right" @click="nextPage"></div>
			</div>
		</div>
	    <MenuBar :ifShowTitleAndMenu="ifShowTitleAndMenu" 
	    	     ref="menuBar" 
	    	     :fontSizeList="fontSizeList" 
	    	     :defaultFontSize="defaultFontSize" 
	    	     @setFontSize="setFontSize"
	             :themeList="themeList" 
	             :defaultTheme="defaultTheme" 
	             @setTheme="setTheme" 
	             @onProgressChange="onProgressChange"
	             :bookAvailable="bookAvailable"
	             @jumpTo="jumpTo"
	             :navigation="navigation">
	    </MenuBar>
	</div>
</template>

<script>
	import TitleBar from '@/components/TitleBar';
	import MenuBar from '@/components/MenuBar';
	import Epub from 'epubjs';
	const DOWNLOAD_URL = './static/66485.epub';
	export default {
		data(){
			return{
				ifShowTitleAndMenu:false,
				fontSizeList:[
					{fontSize:12},
					{fontSize:14},
					{fontSize:16},
					{fontSize:18},
					{fontSize:20},
					{fontSize:22},
					{fontSize:24}
				],
				defaultFontSize:16,
				themeList:[
				{name:'default',style:{
					body:{
						'color':'#000','background':'#fff'
					}
				}},
				{name:'eye',style:{
					body:{
						'color':'#000','background':'#ceeaba'
					}
				}},
				{name:'night',style:{
					body:{
						'color':'#fff','background':'#000'
					}
				}},
				{name:'gold',style:{
					body:{
						'color':'#000','background':'rgba(241,236,216)'
					}
				}}
				],
				defaultTheme:0,
				bookAvailable:false,
				navigation:''
			}
		},
		components:{
			TitleBar,
			MenuBar
		},
		methods:{
			//电子书的渲染
			showEpub(){
				this.book = new Epub(DOWNLOAD_URL);
				this.rendition = this.book.renderTo('read',{
					width: window.innerWidth,
					height: window.innerHeight
				});
				this.rendition.display();
				this.themes = this.rendition.themes;
				this.setFontSize(this.defaultFontSize);
				
				this.registerTheme();
				this.setTheme(3);
				
                this.book.ready.then(() => {
                	this.navigation = this.book.navigation;
                	return this.book.locations.generate();
                }).then(result => {
                	this.locations = this.book.locations;
                	this.bookAvailable = true;
                })
                
                var self = this;
                
                this.book.ready.then(function(){
                	self.navigation = self.book.navigation;
                	return self.book.locations.generate();
                }).then(function(result){
                	self.locations = self.book.locations;
                	self.bookAvailable = true;
                })

			},
			//上一页
			prevPage(){
				if(this.rendition){
					this.rendition.prev();
				}
			},
			//下一页
			nextPage(){
				if(this.rendition){
					this.rendition.next();
				}
			},
			//显示隐藏头和尾
			toggleTitleAndMenu(){
				this.ifShowTitleAndMenu = !this.ifShowTitleAndMenu;
				if(!this.ifShowTitleAndMenu){
					this.$refs.menuBar.hideSetting();
				}
			},
			setFontSize(fontSize){
				this.defaultFontSize = fontSize;
				if(this.themes){
					this.themes.fontSize(fontSize + 'px');
				}
			},
			registerTheme(){
				this.themeList.forEach(theme=>{
					this.themes.register(theme.name,theme.style);
				})
			},
			setTheme(index){
				this.themes.select(this.themeList[index].name);
			},
			onProgressChange(progress){
				const precentage = progress /100;
				const location = precentage > 0 ? this.locations.cfiFromPercentage(precentage) : 0;
				this.rendition.display(location);
			},
			jumpTo(href){
				this.rendition.display(href);
				this.hideTitleAndMenu();
			},
			hideTitleAndMenu(){
				this.ifShowTitleAndMenu = false;
				this.$refs.MenuBar.hideSetting();
				this.$refs.MenuBar.hideContent();
			}
		},
		mounted(){
			this.showEpub();
		}
	}
</script>


<style lang="scss" scoped>
	@import 'assets/styles/global';
	.ebook{
		position: relative;		
	}
	
	/*//*/
	
	/*//*/
	.ebook .read-wrapper .mask{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		display: flex;
	}
	.ebook .read-wrapper .mask .left{
		width: 30%;
	}
	.ebook .read-wrapper .mask .center{
		flex: 1;
	}
	.ebook .read-wrapper .mask .right{
		width: 30%;
	}
</style>