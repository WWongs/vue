<template>
  <div class="orderList">
    <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
           <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">订单管理</li>
          <li class="breadcrumb-item"><a href="#">订单列表</a></li>
        </ul>
    </div>
 
    <div class="tile mb-4">
        <div class="page-header">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="mb-3 line-head" id="buttons">订单列表</h2>
            </div>
            <!--col-lg-12-->
          </div> 
        </div>
        <!--page-header-->
        <div class="line-head">
        <div class="row">
        	
          <div class="col-lg-3 clearfix">
          	<!--//-->
          	<div class="title">
          		订单状态
          	</div>
          	<select v-model="orderState" class="orderState">
          		<option value="">全部</option>
			    		<option value="0">待确认</option>
			    		<option value="1">已接单</option>
			    		<option value="2">已取消</option>
			    		<option value="3">已拒单</option>
			    		<option value="4">已完成</option>
			    		<option value="5">已评价</option>
			    	</select>
          	<!--//-->
          </div>
          <div class="col-lg-9 clearfix">
          	<!--//-->
          	<div class="title">
          		店铺位置
          	</div>
          	<div class="" data-toggle="distpicker" id="distpicker">
	          	<select v-model="province" class="province" style="width: 139px;">
				</select>
				<select v-model="city" class="city" style="width: 139px;">
				</select>
				<select v-model="area" class="area" style="width: 139px;">
				</select>
			</div>
          	<!--//-->
          </div>
         </div>
          <!--row-->
        </div>
        <!--line-head-->
        
        <div class="line-head">
        	<div class="row">
        		
        		<div class="col-lg-12">
        			<div class="title">
          		下单时间
          	 </div>
          	  	<div class="" style="margin-top: 7px;float: left;">
          	  		<input style="width: 150px;" id="datepicker" type="text" v-model="beginData" class="form-control" data-zdp_readonly_element="false">
          	  	</div>
          	  	<div style="margin: 14px 5px 0 5px;float: left;">
          	  		<strong>至</strong>
          	  	</div>
          	  	<div class="" style="margin-top: 7px;float: left;">
          	  		<input style="width: 150px;" id="datepicker_1" type="text" v-model="endData" class="form-control" data-zdp_readonly_element="false">
          	  	</div>
        		</div>
        		<!--col-lg-12-->
        	</div>
        	<!--row-->
        </div>
        <!--line-head-->
        
        <div class="line-head">
        	<div class="row">
        		<div class="col-lg-12">
							<div class="title">
								金额
							</div>
							<!--title-->
							<div class="mar14">
							  <input v-model="searchPrice_1" type="text" name="" id="" value="" placeholder="元" style="width: 80px;margin-left: 5px;margin-right: 5px;"/>
							  至
							  <input v-model="searchPrice_2" type="text" placeholder="元" style="width: 80px;margin-left: 5px;margin-right: 5px;"/>
							</div>
							
        		</div>
        		<!--col-lg-4-->
        		<div class="col-lg-4 positionOrder">
        			<select v-model="userIfo" class="userIfo">
				    		<option value="phone">用户手机号</option>
				    		<option value="storePhone">店铺手机号</option>
			    	  </select>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_1" placeholder="请输入手机号" style="left: 120px;"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_2" placeholder="请输入店铺手机号" style="display: none;left: 120px;"/>
			    	
        		</div>
        		<div class="col-lg-4">
        			<a href="##" class="btn btn-primary" @click="searchUserList">搜索</a>       			
			    	  <button v-on:click="clearAllSearch" class="btn btn-info">初始化</button>
        		</div>
        		<!--col-lg-8-->
        	</div>
        	<!--row-->
        </div>
        <!--line-head-->
        
        <div class="orderTable pre-scrollable">
	      	<table class="table table-striped">
	      		<thead>
	      			<tr>
		      			<td>订单ID</td>
		      			<td>用户名</td>
		      			<td>订单状态</td>
		      			<td>下单时间</td>
		      			<td>预约时间</td>
		      			<td>用户手机号</td>
		      			<td>邮箱</td>
		      			<td>店铺号码</td>
		      			<td>卓次</td>
		      			<td>人数</td>
		      			<td>订单内容</td>
		      			<td>总价</td>
		      			<td>预约价</td>
		      			<td>操作</td>
		      		</tr>
	      		</thead>	
	      		<tbody>
		      		<tr class="line-head" v-for="(item,index) in orderData" :key="index">
		      			<td>{{item.orId}}</td>
		      			<td>{{item.userName}}</td>
		      			<td>{{item.state}}</td>
		      			<td>{{item.xdDate}}</td>
		      			<td>{{item.orDate}}</td>
		      			<td>{{item.phone}}</td>
		      			<td>{{item.eMail}}</td>
		      			<td>{{item.storePhone}}</td>
		      			<td>{{item.tabNum}}</td>
		      			<td>{{item.peopleNum}}</td>
		      			<td>{{item.dishes}}</td>
		      			<td>{{item.total}}</td>
		      			<td>{{item.reserve}}</td>
		      			<td><a href="##" @click="putOrderItem_2(item)" v-show="ifShowEdit">编辑</a>|<a href="##" @click="putOrderItem(item)">查看</a></td>
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

	  
	  <!--查看区域-->
      <div class="showDiv" v-show="showFlag" v-for="(item,index) in orderData_copy" :key="index">
      	<div class="replaceCon">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>订单详情列表</h1>
						</div>
						<div class="row">
							<div class="col-lg-12">
									<strong style="margin-left: 26px;">你的订单状态：<strong style="color:#6699CC ;">{{orderData_copy.state}}</strong></strong>
							</div>
						</div>
      			
      			<div class="row line-head mar20">
      				<div class="col-lg-4">
      					<h6>
		          		订单号:<strong style="color:#6699CC ;">{{orderData_copy.orId}}</strong>
		          	</h6>
      				</div>
      				<div class="col-lg-4">
      					<h6>
		          		下单时间:<strong style="color:#6699CC ;">{{orderData_copy.xdDate}}</strong>
		          	</h6>
      				</div>
      				<div class="col-lg-4">
      					<h6>
		          		预约时间:<strong style="color:#6699CC ;">{{orderData_copy.orDate}}</strong>
		          	</h6>
      				</div>
      			</div>
      			<!--row-->
			    	<!--container-->
			    	
			    	<div class="row mar20">
			    		<div class="col-lg-4">
      					<h6>
		          		用户ID:<strong style="color:#6699CC ;">{{orderData_copy.userId}}</strong>
		          	</h6>
      				</div>
      				<div class="col-lg-4">
      					<h6>
		          		用户名:<strong style="color:#6699CC ;">{{orderData_copy.userName}}</strong>
		          	</h6>
      				</div>
      				<div class="col-lg-4">
      					<h6>
		          		手机号:<strong style="color:#6699CC ;">{{orderData_copy.phone}}</strong>
		          	</h6>
      				</div>
			    	</div>
			    	<!--row-->
			    	
			    	<div class="row mar20">
			    		<div class="col-lg-4">
      					<h6>
		          		店铺ID:<strong style="color:#6699CC ;">{{orderData_copy.storeId}}</strong>
		          	</h6>
      				</div>
      				<div class="col-lg-4">
      					<h6>
		          		店铺名:<strong style="color:#6699CC ;">{{orderData_copy.storeName}}</strong>
		          	</h6>
      				</div>
      				<div class="col-lg-4">
      					<h6>
		          		店铺联系方式:<strong style="color:#6699CC ;">{{orderData_copy.storePhone}}</strong>
		          	</h6>
      				</div>
			    	</div>
			    	<!--row-->
			    	
			    	<div class="row mar20">
			    		<div class="col-lg-12">
      					<h6>
		          		卓次/人数: &nbsp;&nbsp;<strong style="color:#6699CC ;">第{{orderData_copy.tabNum}}桌</strong>---<strong style="color:#6699CC ;">共{{orderData_copy.peopleNum}}人</strong>
		          	</h6>
      			</div>
			    	</div>
			    	<!--row-->
			    	
			    	<div class="row mar20">
			    		<div class="col-lg-12">
      					<h6>
		          		预定内容: <strong style="color:#6699CC ;">{{orderData_copy.dishes}}</strong>
		          	</h6>
      			</div>
			    	</div>
			    	<!--row-->
			    	
			    	<div class="row mar20">
			    		<div class="col-lg-12">
      					<h6>
		          		预定金/总价: &nbsp;&nbsp;预定金:<strong style="color:#6699CC ;">{{orderData_copy.reserve}}</strong>&nbsp;&nbsp;总价:<strong style="color:#6699CC ;">{{orderData_copy.total}}</strong>
		          	</h6>
      			</div>
			    	</div>
			    	<!--row-->
			    	 
			    	 <div class="row mar20">
			    		<div class="col-lg-12">
      					<h6>
		          		备注: &nbsp;&nbsp;<strong style="color:#6699CC ;">{{orderData_copy.remark}}</strong>
		          	</h6>
      			</div>
			    	</div>
			    	<!--row-->
			    	 
      		</div>
      		<!--//-->
      		<div class="" style="width: 123px;margin: 10px auto 0 auto;">
      			<!--<button class="btn btn-info" v-on:click="sureBtn" style="float: left;margin-right: 10px;">确定</button>-->
      			<button class="btn btn-danger" @click="showFlag = false">确定</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
      
      <!--//编辑的区域-->
      <div class="showDiv_1" v-show="showFlag_2">
      	<div class="replaceCon">
      		<div class="container">
      			<div class="page-header text-center">
					<h1>订单编辑详情</h1>
				</div>
      			<div class="row">
      				<div class="col-lg-12 clearfix">
		          	<!--//-->
		          	<div class="" style="float: left;margin-top: 14px;">
		          		<strong style="margin-left: 26px;margin-right: 5px;">要修改的订单状态</strong>
		          	</div>
		          	<select v-model="orderState_copy" class="orderState orderState_1">
						<option value="0">待确认</option>
						<option value="1">已接单</option>
						<option value="2">已取消</option>
						<option value="3">已拒单</option>
						<option value="4">已完成</option>
						<option value="5">已评价</option>
					</select>
					    	
		          	<!--//-->
		          </div>
      			</div>
      			<div class="row" style="margin-top: 20px;">
      				<div class="col-lg-12">
      					<strong style="margin-left: 23px;">备注:</strong>
      					<input type="area" v-model="editAreaInput" placeholder="请输入最少五个字..." style="width: 400px;height: 100px;"/>
      				</div>
      				<div class="col-lg-12">
      					<div class="" style="margin: 200px auto 0 auto;width: 126px;">
			      			<button class="btn btn-info" v-on:click="sureBtn" style="margin-right: 11px;">确定</button>
			      			<button class="btn btn-danger" @click="showFlag_2 = false">取消</button>
			      		</div>
      				</div>
      			</div>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->



      <!--弹出权限查看或编辑-->
    
      <div class="alert alert-warning readOrEditDiv" v-show="readOrEditDiv">
			    <a href="#" class="close" @click="readOrEditDiv = false">
			        &times;
			    </a>
			    <strong>提示！</strong>&nbsp;&nbsp;&nbsp;{{alertMsg}}
			</div>
    
      <!--//-->

  </div>
</template>

<script>
// import '../assets/styles/distpicker.js'
export default {
  name: 'orderList',
  data () {
    return {
      orderState:'',//订单管理
      orderState_copy:'',
      province:'',     //省
      city:'',         //市
      area:'',         //区
      //开始结束年份
      beginData:'',
      endData:'',
      userIfo:'phone',         //搜索的关键字
      inputSearchOrder_1:'',//搜索输入框中的值
      inputSearchOrder_2:'',
      inputSearchOrder_3:'',
      editAreaInput:'',        //编辑区域输入框的值
      showFlag:false,          //是否显示查看提示框更改数据
      showFlag_2:false,        
      orderData:[],
      orderData_copy:[],
      orderItemIndex:'',
      searchPrice_1:'',
      searchPrice_2:'',
      rootArray:[],
      ifShowEdit:false,		
          //页码
      showPageNum:10,
      currentPage:1,
      totalPage:'',
      goInputValue:'',
      //查看或编辑权限
      readOrEditRoot:true,
      alertMsg:'',
      readOrEditDiv:false
    }
  },
  created:function(){
    this.initGetRoot();   //得到权限
    if(this.rootArray[1][1] === 1){  //判断查看权限
      this.initOrderList();      
      if(this.rootArray[1][0] === 1){   //判断编辑权限
        this.ifShowEdit = true;
      }else{
        this.showAlertTips(true,'您没有编辑权限...');
      }
    }else{
      this.showAlertTips(true,'您没有查看权限...');
    }  
  },
  methods:{
		//初始化订单列表
		initOrderList:function(){
			let self = this;
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_ORDE_FINDORDES',
				'parameters':{
					'state':'',
					'address':'',
					'xdIndexdate':'',
					'xdEnddate':'',
					'indextotal':'',
					'endtotal':'',
					'phone':'',
					'storePhone':'',
					'page':(this.currentPage).toString(),
					'pageNum':(this.showPageNum).toString()			
				}
			});
			let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
            this.ajaxGet(url,jsonStr,function(result){
            	console.log('初始化:');
            	console.log(result);
            	if(result.cod == '001' && result.result.ordes != ''){
            		self.orderData = result.result.ordes;
	                self.totalPage = self.orderData[0].num;
            	}else{
            		self.showAlertTips(true,'服务器错误,无法获取数据...');
            	}
            });
		},
		//初始化权限
		initGetRoot:function(){
			let rootArray = localStorage.getItem('jurisdictions');
			rootArray = JSON.parse(rootArray);
			this.rootArray = rootArray;
		},
		//搜索按钮事件
		searchUserList:function(){
			if(this.rootArray[1][1] === 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
				'api':'YCADMIN_ORDE_FINDORDES',
				'parameters':{
					'state':(this.orderState).toString(),
					'address':this.province+this.city+this.area,
					'xdIndexdate':this.beginData,
					'xdEnddate':this.endData,
					'indextotal':(this.searchPrice_1).toString(),
					'endtotal':(this.searchPrice_2).toString(),
					'phone':$.trim(this.inputSearchOrder_1),
					'storePhone':$.trim(this.inputSearchOrder_2),
					'page':(this.currentPage).toString(),
					'pageNum':(this.showPageNum).toString()			
				}
			}); 	
			let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('搜索:');
            	console.log(result);
            	if(result.cod == '001' && result.result.ordes != ''){
            		self.orderData = result.result.ordes;
	                self.totalPage = self.orderData[0].num;
            	}else{
            		self.orderData = [];
            		self.showAlertTips(true,'该条件无返回结果...');
            	}
			});
			}else{
				this.showAlertTips(true,'点也没有用，您没有查看权限...');
			}
		},
		//清空所有查询条件
		clearAllSearch:function(){
			this.orderState = '';
			this.province = '';  
			this.city = '';         
			this.area = '';         
			this.userIfo = 'phone';         
			this.inputSearchOrder_1 = '';
			this.inputSearchOrder_2 = '';
			this.searchPrice_1 = '';
			this.searchPrice_2 = '';
			this.beginData = '';
			this.endData = '';
			this.clearDataValue();
		},
		//查看区域的得到item下标
		putOrderItem:function(item){
			this.showFlag = !this.showFlag;
			this.orderItemIndex = this.orderData.indexOf(item);
			this.orderData_copy = item;
		},
		//编辑区域的得到item下标
		putOrderItem_2:function(item){
			this.showFlag_2 = !this.showFlag_2;
			this.orderItemIndex = this.orderData.indexOf(item);
			this.clearEditEve();
		},
		//查看修改的确定 
		sureBtn:function(){
			let self = this;
			this.showFlag_2 = !this.showFlag_2;
			if(this.editAreaInput.length >= 5 && this.orderState_copy != ''){				
				let jsonStr = JSON.stringify({
				'api':'YCADMIN_ORDE_UPDATESTATE',
				'parameters':{
					'ordeId':this.orderData[this.orderItemIndex].orId,
					'state':this.orderState_copy,
					'remark':this.editAreaInput
				   }
			  }); 		
			   let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
			   this.ajaxGet(url,jsonStr,function(result){
			   	  console.log('确定编辑:');
			   	  console.log(result);
			   	  if(result.cod == '001' && result.describa == '成功执行'){
			   	  	self.initOrderList();
			   	  }else{
			   	  	self.showAlertTips(true,'服务器错误,操作失败...');
			   	  }
			   });
			}else{
				this.showAlertTips(true,'信息填写不正确,操作失败...');
			}
		},
		//清空确定的值
		clearEditEve:function(){
			this.orderState_copy = '';
			this.editAreaInput = '';
		},
		//得到日期的值
		getDataValue:function(){
			let beginData = $("#datepicker").val();
			let endData = $("#datepicker_1").val();
			if(beginData != '' && endData != ''){
				this.beginData = beginData;
				this.endData = endData;
			}else{
				this.beginData = '';
				this.endData = '';
			}
		},
		//得到消费金额的值
		getPriceValue:function(){
			if(this.searchPrice_1 && this.searchPrice_2){
				this.searchPrice_1 = this.searchPrice_1;
				this.searchPrice_2 = this.searchPrice_2;
			}else{
				this.searchPrice_1 = '';
				this.searchPrice_2 = '';
			}
		},
		//初始化日期的值
		clearDataValue:function(){
			$("#datepicker").val('');
			$("#datepicker_1").val('');
		},
		//ajax获取
		ajaxGet:function(url,jsonStr,callback){
			let self = this;
			var xml = new XMLHttpRequest();
			xml.open('POST',url);
			xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xml.send('jsonStr=' + jsonStr);	
			xml.onreadystatechange = function(){
				if(xml.readyState == 4 && xml.status == 200){
					var result = JSON.parse(xml.responseText);                  
                    if(callback){
                       callback(result);
                    }
				}
			}
		},
		//首页
		firstPage:function(){
			if(this.rootArray[1][1] === 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_ORDE_FINDORDES',
					'parameters':{
						'state':(this.orderState).toString(),
						'address':this.province+this.city+this.area,
						'xdIndexdate':this.beginData,
						'xdEnddate':this.endData,
						'indextotal':(this.searchPrice_1).toString(),
						'endtotal':(this.searchPrice_2).toString(),
						'phone':$.trim(this.inputSearchOrder_1),
						'storePhone':$.trim(this.inputSearchOrder_2),
						'page':'1',
						'pageNum':(this.showPageNum).toString()			
					}
				}); 
				let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
			    this.ajaxGet(url,jsonStr,function(result){
					console.log('搜索:');
	            	console.log(result);
	            	if(result.cod == '001' && result.result.ordes != ''){
	            		self.orderData = result.result.ordes;
		                self.totalPage = self.orderData[0].num;
		                self.currentPage = 1;
	            	}else{
	            		self.orderData = [];
	            		self.showAlertTips(true,'该条件无返回结果...');
	            	}
				});
			}else{
				this.showAlertTips(true,'点也没有用，您没有查看功能...');
			}
		},
		//尾页
		lastPage:function(){
			if(this.rootArray[1][1] === 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_ORDE_FINDORDES',
					'parameters':{
						'state':(this.orderState).toString(),
						'address':this.province+this.city+this.area,
						'xdIndexdate':this.beginData,
						'xdEnddate':this.endData,
						'indextotal':(this.searchPrice_1).toString(),
						'endtotal':(this.searchPrice_2).toString(),
						'phone':$.trim(this.inputSearchOrder_1),
						'storePhone':$.trim(this.inputSearchOrder_2),
						'page':(this.totalPage).toString(),
						'pageNum':(this.showPageNum).toString()			
					}
				}); 
				let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
			    this.ajaxGet(url,jsonStr,function(result){
					console.log('搜索:');
	            	console.log(result);
	            	if(result.cod == '001' && result.result.ordes != ''){
	            		self.orderData = result.result.ordes;
		                self.totalPage = self.orderData[0].num;
		                self.currentPage = self.totalPage;
	            	}else{
	            		self.orderData = [];
	            		self.showAlertTips(true,'该条件无返回结果...');
	            	}
				});
			}else{
				this.showAlertTips(true,'点也没有用，您没有查看功能...');
			}
		},
		//上一页
		prevPage:function(){
			if(this.rootArray[1][1] === 1){
				if(this.currentPage > 1){
					let self = this;
					this.getDataValue();
					this.getPriceValue();
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_ORDE_FINDORDES',
						'parameters':{
							'state':(this.orderState).toString(),
							'address':this.province+this.city+this.area,
							'xdIndexdate':this.beginData,
							'xdEnddate':this.endData,
							'indextotal':(this.searchPrice_1).toString(),
							'endtotal':(this.searchPrice_2).toString(),
							'phone':$.trim(this.inputSearchOrder_1),
							'storePhone':$.trim(this.inputSearchOrder_2),
							'page':(--this.currentPage).toString(),
							'pageNum':(this.showPageNum).toString()			
						}
					}); 
					console.log(jsonStr);
				    let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
				    this.ajaxGet(url,jsonStr,function(result){
						console.log('搜索:');
		            	console.log(result);
		            	if(result.cod == '001' && result.result != ''){
		            		self.orderData = result.result.ordes;
			                self.totalPage = result.result.ordes[0].num;
		            	}else{
		            		self.orderData = [];
		            		self.showAlertTips(true,'该条件无返回结果...');
		            	}
					});
			    }else{
			    	this.showAlertTips(true,'传输的页码错误,操作失败...');
			    }
			}else{
				this.showAlertTips(true,'点也没有用，您没有查看权限...');
			}
		},
		//下一页
		nextPage:function(){
			if(this.rootArray[1][1] === 1){
				if(this.currentPage < this.totalPage){
					let self = this;
					this.getDataValue();
					this.getPriceValue();
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_ORDE_FINDORDES',
						'parameters':{
							'state':(this.orderState).toString(),
							'address':this.province+this.city+this.area,
							'xdIndexdate':this.beginData,
							'xdEnddate':this.endData,
							'indextotal':(this.searchPrice_1).toString(),
							'endtotal':(this.searchPrice_2).toString(),
							'phone':$.trim(this.inputSearchOrder_1),
							'storePhone':$.trim(this.inputSearchOrder_2),
							'page':(++this.currentPage).toString(),
							'pageNum':(this.showPageNum).toString()			
						}
					}); 
				    let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
				    this.ajaxGet(url,jsonStr,function(result){
						console.log('搜索:');
		            	console.log(result);
		            	if(result.cod == '001' && result.result.ordes != ''){
		            		self.orderData = result.result.ordes;
			                self.totalPage = self.orderData[0].num;
		            	}else{
		            		self.orderData = [];
		            		self.showAlertTips(true,'该条件无返回结果...');
		            	}
					});
			   }else{
			   	    this.showAlertTips(true,'传输的页码错误,操作失败...');
			   }
			}else{
				this.showAlertTips(true,'点也没有用，您没有查看权限...');
			}
		},
		//跳转至
		goTo:function(){
			if(this.rootArray[1][1] === 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_ORDE_FINDORDES',
					'parameters':{
						'state':(this.orderState).toString(),
						'address':this.province+this.city+this.area,
						'xdIndexdate':this.beginData,
						'xdEnddate':this.endData,
						'indextotal':(this.searchPrice_1).toString(),
						'endtotal':(this.searchPrice_2).toString(),
						'phone':$.trim(this.inputSearchOrder_1),
						'storePhone':$.trim(this.inputSearchOrder_2),
						'page':(this.goInputValue).toString(),
						'pageNum':(this.showPageNum).toString()			
					}
				}); 
			    if(this.goInputValue > 0 && this.goInputValue <= this.totalPage){
			    	let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
			    	this.ajaxGet(url,jsonStr,function(result){
						console.log('搜索:');
		            	console.log(result);
		            	if(result.cod == '001' && result.result.ordes != ''){
		            		self.orderData = result.result.ordes;
			                self.totalPage = self.orderData[0].num;
			                self.currentPage = self.goInputValue;
		            	}else{
		            		self.orderData = [];
		            		self.showAlertTips(true,'该条件无返回结果...');
		            	}
					});
			    }else{
			    	this.showAlertTips(true,'跳转的页码错误,请核对好伐...');
			    }
			    
			}else{
				this.showAlertTips(true,'点也没有用，您没有查看权限...');
			}
		},
		//警示框提示功能
		showAlertTips:function(display,word){
			this.readOrEditDiv = display;
			this.alertMsg = word;
		},
		//初始化省市区
		initPCA(){
			const self = this;
			$('#distpicker').distpicker();

			$('#datepicker').Zebra_DatePicker({
				onSelect:function(data){
					self.beginData = data;
				}
			});
			$('#datepicker_1').Zebra_DatePicker({
				onSelect:function(data){
					self.endData = data;
				}
			});
		}
	},
	mounted(){
		this.initPCA();
	},
	//监听页码展示数量
	watch:{
		showPageNum:function(newValue,oldValue){
			if(this.rootArray[1][1] === 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_ORDE_FINDORDES',
					'parameters':{
						'state':(this.orderState).toString(),
						'address':this.province+this.city+this.area,
						'xdIndexdate':this.beginData,
						'xdEnddate':this.endData,
						'indextotal':(this.searchPrice_1).toString(),
						'endtotal':(this.searchPrice_2).toString(),
						'phone':$.trim(this.inputSearchOrder_1),
						'storePhone':$.trim(this.inputSearchOrder_2),
						'page':(this.currentPage).toString(),
						'pageNum':newValue.toString()			
					}
				}); 
				let url = 'http://192.168.1.57:8080/ycadminOrde/ycadminOrde.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('搜索:');
	            	console.log(result);
	            	if(result.cod == '001' && result.result != ''){
	            		self.orderData = result.result.ordes;
		                self.totalPage = self.orderData[0].num;
	            	}else{
	            		self.orderData = [];
	            		self.showAlertTips(true,'该条件无返回结果...');
	            	}
				});
			}else{
				this.showAlertTips = (true,'点也没有用，您没有查看权限...');
			}
		},
		userIfo:function(newValue,oldValue){
			if(newValue == 'storePhone'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'none';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'block';
			}
			if(newValue == 'phone'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'block';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'none';
			}
			
		},
		beginData:function(newValue,oldValue){
			console.log(newValue);
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
.title_1{
  /*float: left;*/
  display: inline-block;
  margin: 0px 10px;
  line-height: 46px;
  font-size: 20px;
}
.orderState,.province,.city,.area,.licenseStatus,.userIfo{
  margin-top: 14px;
}
.mar13{
  margin-top: 6px;
}
.mar14{
  margin-top: 14px;
}
.optionClass{
  width: 57px;
  margin-top: 13px;
}
.ifoSearchInput{
  height: 21px;
  margin-left: 5px;
}  	
.note{
  cursor: pointer;
}
.orderTable table{
  min-width: 140%;
}
.orderTable table td{
  max-width: 14%;
}
.showDiv{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,.1);
}
.replaceCon{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 930px;
  height: 500px;
  background-color: #fff;
  margin-left: -465px;
  margin-top: -250px;
  border-radius: 10px;
  z-index: 100;
}
</style>
