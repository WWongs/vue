<template>
	<transition name="slide-down">
		<div class="title-wrapper" v-show="ifShowTitleAndMenu">
			<div class="left">
				<span class="icon-arrow-left2 icon"></span>
			</div>
			<div class="right">
				<div class="icon-wrapper">
					<span class="icon-cart icon"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-user icon"></span>
				</div>
				<div class="icon-wrapper">
					<span class="icon-cog icon"></span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default{
		props:['ifShowTitleAndMenu']
	}
</script>

<style lang="scss">
	@import '../assets/styles/global';
	.title-wrapper{
		background-color: white;
		z-index: 101;
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: px2rem(48);
		box-shadow: 0 px2rem(8) px2rem(8) rgba(0,0,0,.15);
	}
	.title-wrapper .left{
		flex: 0 0 px2rem(60);
		@include center;
	}
	.title-wrapper .right .icon-wrapper{
		flex: 0 0 px2rem(40);
		@include center;
	}
	.title-wrapper .right{
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
</style>