<template>
  <div class="userList">
    <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
           <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">用户管理</li>
          <li class="breadcrumb-item"><a href="#">用户列表</a></li>
        </ul>
    </div>
 
    <div class="tile mb-4">
		      <div class="page-header">
			      <div class="row">
			        <div class="col-lg-12">
			          <h2 class="mb-3 line-head" id="buttons">用户列表</h2>
			        </div>
			        <!--col-lg-12-->
			      </div> 
			    </div>
	      <!--page-header-->
        <div class="line-head">
		      <div class="row">
		      	<div class="col-lg-3 clearfix">
		      		<div class="title">
		      			身份
		      		</div>
		      		<select v-model="identity" class="mar14" style="width: 100px;">
		      			<option value="">全部</option>
		      			<option value="0">管理员</option>
		      			<option value="1">店长</option>
		      			<option value="2">用户</option>
		      		</select>
		      	</div>
		      	<div class="col-lg-9 clearfix">
		      		<div class="title">
		      			实名认证状态
		      		</div>
		      		<select v-model="realName" class="mar14" style="width: 100px;">
		      			<option value="">全部</option>
		      			<option value="0">审核中</option>
		      			<option value="1">审核通过</option>
		      			<option value="2">审核未通过</option>
		      			<option value="3">未认证</option>
		      		</select>
		      	</div>
		      </div>
		    </div>
		    <!--line-head-->
		      <!--row-->
	      
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
	      </div>
	      <!--line-head-->
      
        <div class="line-head">
        	<div class="row">
        		<div class="col-lg-12" style="margin-bottom: 15px;">
							<div class="title">
								总消费金额
							</div>
							<!--title-->
							<div class="mar14">
							  <input v-model="searchPrice_1" type="text" name="" id="" value="" placeholder="元" style="width: 80px;margin-left: 5px;margin-right: 5px;"/>
							  至
							  <input v-model="searchPrice_2" type="text" placeholder="元" style="width: 80px;margin-left: 5px;margin-right: 5px;"/>
							</div>						
        		</div>
        		<div class="col-lg-4 positionOrder">
        			<select v-model="userIfo" class="userIfo">
				    		<option value="phone">用户手机号</option>
				    		<option value="Email">用户邮箱</option>
				    		<option value="name">用户名</option>
			    	  </select>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_1" placeholder="请输入手机号" style="top: 0;left: 120px;"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_2" placeholder="请输入邮箱" style="display: none;top: 0;left: 120px;"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_3" placeholder="请输入用户名" style="display: none;top: 0;left: 120px;"/>

        		</div>
        		<!--col-lg-4-->
        		<div class="col-lg-4">
        			<a href="##" class="btn btn-primary" @click="searchBtnEve">搜索</a> 
        			<button v-on:click="clearAllSearch" class="btn btn-info">初始化</button>
        		</div>
        	</div>
        </div>
        <!--line-head-->
      
      
        <div class="orderTable pre-scrollable">
	      	<table class="table table-striped">
	      		<thead>
	      			<tr>
		      			<td>用户ID</td>
		      			<td>手机号</td>
		      			<td>邮箱</td>
		      			<td>用户名</td>
		      			<td>实名认证</td>
		      			<td>用户身份</td>
		      			<td>消费次数</td>
		      			<td>总消费金额</td>
		      			<td>最后下单时间</td>
		      			<td>操作</td>
		      		</tr>
	      		</thead>	
	      		<tbody>
		      		<tr class="line-head" v-for="(item,index) in userData" :key="index">
		      			<td>{{item.userId}}</td>
		      			<td>{{item.phone}}</td>
		      			<td>{{item.Email}}</td>
		      			<td>{{item.name}}</td>
		      			<td>{{item.state}}</td>
		      			<td>{{item.jurisdiction}}</td>
		      			<td>{{item.countNum}}</td>
		      			<td>{{item.sumtotal == '' ? '0' :item.sumtotal}}</td>
		      			<td>{{item.xdDate == '' ? 'null': item.xdDate}}</td>
		      			<td><a href="##" @click="editBtnEve(item)">查看</a>|<a href="##" v-show="ifShowEditBtn" @click="showUserIfo(item)">编辑</a></td>
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

      <!--编辑区域-->
      <div class="showDiv_1" v-show="viewFlag_2">
      	<div class="replaceCon_1" style="height: 300px;">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>编辑用户信息</h1>
						</div>
	
	          <div class="row" style="margin-bottom: 10px;margin-top: 30px;">
	          	<div class="col-lg-3"></div>
	          	<div class="col-lg-9">
	          		<strong style="margin-right: 10px;">用户状态:</strong>
	          		<select name="" v-model="realName_2">
			      			<option value="0">启用</option>
			      			<option value="1">下线</option>
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
      
      <!--查看区域信息-->
      <div class="showDiv_1" v-show="showFlag_2">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>用户详情列表</h1>
						</div>
	          
	          <div class="row">
	          	<div class="col-lg-4">
	          		用户状态:<strong style="color:#6699CC ;">{{userAllData.userState}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		创建时间：<strong style="color:#6699CC ;">{{userAllData.createtime}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		最后下单时间：<strong style="color:#6699CC ;">{{userAllData.xdDate}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row">
	          	<div class="col-lg-4">
	          		用户ID:<strong style="color:#6699CC ;">{{userAllData.userId}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		用户名：<strong style="color:#6699CC ;">{{userAllData.name}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		手机号：<strong style="color:#6699CC ;">{{userAllData.phone}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row">
	          	<div class="col-lg-4">
	          		身份:<strong style="color:#6699CC ;">{{userAllData.jurisdiction}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		邮箱：<strong style="color:#6699CC ;">{{userAllData.Email}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row">
   	        	<div class="col-lg-4">
   	        		<div class="row">
   	        			<div class="col-lg-12">
   	        				真实姓名:<strong style="color:#6699CC ;">{{userAllData.realName}}</strong>
   	        			</div>
   	        			<div class="col-lg-12">
   	        				身份证号:<strong style="color:#6699CC ;">{{userAllData.identityNum}}</strong>
   	        			</div>
   	        		</div>
   	        	</div>
   	        	<div class="col-lg-8">
   	        		<div class="row">
   	        			<div class="col-lg-6">
   	        				<img v-bind:src="userAllData.image" alt="身份证正面" class="img2"/>
   	        			</div>
   	        			<div class="col-lg-6">
   	        				<img v-bind:src="userAllData.fimage" alt="身份证反面" class="img2"/>
   	        			</div>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        <div class="row">
	          	<div class="col-lg-4">
	          		总消费次数:<strong style="color:#6699CC ;">{{userAllData.countNum}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		总消费金额：<strong style="color:#6699CC ;">{{userAllData.sumtotal}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		用户认证状态：<strong style="color:#6699CC ;">{{userAllData.state}}</strong>
	          	</div>
	          </div>
	          <!--row-->
      		</div>
      		<!--//-->
      		<div class="" style="position: absolute;bottom:50px;left: 50%;margin-left: -28px;width: 56px;">
      			<button class="btn btn-info" @click="showFlag_2 = !showFlag_2">确定</button>
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
export default {
  name: 'userList',
  data () {
    return {
        identity:'',            //身份
        realName:'',            //实名认证状态
        //开始结束年份
        beginData:'',
        endData:'',
        searchPrice_1:'',
        searchPrice_2:'',
        userIfo:'phone',
        inputSearchOrder_1:'',
        inputSearchOrder_2:'',
        inputSearchOrder_3:'',
        userData:[],
        //用户和身份
        userAllData:[],
        //权限数组
        readRoot:'',
        writeRoot:'',
        //弹出框
        readOrEditDiv:false,
        alertMsg:'',
        //分页相关
        showPageNum:10,
        goInputValue:'',
        currentPage:1,
        totalPage:'',
        //查看编辑按钮事件
        viewFlag_2:false,
        realName_2:'',
        shopNoteIfo:'',
        showFlag:false,
        showFlag_2:false,
        ifShowEditBtn:false,
        editAreaInput:'',
        checkedValue:'',
        review_1:1,  //通过
        review_2:3,  //未通过
        //获得第几条信息下标
		    userDataIndex:''
    }
  },
  created:function(){
		this.initGetRoot();
		if(this.readRoot == 1){
			this.initUserData();
			if(this.writeRoot == 1){
			   this.ifShowEditBtn = true;
			}
		}else{
			this.showAlertTips(true,'没有查看权限不能获取用户列表数据...');
		}
  },
  methods:{
		//初始化用户列表数据
		initUserData:function(){
			let self = this;
			let jsonStr = JSON.stringify({
				"api":"YCADMIN_USER_FINDUSERS",
				"parameters":{
					"identity":"",
					"state":"",
					"xdIndexdate":"",
					"xdEnddate":"",
					"indextotal":"",
					"endtotal":"",
					"phone":"",
					"page":(this.currentPage).toString(),
					"pageNum":(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
			this.ajaxGet(url,jsonStr,function(result){
				if(result.cod == '001' && result.result.users != ''){
					console.log('初始化:');
					console.log(result);
					self.userData = result.result.users;
					self.totalPage = result.result.users[0].num;
				}else{
					self.showAlertTips(true,'服务器错误,无返回结果...');
				}
			});
		},
		//初始化权限
		initGetRoot:function(){
			let rootArray = localStorage.getItem('jurisdictions');
			rootArray = JSON.parse(rootArray);
			this.readRoot = rootArray[2][1];
			this.writeRoot = rootArray[2][0];
		},
		//编辑按钮事件
		showUserIfo:function(item){
			this.viewFlag_2 = !this.viewFlag_2;
			this.userDataIndex = this.userData.indexOf(item);
			this.clearEditEve();
		},
		//确定编辑按钮事件
		shopEditSureBtn:function(){
			let self = this;
			this.viewFlag_2 = false;
			if(this.realName_2 != '' && this.shopNoteIfo.length >= 5){
				let jsonStr=JSON.stringify({
				"api":"YCADMIN_USER_UPDATEUSERSTATE",
				"parameters":{
				"userId":this.userData[this.userDataIndex].userId,
				"state":(this.realName_2).toString(),
				"remake":this.shopNoteIfo
				}
			});
			let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('确定编辑:');
				console.log(result);
				if(result.cod == '001' && result.describa == '成功执行'){
			   	  	self.initUserData();
			   	}else{
			   	  	self.showAlertTips(true,'服务器错误,操作失败...');
			   	}
			});
			}else{
				this.showAlertTips(true,'主要信息填写不正确,操作失败...');
			}
		},
		//查看按钮事件
		editBtnEve:function(item){
			let self = this;
			this.showFlag_2 = !this.showFlag_2;
			this.userDataIndex = this.userData.indexOf(item);
		    let jsonStr = JSON.stringify({
				"api":"YCADMIN_USER_FINDATTESTATION",
				"parameters":{
					'userId':this.userData[this.userDataIndex].userId
				}
			});
			let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('查看:');
				console.log(result);
				if(result.cod == '001' && result.result.attestation != ''){
                	self.userAllData = result.result.attestation[0];
                }else{
                	self.userAllData = [];
                	self.showAlertTips(true,'服务器错误,无返回结果...');
                }
			});
		},
		//清空确定的值
		clearEditEve:function(){
			this.realName_2 = '';
			this.shopNoteIfo = '';
		},
		//初始化按钮  的  事件
		clearAllSearch:function(){
			this.identity = '';
			this.realName = '';   
			this.beginData = '';
			this.endData = '';
			$("#datepicker").val('');
			$("#datepicker_1").val('');
			this.userIfo = 'phone';         
			this.inputSearchOrder = '';
			this.searchPrice_1 = '';
			this.searchPrice_2 = '';
			this.inputSearchOrder_1 = '';
			this.inputSearchOrder_2 = '';
			this.inputSearchOrder_3 = '';
		},
		//搜索按钮的事件
		searchBtnEve:function(){
			if(this.readRoot == 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					"api":"YCADMIN_USER_FINDUSERS",
					"parameters":{
						"identity":(this.identity).toString(),
						"state":(this.realName).toString(),
						"xdIndexdate":this.beginData,
						"xdEnddate":this.endData,
						"indextotal":(this.searchPrice_1).toString(),
						"endtotal":(this.searchPrice_2).toString(),
						"phone":$.trim(this.inputSearchOrder_1),
						"Email":$.trim(this.inputSearchOrder_2),
						"name":$.trim(this.inputSearchOrder_3),
						"page":(this.currentPage).toString(),
						"pageNum":(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.users != ''){
						console.log('搜索:');
						console.log(result);
						self.userData = result.result.users;
						self.totalPage = result.result.users[0].num;
					}else{
						self.userData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'您没有查看权限,搜索按钮失效...');
			}
		},
		//修改弹出框
		showAlertTips:function(display,word){
			this.readOrEditDiv = display;
			this.alertMsg = word;
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
		//分页相关
		firstPage:function(){
			if(this.readRoot == 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					"api":"YCADMIN_USER_FINDUSERS",
					"parameters":{
						"identity":(this.identity).toString(),
						"state":(this.realName).toString(),
						"xdIndexdate":this.beginData,
						"xdEnddate":this.endData,
						"indextotal":(this.searchPrice_1).toString(),
						"endtotal":(this.searchPrice_2).toString(),
						"phone":$.trim(this.inputSearchOrder_1),
						"Email":$.trim(this.inputSearchOrder_2),
						"name":$.trim(this.inputSearchOrder_3),
						"page":'1',
						"pageNum":(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.users != ''){
						console.log('搜索:');
						console.log(result);
						self.userData = result.result.users;
						self.totalPage = result.result.users[0].num;
						self.currentPage = 1;
					}else{
						self.userData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'您没有查看权限，点什么都没有用...');
			}
		},
		lastPage:function(){
			if(this.readRoot == 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
					"api":"YCADMIN_USER_FINDUSERS",
					"parameters":{
						"identity":(this.identity).toString(),
						"state":(this.realName).toString(),
						"xdIndexdate":this.beginData,
						"xdEnddate":this.endData,
						"indextotal":(this.searchPrice_1).toString(),
						"endtotal":(this.searchPrice_2).toString(),
						"phone":$.trim(this.inputSearchOrder_1),
						"Email":$.trim(this.inputSearchOrder_2),
						"name":$.trim(this.inputSearchOrder_3),
						"page":(this.totalPage).toString(),
						"pageNum":(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.users != ''){
						console.log('搜索:');
						console.log(result);
						self.userData = result.result.users;
						self.totalPage = result.result.users[0].num;
						self.currentPage = self.totalPage;
					}else{
						self.userData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'您没有查看权限，点什么都没有用...');
			}
		},
		prevPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage > 1){
					let self = this;
					this.getDataValue();
					this.getPriceValue();
					let jsonStr = JSON.stringify({
						"api":"YCADMIN_USER_FINDUSERS",
						"parameters":{
							"identity":(this.identity).toString(),
							"state":(this.realName).toString(),
							"xdIndexdate":this.beginData,
							"xdEnddate":this.endData,
							"indextotal":(this.searchPrice_1).toString(),
							"endtotal":(this.searchPrice_2).toString(),
							"phone":$.trim(this.inputSearchOrder_1),
							"Email":$.trim(this.inputSearchOrder_2),
							"name":$.trim(this.inputSearchOrder_3),
							"page":(--this.currentPage).toString(),
							"pageNum":(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
					this.ajaxGet(url,jsonStr,function(result){
						if(result.cod == '001' && result.result.users != ''){
							console.log('搜索:');
							console.log(result);
							self.userData = result.result.users;
							self.totalPage = result.result.users[0].num;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'页码错误,操作失败...');
				}
			}else{
				this.showAlertTips(true,'参数错误，点什么都没有用...');
			}
		},
		nextPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage < this.totalPage){
					let self = this;
					this.getDataValue();
					this.getPriceValue();
					let jsonStr = JSON.stringify({
						"api":"YCADMIN_USER_FINDUSERS",
						"parameters":{
							"identity":(this.identity).toString(),
							"state":(this.realName).toString(),
							"xdIndexdate":this.beginData,
							"xdEnddate":this.endData,
							"indextotal":(this.searchPrice_1).toString(),
							"endtotal":(this.searchPrice_2).toString(),
							"phone":$.trim(this.inputSearchOrder_1),
							"Email":$.trim(this.inputSearchOrder_2),
							"name":$.trim(this.inputSearchOrder_3),
							"page":(++this.currentPage).toString(),
							"pageNum":(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
					this.ajaxGet(url,jsonStr,function(result){
						if(result.cod == '001' && result.result.users != ''){
							console.log('搜索:');
							console.log(result);
							self.userData = result.result.users;
							self.totalPage = result.result.users[0].num;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'页码错误,操作失败...');
				}
			}else{
				this.showAlertTips(true,'参数错误，点什么都没有用...');
			}
		},
		goTo:function(){
			if(this.readRoot == 1){
				if(this.goInputValue > 0 && this.goInputValue <= this.totalPage){
					let self = this;
					this.getDataValue();
					this.getPriceValue();
					let jsonStr = JSON.stringify({
						"api":"YCADMIN_USER_FINDUSERS",
						"parameters":{
							"identity":(this.identity).toString(),
							"state":(this.realName).toString(),
							"xdIndexdate":this.beginData,
							"xdEnddate":this.endData,
							"indextotal":(this.searchPrice_1).toString(),
							"endtotal":(this.searchPrice_2).toString(),
							"phone":$.trim(this.inputSearchOrder_1),
							"Email":$.trim(this.inputSearchOrder_2),
							"name":$.trim(this.inputSearchOrder_3),
							"page":this.goInputValue,
							"pageNum":this.showPageNum
						}
					});
					let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
					this.ajaxGet(url,jsonStr,function(result){
						if(result.cod == '001' && result.result.users != ''){
							console.log('搜索:');
							console.log(result);
							self.userData = result.result.users;
							self.totalPage = result.result.users[0].num;
							self.currentPage = self.goInputValue;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'页码错误,操作失败...');
				}
			}else{
				this.showAlertTips(true,'参数错误，点什么都没有用...');
			}
    },
    //初始化省市区
		initPCA(){
			const self = this;
			

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
			if(this.readRoot === 1){
				let self = this;
				this.getDataValue();
				this.getPriceValue();
				let jsonStr = JSON.stringify({
				"api":"YCADMIN_USER_FINDUSERS",
				"parameters":{
					"identity":(this.identity).toString(),
					"state":(this.realName).toString(),
					"xdIndexdate":this.beginData,
					"xdEnddate":this.endData,
					"indextotal":(this.searchPrice_1).toString(),
					"endtotal":(this.searchPrice_2).toString(),
					"phone":$.trim(this.inputSearchOrder_1),
					"Email":$.trim(this.inputSearchOrder_2),
					"name":$.trim(this.inputSearchOrder_3),
					"page":(this.currentPage).toString(),
					"pageNum":newValue.toString()
				}
			});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.users != ''){
						console.log('搜索:');
						console.log(result);
						self.userData = result.result.users;
						self.totalPage = result.result.users[0].num;
					}else{
						self.userData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'没有权限，内容无更新...');
			}
		},
		userIfo:function(newValue,oldValue){
			if(newValue == 'Email'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'none';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'block';
				document.getElementsByClassName('ifoSearchInput')[2].style.display = 'none';
			}
			if(newValue == 'name'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'none';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'none';
				document.getElementsByClassName('ifoSearchInput')[2].style.display = 'block';
			}
			if(newValue == 'phone'){
				document.getElementsByClassName('ifoSearchInput')[0].style.display = 'block';
				document.getElementsByClassName('ifoSearchInput')[1].style.display = 'none';
				document.getElementsByClassName('ifoSearchInput')[2].style.display = 'none';
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
    	.title_1{
    		display: inline-block;
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
    	
    	.showUserIdCard{
    		height: 260px;
    		border: 1px solid #333;
    	}
    	.userIdImg{
    		display: block;
    		width: 100%;
    		height: 218px;
    	}
    	.img2{
    		display: block;
    		width: 100%;
    		height: 218px;
    	}
    	.orderTime{
    		width: 60px;
    	}
</style>
