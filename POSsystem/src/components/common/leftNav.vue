<template>
	<div class="left-nav">
		<ul>
			<li>
				<i class="icon iconfont icon-wodezichan"></i>
				<div>收银</div>
			</li>
			<li>
				<i class="icon iconfont icon-jinrudianpu"></i>
				<div>店铺</div>
			</li>
			<li>
				<i class="icon iconfont icon-hanbao"></i>
				<div>商品</div>
			</li>
			<li>
				<i class="icon iconfont icon-31huiyuanqia"></i>
				<div>会员</div>
			</li>
			<li>
				<i class="icon iconfont icon-zhubaoshipin"></i>
				<div>统计</div>
			</li>
			<li>
				<i class="icon iconfont icon-31shezhi"></i>
				<div>设置</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style>
	.left-nav{
		color: #fff;
		font-size: 10px;
		height: 100%;
		background-color: #1d8ce0;
		float: left;
		width: 76px;
		position: fixed;
		top: 0;
		left: 0;
	}
	.iconfont{
		font-size: 24px;
	}
	.left-nav ul{
		padding: 0;
		margin: 0;
	}
	.left-nav ul li{
		list-style: none;
		text-align: center;
		border-bottom: 1px solid #20a0ff;
		padding: 10px;
	}
</style>