<template>
  <div class="pos">
    <el-row>
			<el-col :span="7" class="pos-order" id="order-list">
				
				<el-tabs>
					<el-tab-pane label="点餐">
						
						<el-table :data="tableData">
							<el-table-column prop="goodsName" label="商品名称"> </el-table-column> 
							<el-table-column prop="count" label="数量"> </el-table-column>
							<el-table-column prop="price" label="金额"> </el-table-column></el-table-column>
							<el-table-column label="操作">
								<template scope="scope">
									<el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
									<el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
								</template>
							</el-table-column>						
						</el-table>
					
					<div class="totalDiv">
						<small>数量:</small>{{totalCount}}  &nbsp;&nbsp;&nbsp;<small>金额:</small>{{totalMoney}}元
					</div>
					
					<div class="divBtn">
						<el-button type="warning">挂单</el-button>
						<el-button type="danger" @click="delAllGoods">删除</el-button>
						<el-button type="success" @click="checkout">结账</el-button>
					</div>
					
					
					</el-tab-pane>
					<el-tab-pane label="挂单">
						
						挂单
						
					</el-tab-pane>
					<el-tab-pane label="外卖">
						
						外卖
						
					</el-tab-pane>
				</el-tabs>
				
				
				
			</el-col>
			<el-col :span="17">
				<div class="often-goods">
					<div class="title">常用商品</div>
					<div class="often-goods-list">
						<ul>
							<li v-for="goods in oftenGoods" @click="addOrderList(goods)">
								<span>{{goods.goodsName}}</span>
								<span class="o-price">${{goods.price}}</span>
							</li>
						</ul>
					</div>
				</div>
				
				<div class="goods-type">
					<el-tabs>
						<el-tab-pane label="汉堡">
							
							<div>
								<ul class="cookList">
									<li v-for="goods in type0Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img :src="goods.goodsImg" height="75px" alt=""></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">${{goods.price}}</span>
									</li>
								</ul>
							</div>
							
						</el-tab-pane>
						<el-tab-pane label="小食">
							<div>
								<ul class="cookList">
									<li v-for="goods in type1Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img :src="goods.goodsImg" height="75px" alt=""></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">${{goods.price}}</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="饮料">
							<div>
								<ul class="cookList">
									<li v-for="goods in type2Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img :src="goods.goodsImg" height="75px" alt=""></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">${{goods.price}}</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
						<el-tab-pane label="套餐">
							<div>
								<ul class="cookList">
									<li v-for="goods in type3Goods" @click="addOrderList(goods)">
										<span class="foodImg"><img :src="goods.goodsImg" height="75px" alt=""></span>
										<span class="foodName">{{goods.goodsName}}</span>
										<span class="foodPrice">${{goods.price}}</span>
									</li>
								</ul>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'pos', 
	data(){
		return{
			tableData:[
// 			{goodsName:'可口可乐',price:8,count:1},
// 			{goodsName:'香辣鸡腿堡',price:15,count:1},
// 			{goodsName:'爱心薯条',price:8,count:1},
// 			{goodsName:'甜筒',price:8,count:1}
			],
			oftenGoods:[
// 			{goodsId:1,goodsName:'香辣鸡腿堡',price:18},
// 			{goodsId:2,goodsName:'田园鸡腿堡',price:15},
// 			{goodsId:3,goodsName:'和风汉堡',price:15},
// 			{goodsId:4,goodsName:'快乐全家桶',price:80},
// 			{goodsId:5,goodsName:'脆皮鸡腿堡',price:10},
// 			{goodsId:6,goodsName:'魔法鸡块',price:20},
// 			{goodsId:7,goodsName:'可乐大杯',price:10},
// 			{goodsId:8,goodsName:'雪顶咖啡',price:18},
// 			{goodsId:9,goodsName:'肥宅快乐水',price:3},
// 			{goodsId:10,goodsName:'肥宅鸡柳',price:17}
			],
			type0Goods:[
// 			{goodsId:1,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg',goodsName:'香辣鸡腿堡',price:18},
// 			{goodsId:2,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg',goodsName:'田园鸡腿堡',price:15},
// 			{goodsId:3,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg',goodsName:'和风汉堡',price:15},
// 			{goodsId:4,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg',goodsName:'快乐全家桶',price:80},
// 			{goodsId:5,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos002.jpg',goodsName:'脆皮鸡腿堡',price:10},
// 			{goodsId:6,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg',goodsName:'魔法鸡块',price:20},
// 			{goodsId:7,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos004.jpg',goodsName:'可乐大杯',price:10},
// 			{goodsId:8,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg',goodsName:'雪顶咖啡',price:18},
// 			{goodsId:9,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos003.jpg',goodsName:'肥宅快乐水',price:3},
// 			{goodsId:10,goodsImg:'http://7xjyw1.com1.z0.glb.clouddn.com/pos001.jpg',goodsName:'肥宅鸡柳',price:17}
			],
			type1Goods:[],
			type2Goods:[],
			type3Goods:[],
			totalMoney:0,
			totalCount:0
			
		}
	},
	created:function(){
		//后台获得常点商品
		axios.get('http://jspang.com/DemoApi/oftenGoods.php')
		.then(reponse => {
			console.log(reponse.data);
			this.oftenGoods = reponse.data;
		})
		.catch(error => {
			console.log(error);
		})
		
		//后台获得四种商品
		axios.get('http://jspang.com/DemoApi/typeGoods.php')
      .then(response => {
      //console.log(response);
      //this.oftenGoods=response.data;
      this.type0Goods = response.data[0];
      this.type1Goods = response.data[1];
      this.type2Goods = response.data[2];
      this.type3Goods = response.data[3];
      })
      .catch(error => {
        console.log(error);
        alert('网络错误，不能访问');
    })
		
	},
	mounted:function(){
		var orderHeight = document.body.clientHeight;
		document.getElementById("order-list").style.height = orderHeight + 'px';
	},
	methods:{
		//添加点餐商品
		addOrderList(goods){		
			this.totalMoney = 0;
			this.totalCount = 0;
			//商品是否已经存在于订单列表
			let isHave = false;
			for(let i=0; i<this.tableData.length;i++){
				if(this.tableData[i].goodsId == goods.goodsId){
					isHave = true;
				}
			}		
			//根据判断的值编写业务逻辑
			if(isHave){
				//改变列表中商品的数量
				let arr = this.tableData.filter(a=>a.goodsId == goods.goodsId);
				arr[0].count ++;
			}else{
				let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
				this.tableData.push(newGoods);
			}		
				this.getAllMoney();	
		},
		delSingleGoods(goods){
			this.tableData = this.tableData.filter(a=>a.goodsId != goods.goodsId);
			this.getAllMoney();
		},
		delAllGoods(){
			this.tableData = [];
			this.totalMoney = 0;
			this.totalCount = 0;
		},
		//模拟结账
		checkout(){		
			if(this.totalCount != 0){
				this.delAllGoods();
				this.$message({
					message:'结账成功,继续努力!!!',
					type:'success'
				});
			}else{
				this.$message.error('不能空结,请点餐!!!	');
			}
		},
		//汇总金额和数量
		getAllMoney(){
			this.totalMoney = 0;
			this.totalCount = 0;
			if(this.tableData){
				//计算汇总价格和数量
				this.tableData.forEach((ele)=>{
					this.totalCount += ele.count;
					this.totalMoney = this.totalMoney+(ele.price*ele.count);
				})	
			}
		}
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos-order{
		background-color: #f9fafc;
		border-right: 1px solid #c0ccda;
	}
	
	.divBtn{
		margin-top: 10px;
	}
	
	.title{
		height: 20px;
		border-bottom: 1px solid #d3dce6;
		background-color: #f9fafc;
		padding: 10px;
		text-align: left;
	}
	.often-goods-list ul li{
		list-style: none;
		float: left;
		border: 1px solid #e5e9f2;
		padding: 10px;
		margin: 10px;
		background-color: #fff;
		cursor: pointer;
	}
	.o-price{
		color: #58b7ff;
	}
	.goods-type{
		clear:both;
	}
	.cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
    cursor: pointer;
}
.cookList li span {
    display: block;
    float: left;
		text-align: left;
}
.foodImg {
    width: 40%;
}
.foodName {
    font-size: 18px;
    padding-left: 10px;
    color: brown;
		width: 50%;
}
.foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
}

.totalDiv{
	background-color: #fff;
	padding: 10px;
	border-bottom: 1px solid #;
}
</style>
