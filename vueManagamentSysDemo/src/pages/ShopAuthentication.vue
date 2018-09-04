<template>
  <div class="shopAuthentication">
    <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
           <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">店铺管理</li>
          <li class="breadcrumb-item"><a href="#">店铺认证</a></li>
        </ul>
    </div>
 
    <div class="tile mb-4">
		      <div class="page-header">
			      <div class="row">
			        <div class="col-lg-12">
			          <h2 class="mb-3 line-head" id="buttons">店铺认证</h2>
			        </div>
			        <!--col-lg-12-->
			      </div> 
			    </div>
	      <!--page-header-->
	      
          <div class="line-head">
		       <div class="row">	
		      	<div class="col-lg-9 clearfix">
		      	 <div class="title">
		      			实名认证状态
		      	 </div>
		      	 <select v-model="realName" class="mar14" style="width: 100px;">
		      			<option value="">全部</option>
		      			<option value="0">审核中</option>
		      			<option value="2">未通过</option>
		      	 </select>
			      </div>
			     </div>
			    </div>
		    <!--line-head-->
		      <!--row-->
		      
        <div class="line-head">
	      	<div class="row">
	      		<div class="col-lg-9">
        			<div class="title">
	          		店铺位置
	          	</div>
	          	<div class="mar14" data-toggle="distpicker" >
		          	<select v-model="province" class="province" style="width: 139px;">
					    	</select>
					    	<select v-model="city" class="city" style="width: 139px;">
					    	</select>
					    	<select v-model="area" class="area" style="width: 139px;">
					    	</select>
				    	</div>
        		</div>
        		<!--col-lg-9-->
	      	</div>
	      </div>
	      <!--line-head-->  
        
        
        <div class="line-head" style="margin-top: 15px;">
        	<div class="row">
        		<div class="col-lg-4 positionOrder">
        			<select v-model="userIfo" class="userIfo">
				    		<option value="phone">店长手机号</option>
				    		<option value="shopName">店铺名称</option>
			    	  </select>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_1" placeholder="请输入店长手机号" style="top: 0;left: 120px;"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_2" placeholder="请输入店铺名称" style="display: none;top: 0;left: 120px;"/>
			    	 

        		</div>
        		<!--col-lg-4-->
        		<div class="col-lg-4">
        			<a href="##" class="btn btn-primary" @click="sreachShopBtn">搜索</a> <a href="##" class="btn btn-success" v-on:click="clearAllState">初始化</a>
        		</div>
        	</div>
        </div>
        <!--line-head-->
          
          <div class="orderTable pre-scrollable">
	      	<table class="table table-striped">
	      		<thead>
	      			<tr>
		      			<td>店铺ID</td>
		      			<td>认证状态</td>
		      			<td>店铺名</td>
		      			<td>店长</td>
		      			<td>联系方式</td>
		      			<td>店铺地址</td>
		      			<td>操作</td>
		      		</tr>
	      		</thead>	
	      		<tbody>
		      		<tr class="line-head" v-for="(item,index) in shopData" :key="index">
		      			<td>{{item.storeId}}</td>
		      			<td>{{item.auditState}}</td>
		      			<td>{{item.storeName}}</td>
		      			<td>{{item.managerName}}</td>
		      			<td>{{item.phone}}</td>
		      			<td>{{item.address}}</td>
		      			<td><a href="##" @click="showShopPassEve(item)">查看</a>|<a href="##" @click="passShopEve(item)" v-show="showEditBtn">审核</a></td>
		      		</tr>
	      		</tbody>
	      	</table>
	      </div>
      <!--orderTable-->
          
          
         <!--分页-->
        <div class="row clearfix">
        <div class="col-md-9 pull-right">         
  
            <select v-model="showPageNum" style="float: left;margin: 20px 10px;height: 34px;border-radius: 5px;">
            	<option value="10">10</option>
            	<option value="20">20</option>
            </select>
            
					  <ul class="pagination" style="float: left;margin-right: 10px;">
					    <li @click="firstPage">
					      <a href="#" aria-label="Previous">
					        首页
					      </a>
					    </li>
					    <li @click="prevPage"><a href="#">上一页</a></li>
					    <li @click="nextPage"><a href="#">下一页</a></li>
					    <li @click="lastPage">
					      <a href="#" aria-label="Next">
					        尾页
					      </a>
					    </li>
					  </ul>
            
            <div style="margin-top: 21px;float: left;margin-right: 10px;">
				      <input type="text" v-model="goInputValue" class="" placeholder="" style="width: 50px;float: left;height: 30px;">
				      <span class="input-group-btn">
				        <button @click="goTo" class="btn-default" type="button" style="height: 30px;cursor: pointer;">Go!</button>
				      </span>
				    </div>
            
            <div style="display: inline-block;margin-top: 23px;font-size: 16px;">           	
            	<span>第--<strong>{{currentPage}}</strong>--页&nbsp;&nbsp;总--<strong>{{totalPage}}</strong>--页</span>           	
            </div>
        </div> 
        <!--col-md-12-->
      </div>
      <!--row-->           
          
	    </div>
	      <!--tile mb-4-->
	      
      <!--弹出权限查看或编辑-->
    
      <div class="alert alert-warning readOrEditDiv" v-show="readOrEditDiv">
			    <a href="#" class="close" @click="readOrEditDiv = false">
			        &times;
			    </a>
			    <strong>提示！</strong>&nbsp;&nbsp;&nbsp;{{alertMsg}}
			</div>
	    <!--//-->
	    
	    <!--审核区域-->
      <div class="showDiv_1" v-show="viewFlag_2">
      	<div class="replaceCon_1" style="height: 300px;">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>店铺审核</h1>
						</div>
	
	          <div class="row" style="margin-bottom: 10px;margin-top: 30px;">
	          	<div class="col-lg-3"></div>
	          	<div class="col-lg-9">
	          		<strong style="margin-right: 10px;">审核状态:</strong>
	          		<select name="" v-model="realName_2">
			      			<option value="2">审核未通过</option>
			      			<option value="1">审核通过</option>
	          		</select>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="margin-bottom: 10px;">
	          	<div class="col-lg-3"></div>
	          	<div class="col-lg-9">
	          		<strong style="margin-right: 38px;">备注:</strong>
	          		<input type="area" v-model="shopNoteIfo" style="width: 260px;height: 100px;" placeholder="请输入最少五个字符..."/>
	          	</div>
	          </div>
	          <!--row-->
	        </div> 
      		<!--//-->
      		<div class="" style="width: 120px;margin: 0 auto;">
      			<button class="btn btn-info" @click="shopEditSureBtn">确定</button>
      			<button class="btn btn-danger" @click="viewFlag_2 = !viewFlag_2">取消</button>
      		</div>
      		
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
	    
	    
	    <!--查看区域-->
      <div class="showDiv_1" v-show="viewFlag">
      	<div class="replaceCon_1" style="height: auto;">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>店铺详情</h1>
						</div>
						<div class="">
		          <div class="row">
		          	<div class="col-lg-4">
		          		店铺状态:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.storeState}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		创建时间:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.createTime}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		最后下单时间:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.xdDate}}</strong>
		          	</div>
		          </div>
		          <!--row-->
				    	
				    	<div class="row">
		          	<div class="col-lg-4">
		          		店铺ID:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.storeId}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		店名:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.name}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		联系方式:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.phone}}</strong>
		          	</div>
		          </div>
		          <!--row-->
				    	<div class="row">
		          	<div class="col-lg-4">
		          		地址:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.address}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		审核状态:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.auditState}}</strong>
		          	</div>
		          </div>
		          <!--row-->
		          <div class="row">
		          	<div class="col-lg-4">
		          		被投诉次数:<strong style="color:#6699CC ;margin-left: 5px"></strong>
		          	</div>
		          	<div class="col-lg-4">
		          		总结单数:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.ordeNum}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		总收入:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.totalNum}}</strong>
		          	</div>
		          </div>
		          <!--row-->
		          <div class="row">
		          	<div class="col-lg-4">
		          		店长ID:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.adId}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		店长姓名:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.managerName}}</strong>
		          	</div>
		          	<div class="col-lg-4">
		          		店长手机号:<strong style="color:#6699CC ;margin-left: 5px">{{shopAndBossArray.adPhone}}</strong>
		          	</div>
		          </div>
	          <!--row-->
	          </div>
	          
	          <div class="underline" style="padding: 10px;border-bottom: 1px solid #ccc;"></div>
	          <h6 style="text-align: center;margin-bottom:10px;">管理员ID--姓名--手机号</h6>
	          
	          <!--/管理员/-->
	          <div class="row">
	          	<div class="col-lg-3 text-xl-center" v-for="(item,index) in shopManagerArray" :key="index">
	          		<strong style="color:#6699CC ;margin-left: 5px">{{item.adminAdId}}--{{item.adminName}}--{{item.adminPhone}}</strong>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="underline" style="padding: 10px;border-bottom: 1px solid #ccc;"></div>
	          <h6 style="text-align: center;margin-bottom:10px;">实景图</h6>
	          
	          <div class="row">
	      			<div class="col-lg-3">
	      				<img src="" alt="实景图" class="tabImg"/>
	      			</div>
	      		</div>
	      		<!--row-->
	          
      		</div>
      		<!--//-->
      		<div class="" style="margin: 10px auto 15px auto;width: 56px;">
      			<button class="btn btn-info" @click="viewFlag = !viewFlag">确定</button>
      		</div>
      			
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
  </div>
</template>

<script>
export default {
  name: 'shopAuthentication',
  data () {
    return {
      realName:'',
      province:'',
      city:'',
      area:'',
      userIfo:'phone',
      inputSearchOrder_1:'',
      inputSearchOrder_2:'',
      shopData:[],
      showEditBtn:false,
      indexPartData:'',
      //分页相关
      showPageNum:10,
      goInputValue:'',
      currentPage:1,
      totalPage:'',
      //alert框
      readOrEditDiv:false,
      alertMsg:'',
      //权限数组
      readRoot:'',
      writeRoot:'',
      //审核显示标志
      viewFlag:false,
      viewFlag_2:false,
      realName_2:'',
      shopNoteIfo:'',
      //店长及列表信息
      shopAndBossArray:[],
      //管理员信息
      shopManagerArray:[]
    }
  },
  created:function(){
		this.initGetRoot();
		if(this.readRoot == 1){
			
			this.initShopList();
			if(this.writeRoot == 1){
				this.showEditBtn = true;
			}
			
		}else{
			this.showAlertTips(true,'没有查看权限无法获取列表信息...');
		}
	},
	methods:{
		//初始化权限
		initGetRoot:function(){
			let rootArray = localStorage.getItem('jurisdictions');
			rootArray = JSON.parse(rootArray);
			this.readRoot = rootArray[3][1];
			this.writeRoot = rootArray[3][0];
		},
		//初始化用户列表
		initShopList:function(){
			let self = this;
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_STORE_FINDATTESTORES',
				'parameters':{
					'auditState':'',
					'address':'',
					'storePhone':'',
					'storeName':'',
					'page':(this.currentPage).toString(),
					'pageNum':(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('初始化:');
				console.log(result);
				if(result.cod == '001' && result.result.storeS != ''){
					self.shopData = result.result.storeS;
					self.totalPage = result.result.storeS[0].num;
				}else{
					self.showAlertTips(true,'服务器错误,无返回结果...');
				}
			});
		},
		//查看店铺信息
		showShopPassEve:function(item){
			let self = this;
			this.viewFlag = true;
			this.indexPartData = this.shopData.indexOf(item);
			let jsonStr = JSON.stringify({
					'api':'YCADMIN_STORE_FINDADMINS',
					'parameters':{
						'storeId':this.shopData[this.indexPartData].storeId
					}
			});
			let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('查看:');
				console.log(result);
				if(result.cod = '001'){
					if(result.result.adminS != ''){
						self.shopAndBossArray = [];
	                    self.shopManagerArray = result.result.adminS;
	                    self.shopAndBossArray = Object.assign(self.shopData[self.indexPartData],result.result.storeS[0]);	
					}else{
						self.showAlertTips(true,'该店铺没有店长及管理人信息...');
						self.shopAndBossArray = [];
	                    self.shopManagerArray = [];
	                    self.shopAndBossArray = Object.assign(self.shopData[self.indexPartData],result.result.storeS[0]);
					}
				}else{
					self.showAlertTips(true,'服务器错误,请求失败...');
				}
			});
		},
		//审核事件
		passShopEve:function(item){
			this.viewFlag_2 = true;
			this.indexPartData = this.shopData.indexOf(item);
			this.clearEditEve();
		},
		//审核确认按钮
		shopEditSureBtn:function(){
			if(this.shopNoteIfo.length >= 5 && this.realName_2 != ''){
				let self = this;
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_STORE_UPDATESTOREATTESTATE',
					'parameters':{
						'auditState':(this.realName_2).toString(),
						'remake':this.shopNoteIfo,
						'storeId':this.shopData[this.indexPartData].storeId,
					}
				});
				let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('审核确定');
					console.log(result);
					if(result.cod == '001' && result.describa == '成功执行'){
				   	  	self.initShopList();
				   	}else{
				   	  	self.showAlertTips(true,'服务器错误,操作失败...');
				   	}
				});
			}else{
				this.showAlertTips(true,'主要信息填写不正确,操作失败...');
			}
			this.viewFlag_2 = false;
		},
		//清空编辑确定的事件
		clearEditEve:function(){
			this.realName_2 = '';
			this.shopNoteIfo = '';
		},
		//搜索按钮事件
		sreachShopBtn:function(){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_STORE_FINDATTESTORES',
					'parameters':{
						'auditState':(this.realName).toString(),
						'address':this.province + this.city + this.area,
						'storePhone':(this.inputSearchOrder_1).toString(),
						'storeName':this.inputSearchOrder_2,
						'page':(this.currentPage).toString(),
						'pageNum':(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('搜索:');
					console.log(result);
					if(result.cod == '001' && result.result.storeS != ''){
						self.shopData = result.result.storeS;
						self.totalPage = result.result.storeS[0].num;
					}else{
						self.shopData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		},
		//初始化按钮事件
		clearAllState:function(){
			this.realName = '';
			this.province = '';
			this.city = '';
			this.area = '';
			this.userIfo = 'phone';
			this.inputSearchOrder_1 = '';
			this.inputSearchOrder_2 = '';
		},
		//ajax获取普通数据
		ajaxGet:function(url,jsonStr,callback){
			let self = this;
			var xml = new XMLHttpRequest();
			xml.open('POST',url);
			xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xml.send('jsonStr=' + jsonStr);	
			xml.onreadystatechange = function(){
				if(xml.readyState == 4 && xml.status == 200){
					let result = JSON.parse(xml.responseText); 					
                    if(callback){
                    	callback(result);
                    }
				}
			}
		},
		//修改弹出框
		showAlertTips:function(display,word){
			this.readOrEditDiv = display;
			this.alertMsg = word;
		},
		//分页相关
		firstPage:function(){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_STORE_FINDATTESTORES',
					'parameters':{
						'auditState':(this.realName).toString(),
						'address':this.province + this.city + this.area,
						'storePhone':(this.inputSearchOrder_1).toString(),
						'storeName':this.inputSearchOrder_2,
						'page':'1',
						'pageNum':(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('首页:');
					console.log(result);
					if(result.cod == '001' && result.result.storeS != ''){
						self.shopData = result.result.storeS;
						self.totalPage = result.result.storeS[0].num;
						self.currentPage = 1;
					}else{
						self.shopData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		lastPage:function(){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_STORE_FINDATTESTORES',
					'parameters':{
						'auditState':(this.realName).toString(),
						'address':this.province + this.city + this.area,
						'storePhone':(this.inputSearchOrder_1).toString(),
						'storeName':this.inputSearchOrder_2,
						'page':(this.totalPage).toString(),
						'pageNum':(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('尾页:');
					console.log(result);
					if(result.cod == '001' && result.result.storeS != ''){
						self.shopData = result.result.storeS;
						self.totalPage = result.result.storeS[0].num;
						self.currentPage = self.totalPage;
					}else{
						self.shopData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		prevPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage > 1){
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_STORE_FINDATTESTORES',
						'parameters':{
							'auditState':(this.realName).toString(),
							'address':this.province + this.city + this.area,
							'storePhone':(this.inputSearchOrder_1).toString(),
							'storeName':this.inputSearchOrder_2,
							'page':(--this.currentPage).toString(),
							'pageNum':(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('上一页:');
						console.log(result);
						if(result.cod == '001' && result.result.storeS != ''){
							self.shopData = result.result.storeS;
							self.totalPage = result.result.storeS[0].num;
						}else{
							self.shopData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'操作错误,点也没有用...');
				}
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		nextPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage < this.totalPage){
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_STORE_FINDATTESTORES',
						'parameters':{
							'auditState':(this.realName).toString(),
							'address':this.province + this.city + this.area,
							'storePhone':(this.inputSearchOrder_1).toString(),
							'storeName':this.inputSearchOrder_2,
							'page':(++this.currentPage).toString(),
							'pageNum':(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('下一页:');
						console.log(result);
						if(result.cod == '001' && result.result.storeS != ''){
							self.shopData = result.result.storeS;
							self.totalPage = result.result.storeS[0].num;
						}else{
							self.shopData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'操作错误,点也没有用...');
				}
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		goTo:function(){
			if(this.readRoot == 1){
				if(this.currentPage >= 1 && this.currentPage <= this.totalPage){
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_STORE_FINDATTESTORES',
						'parameters':{
							'auditState':(this.realName).toString(),
							'address':this.province + this.city + this.area,
							'storePhone':(this.inputSearchOrder_1).toString(),
							'storeName':this.inputSearchOrder_2,
							'page':(this.goInputValue).toString(),
							'pageNum':(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('搜索:');
						console.log(result);
						if(result.cod == '001' && result.result.storeS != ''){
							self.shopData = result.result.storeS;
							self.totalPage = result.result.storeS[0].num;
							self.currentPage = self.goInputValue;
						}else{
							self.shopData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'操作错误,点也没有用...');
				}
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		}
	},
	watch:{
		//部门
		userIfo:function(newValue,oldValue){
			if(newValue == 'shopName'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'none';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'block';
			}
			if(newValue == 'phone'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'block';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'none';
			}
		},
		showPageNum:function(newValue,oldValue){
			if(this.readRoot == 1){
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_STORE_FINDATTESTORES',
					'parameters':{
						'auditState':(this.realName).toString(),
						'address':this.province + this.city + this.area,
						'storePhone':(this.inputSearchOrder_1).toString(),
						'storeName':this.inputSearchOrder_2,
						'page':(this.currentPage).toString(),
						'pageNum':newValue.toString()
					}
				});
				let url = 'http://192.168.1.57:8080/ycadminStore/ycadminStore.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('搜索:');
					console.log(result);
					if(result.cod == '001' && result.result.storeS != ''){
						self.shopData = result.result.storeS;
						self.totalPage = result.result.storeS[0].num;
					}else{
						self.shopData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		}
	}
}
</script>


<style scoped>
.title{
  float: left;
  margin: 0px 10px;
  line-height: 46px;
  font-size: 20px;
}
.mar14{
  margin-top: 14px;
}
.orderTable table{
  min-width: 120%;
}
</style>
