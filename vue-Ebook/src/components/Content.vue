<template>
		<div class="content">
			<div class="content_wrapper" v-if="bookAvailable">
				<div class="content_item" v-for="(item,index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
					<span class="text">{{item.label}}</span>
				</div>
			</div>
			<div class="empty" v-else>加载中...</div>
		</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:['ifShowContent','navigation','bookAvailable'],
		methods:{
			jumpTo(target){
				this.$emit('jumpTo',target);
				this.$refs.MenuBar.hideContent();
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/styles/global";
	.content{
		position: absolute;
		top: 0;
		left: 0;
		width: 80%;
		height: 100%;
		background: white;
		z-index: 102;
	}
	.content .content_wrapper{
		height: 100%;
		width: 100%;
		overflow: auto;
	}
	.content .content_wrapper .content_item{
		padding: px2rem(20) px2rem(15);
		border-bottom: 1px solid #f4f4f4;
	}
	.content .content_wrapper .content_item .text{
		font-size: px2rem(14);
		color: #333;
	}
	.empty{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: px2rem(7);
		font-size: px2rem(14);
		
	}
</style>