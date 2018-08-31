<template>
	<transition name="slide-down">
		<div class="menuBar"> 
			<div class="menu-wrapper" v-show="ifShowTitleAndMenu" :class="{'hideBoxShadow':ifSettingShow || !ifShowTitleAndMenu}">
				<div class="icon-wrapper" @click="showSetting(3)">
					<span class="icon-menu icon"></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(2)">
					<span class="icon-equalizer icon"></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(1)">
					<span class="icon-sun icon"></span>
				</div>
				<div class="icon-wrapper" @click="showSetting(0)">
					<span class="icon-folder-upload icon"></span>
				</div>
			</div>
			
			<div class="setting_wrapper" v-show="ifSettingShow"> 
				<!--字体的大小-->
				<div class="setting_font_size" v-if="showTag == 0">
					<div class="preview" :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</div>
					<div class="select">
						<div class="select_wrapper" v-for="(item,index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)"> 
							<div class="line"></div>
							<div class="point_wrapper">
								<div class="point" v-show="defaultFontSize === item.fontSize">
									<div class="small_point"></div>
								</div>
							</div>
							<div class="line"></div>
						</div>
					</div>
					<div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize + 'px'}">A</div>
				</div>
				<!--背景颜色-->
				<div class="setting_theme" v-else-if="showTag === 1">
					<div class="setting_theme_item" v-for="(item,index) in themeList" :key="index" @click='setTheme(index)'>
						<div class="preview" :style="{background:item.style.body.background}" :class="{'no_border':item.style.body.background == '#fff'}"></div>
						<div class="text" :class="{'selected':index == defaultTheme}">{{item.name}}</div>
					</div>
				</div>
				
				<!--进度条-->
				
				<div class="setting_progress" v-else-if="showTag === 2">
					<div class="progress_wrapper">
						<input type="range" class="progress"
											max="100"
											min="0"
											step="1"
											@change="onProgressChange($event.target.value)"
											@input="onProgressInput($event.target.value)"
											:value="progress"
											:disabled="!bookAvailable"
											ref="progress"
						/>
					</div>	
					<div class="text_wrapper">
						<span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
					</div>
				</div>				
			</div>
			
			<transition name="slide-down">
				<contentBar :ifShowContent="ifShowContent"
							v-show="ifShowContent"	
							:navigation="navigation"
							@jumpTo="jumpTo"
							:bookAvailable="bookAvailable"
				></contentBar>
			</transition>
			<div class="content_mask" v-show="ifShowContent" @click="hideContent">
			</div>
			
		</div>
	</transition>
</template>

<script>
	import contentBar from '@/components/Content';
	export default{
		props:['ifShowTitleAndMenu','fontSizeList','defaultFontSize','themeList','defaultTheme','bookAvailable','navigation'],
		components:{
			contentBar
		},
		data(){
			return{
				ifSettingShow:false,
				showTag:0,
				progress:0,
				ifShowContent:false,
			}
		},
		methods:{
			showSetting(num){				
				this.showTag = num;
				if(num == 3){
					this.ifSettingShow = false;
					this.ifShowContent = true;
				}else{
					this.ifSettingShow = true;
				}
			},
			hideSetting(){
				this.ifSettingShow = false;
			},
			setFontSize(fontSize){
				this.$emit('setFontSize',fontSize);
			},
			setTheme(index){
				this.$emit('setTheme',index);
			},
			onProgressInput(progress){
				this.progress = progress;
				this.$refs.progress.style.backgroundSize = `${this.progress} % 100`;
			},
			onProgressChange(progress){
				this.$emit('onProgressChange',progress);
			},
			hideContent(){
				this.ifShowContent = false;
			},
			jumpTo(href){
				this.$emit('jumpTo',href);
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/styles/global';
	.slide-down-enter{
		transform: translate3d(0, -100%, 0);
	}
	.slide-down-enter-to{
		transform: translate3d(0, 0, 0);
	}
	.slide-down-enter-active{
		transition: all .3s;
	}
	.menu-wrapper{
		background-color: white;
		z-index: 101;
		display: flex;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: px2rem(48);
		box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
	}
	.hideBoxShadow{
		box-shadow: none;
	}
	.menu-wrapper .icon-wrapper{
		flex: 1;
		@include center;
	}
	
	.menuBar .setting_wrapper{
		z-index: 101;
		position: absolute;
		bottom: px2rem(48);
		left: 0;
		width: 100%;
		height: px2rem(60);
		background-color: white;
		box-shadow: 0 px2rem(-8) px2rem(8) rgba(0,0,0,.15);
	}
	.menuBar .setting_wrapper .setting_font_size{
		display: flex;
		height: 100%;
	}
	.setting_wrapper .setting_font_size .preview{
		flex: 0 0 px2rem(40);
		@include center;
	}
	.setting_wrapper .setting_font_size .select{
		display: flex;
		flex: 1;
	}
	.setting_wrapper .setting_font_size .select_wrapper{
		flex: 1;
		display: flex;
		align-items: center;
		z-index: 101;
	}
	.setting_wrapper .setting_font_size .select_wrapper:first-child .line:first-child{
		border-top: none;
	}
	.setting_wrapper .setting_font_size .select_wrapper:last-child .line:last-child{
		border-top: none;
	}
	.setting_font_size .select_wrapper .line{
		flex: 1;
		height: 0;
		border-top: 1px solid #ccc;
	}
	.setting_font_size .select_wrapper .point_wrapper{
		flex: 0 0 0;
		width: 0;
		height: px2rem(7);
		border-left: px2rem(1) solid #ccc;
		position: relative;
	}
	.select_wrapper .point_wrapper .point{
		position: absolute;
		top: px2rem(-8);
		left: px2rem(-10);
		height: px2rem(20);
		width: px2rem(20);
		border-radius: 50%;
		background: white;
		border: 1px solid #ccc;
		box-shadow:  0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
		@include center;
	}
	.select_wrapper .point_wrapper .point .small_point{
		width: px2rem(5);
		height: px2rem(5);
		background: black;
		border-radius: 50%;
	}
	
	.setting_theme{
		z-index: 101;
		height: 100%;
		display: flex;
	}
	.setting_theme .setting_theme_item{
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: px2rem(5);
        box-sizing: border-box;
	}
	.setting_theme .setting_theme_item .preview{
		cursor: pointer;
		box-sizing: border-box;
		flex: 1;
	}
	.setting_theme .setting_theme_item .no_border{
		border: 1px solid #ccc;
	}	
	.setting_theme .setting_theme_item .text{
		flex: 0 0 px2rem(20);
		font-size: px2rem(14);
		color: #ccc;
		@include center;
	}
	.setting_theme .setting_theme_item .selected{
		color: #333;
	}
	
	.setting_progress{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.setting_progress .progress_wrapper{
		width: 100%;
		height: 100%;
		@include center;
		padding: 0 px2rem(30);
		box-sizing: border-box;
	}
	.setting_progress .progress_wrapper .progress{
		width: 100%;
		-webkit-appearance: none;
		height: px2rem(2);
		background: -webkit-linear-gradient(#999,#999) no-repeat,#ddd;
		background-size: 0 100%;
	}
	.setting_progress .progress_wrapper .progress:focus{
		outline: none;
	}
	.setting_progress .text_wrapper{
		width: 100%;
		text-align: center;
		font-size: px2rem(12);
		transform: translateY(-15px);
	}
	
	.content_mask{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 101;
		display: flex;
		width: 100%;
		height: 100%;
		background: rgba(51,51,51,.8);
	}
</style>