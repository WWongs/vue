<template>
  <div class="userAuthentication">
    <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
           <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">用户管理</li>
          <li class="breadcrumb-item"><a href="#">用户认证</a></li>
        </ul>
    </div>
 
    <div class="tile mb-4">
		      <div class="page-header">
			      <div class="row">
			        <div class="col-lg-12">
			          <h2 class="mb-3 line-head" id="buttons">用户认证</h2>
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
			      			<option value="2">审核未通过</option>
			      		</select>
			      </div>
		      </div>
		      <!--row-->
	      </div>
	      <!--line-head-->
	      
	      <div class="line-head" style="margin-top: 20px;">
		      <div class="row">
		      	<div class="col-lg-4 positionOrder">
        			<select v-model="userIfo" class="userIfo">
				    		<option value="phone">用户手机号</option>
				    		<option value="Email">用户姓名</option>
				    		<option value="name">用户身份证</option>
			    	  </select>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_1" placeholder="请输入手机号" style="top: 0;left: 120px;"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_2" placeholder="请输入姓名" style="display: none;top: 0;left: 120px;"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_3" placeholder="请输入身份证件号" style="display: none;top: 0;left: 120px;"/>
        		</div>
        		<!--col-lg-4-->
        		<div class="col-lg-4">
        			<a href="##" class="btn btn-primary" @click="searchUserEve">搜索</a> 
        			<button v-on:click="clearAllIfoEve" class="btn btn-info">初始化</button>
        		</div>
		      </div>
		      <!--row-->
	      </div>
	      <!--line-head-->
	      
	      <div class="orderTable pre-scrollable">
	      	<table class="table table-striped">
	      		<thead>
	      			<tr>
		      			<td>用户ID</td>
		      			<td>认证状态</td>
		      			<td>手机号</td>
		      			<td>邮箱</td>
		      			<td>真实姓名</td>
		      			<td>身份证号</td>
		      			<td>操作</td>
		      		</tr>
	      		</thead>	
	      		<tbody>
		      		<tr class="line-head" v-for="(item,index) in userData" :key="index">
		      			<td>{{item.userId}}</td>
		      			<td>{{item.state}}</td>
		      			<td>{{item.phone}}</td>
		      			<td>{{item.Email}}</td>
		      			<td>{{item.realName}}</td>
		      			<td>{{item.identityNum}}</td>
		      			<td><a href="##" @click="viewUserEve(item)">查看</a>|<a href="##" v-show="ifShowEditBtn" @click="editPassEve(item)">审核</a></td>
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
	    
	    <!--认证相关编辑区域信息-->
      <div class="showDiv_1" v-show="showFlag">
      	<div class="replaceCon_1">
      	
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>实名审核</h1>
						</div>
	          
	          <div class="row">
	          	<div class="col-lg-2 text-right">
	          		审核资料:
	          	</div>
	          	<div class="col-lg-8 showUserIdCard">
	          		<div class="row">
	          			<div class="col-lg-3 text-right">
			          		姓名:
			          	</div>
			          	<div class="col-lg-9">
			          		{{userIdData.realName}}
			          	</div>
			          	<div class="col-lg-3 text-right">
			          		身份证:
			          	</div>
			          	<div class="col-lg-9">
			          	{{userIdData.identityNum}}
			          	</div>
	          		</div>
	          		 
	          		<div class="row">
	          			<div class="col-lg-6">
	          				<img v-bind:src="userIdData.image" alt="用户身份证正面" class="userIdImg"/>
	          			</div>
	          			<div class="col-lg-6">
	          				<img :src="userIdData.fimage" alt="用户身份证反面" class="userIdImg"/>
	          			</div>
	          		</div>
	          	</div>
	          </div>
	         
	          
	          <div class="row" style="margin: 10px 0;">
	          	<div class="col-lg-2 text-right" style="margin: 10px 0;">
	          		审核状态:
	          	</div>
	          	<div class="col-lg-10" style="margin: 10px 0;">
	          		审核通过:
	          		<input type="radio" name="test" :value="review_1" v-model="checkedValue">
	          	  审核未通过:
	          	  <input type="radio" name="test" :value="review_2" v-model="checkedValue">
	          	</div>
	          	<div class="col-lg-2 text-right">
			    			备注:
			    		</div>
			    		<div class="col-lg-8">
      					<input type="area" v-model="editAreaInput" style="width: 400px;height: 50px;" placeholder="请输入需要备注的内容"/>
      				</div>
	          </div>
	        
      		</div>
      		
      		<div class="title" style="margin: 5px 0 0 88px;">
      			<button class="btn btn-info" @click="sureUserPassEve">确定</button>
      			<button class="btn btn-danger" @click="showFlag = false">取消</button>
      		</div>
      	</div>
      	
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
	          		用户状态:<strong style="color:#6699CC ;">{{userIdData.userState}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		创建时间：<strong style="color:#6699CC ;">{{userIdData.createtime}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		最后下单时间：<strong style="color:#6699CC ;">{{userIdData.xdDate}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row">
	          	<div class="col-lg-4">
	          		用户ID:<strong style="color:#6699CC ;">{{userIdData.userId}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		用户名：<strong style="color:#6699CC ;">{{userIdData.name}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		手机号：<strong style="color:#6699CC ;">{{userIdData.phone}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row">
	          	<div class="col-lg-4">
	          		身份:<strong style="color:#6699CC ;">{{userIdData.jurisdiction}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		邮箱：<strong style="color:#6699CC ;">{{userIdData.Email}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row">
   	        	<div class="col-lg-4">
   	        		<div class="row">
   	        			<div class="col-lg-12">
   	        				真实姓名:<strong style="color:#6699CC ;">{{userIdData.realName}}</strong>
   	        			</div>
   	        			<div class="col-lg-12">
   	        				身份证号:<strong style="color:#6699CC ;">{{userIdData.identityNum}}</strong>
   	        			</div>
   	        		</div>
   	        	</div>
   	        	<div class="col-lg-8">
   	        		<div class="row">
   	        			<div class="col-lg-6">
   	        				<img :src="userIdData.image" alt="身份证正面" class="img2"/>
   	        			</div>
   	        			<div class="col-lg-6">
   	        				<img :src="userIdData.fimage" alt="身份证反面" class="img2"/>
   	        			</div>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        <div class="row">
	          	<div class="col-lg-4">
	          		总消费次数:<strong style="color:#6699CC ;">{{userIdData.countNum}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		总消费金额：<strong style="color:#6699CC ;">{{userIdData.sumtotal}}</strong>
	          	</div>
	          	<div class="col-lg-4">
	          		用户认证状态：<strong style="color:#6699CC ;">{{userIdData.state}}</strong>
	          	</div>
	          </div>
	          <!--row-->
      		</div>
      		<!--//-->
      		<div class="" style="margin: 15px auto 0 auto;width: 56px;">
      			<button class="btn btn-info" @click="showFlag_2 = !showFlag_2">确定</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
  </div>
</template>

<script>
export default {
  name: 'userAuthentication',
  data () {
    return {
        realName:'',
        userIfo:'phone',
        inputSearchOrder_1:'',
        inputSearchOrder_2:'',
        inputSearchOrder_3:'',
        userData:[],
        //id等信息事件展示
        showFlag:false,
        showFlag_2:false,
        userIdData:[],
        checkedValue:'',
        review_1:1,  //通过
            review_2:2,  //未通过
            editAreaInput:'',
        //编辑按钮展示
        ifShowEditBtn:false,
        //分页相关
        showPageNum:10,
        goInputValue:'',
        currentPage:1,
        totalPage:'',
        //弹出框
        readOrEditDiv:false,
        alertMsg:'',
        //权限数组
        readRoot:'',
        writeRoot:'',
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
		//初始化权限
		initGetRoot:function(){
			let rootArray = localStorage.getItem('jurisdictions');
			rootArray = JSON.parse(rootArray);
			this.readRoot = rootArray[2][1];
			this.writeRoot = rootArray[2][0];
		},
		//初始化列表
		initUserData:function(){
			let self = this;
			let jsonStr = JSON.stringify({
				"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
				"parameters":{
					"userjur":"",
					"phone":"",
					"realName":"",
					"identityNum":"",
					"page":(this.currentPage).toString(),
					"pageNum":(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('初始化:');
				console.log(result);
				if(result.cod == '001' && result.result.adminUsers != ''){
					self.userData = result.result.adminUsers;
					self.totalPage = result.result.adminUsers[0].num;
				}else{
					self.showAlertTips(true,'服务器错误,无返回结果...');
				}
			});
		},
		//搜索按钮事件
		searchUserEve:function(){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
					"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
					"parameters":{
						"userjur":(this.realName).toString(),
						"phone":$.trim((this.inputSearchOrder_1).toString()),
						"realName":$.trim(this.inputSearchOrder_2),
						"identityNum":$.trim((this.inputSearchOrder_3).toString()),
						"page":(this.currentPage).toString(),
						"pageNum":(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('搜索:');
					console.log(result);
					if(result.cod == '001' && result.result.adminUsers != ''){
						self.userData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
					}else{
						self.userData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'无读取权限,无法点击搜索按钮...');
			}
		},
		//清空确定的值
		clearEditEve:function(){
			this.checkedValue = '';
			this.editAreaInput = '';
		},
		//清空按钮
		clearAllIfoEve:function(){
			this.realName = '';
			this.userIfo = 'phone';
			this.inputSearchOrder_1 = '';
			this.inputSearchOrder_2 = '';
			this.inputSearchOrder_2 = '';
		},
		//审核事件
		editPassEve:function(item){
			this.showFlag = true;
			this.userDataIndex = this.userData.indexOf(item);
			let self = this;			
			let jsonStr = JSON.stringify({
				"api":"YCADMIN_USER_FINDATTESTATION",
				"parameters":{
					'userId':this.userData[this.userDataIndex].userId
				}
			});
			let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('编辑:');
				console.log(result);
				if(result.cod == '001' && result.result.attestation != ''){
                	self.userIdData = result.result.attestation[0];
                }else{
                	self.userIdData = [];
                	self.showAlertTips(true,'服务器错误,无返回结果...');
                }
			});
			this.clearEditEve();
		},
		//确定用户审核按钮事件
		sureUserPassEve:function(){
			this.showFlag = false;
			if(this.editAreaInput.length >= 5){
				let self = this;
				let jsonStr = JSON.stringify({
					"api":"YCADMIN_USER_UPDATEATTESTATIONSTATE",
					"parameters":{
						'userId':this.userData[this.userDataIndex].userId,
						'state':(this.checkedValue).toString(),
						'value':this.editAreaInput
					}
				});
				let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('确定查看:');
					console.log(result);
					if(result.cod == '001' && result.describa == '成功执行'){
				   	  	self.initUserData();
				   	}else{
				   	  	self.showAlertTips(true,'服务器错误,操作失败...');
				   	}
				});
			}else{
				this.showAlertTips(true,'操作失败,主要信息填写不正确...');
			}
		},
		//查看用户所有信息
		viewUserEve:function(item){
			this.showFlag_2 = true;
			let self = this;
			this.userDataIndex = this.userData.indexOf(item);
			let jsonStr = JSON.stringify({
					"api":"YCADMIN_USER_FINDATTESTATION",
					"parameters":{
						'userId':this.userData[this.userDataIndex].userId,
					}
				});
				let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('查看用户:')
					console.log(result);
					if(result.cod == '001' && result.result.attestation != ''){
	                	self.userIdData = result.result.attestation[0];
	                }else{
	                	self.userIdData = [];
	                	self.showAlertTips(true,'服务器错误,无返回结果...');
	                }
				});
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
					"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
					"parameters":{
						"userjur":(this.realName).toString(),
						"phone":$.trim((this.inputSearchOrder_1).toString()),
						"realName":$.trim(this.inputSearchOrder_2),
						"identityNum":$.trim((this.inputSearchOrder_3).toString()),
						"page":'1',
						"pageNum":(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('首页:');
					console.log(result);
					if(result.cod == '001' && result.result.adminUsers != ''){
						self.userData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
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
				let jsonStr = JSON.stringify({
					"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
					"parameters":{
						"userjur":(this.realName).toString(),
						"phone":$.trim((this.inputSearchOrder_1).toString()),
						"realName":$.trim(this.inputSearchOrder_2),
						"identityNum":$.trim((this.inputSearchOrder_3).toString()),
						"page":(this.totalPage).toString(),
						"pageNum":(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('尾页:');
					console.log(result);
					if(result.cod == '001' && result.result.adminUsers != ''){
						self.userData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
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
					let jsonStr = JSON.stringify({
						"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
						"parameters":{
							"userjur":(this.realName).toString(),
							"phone":$.trim((this.inputSearchOrder_1).toString()),
							"realName":$.trim(this.inputSearchOrder_2),
							"identityNum":$.trim((this.inputSearchOrder_3).toString()),
							"page":(--this.currentPage).toString(),
							"pageNum":(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('上一页:');
						console.log(result);
						if(result.cod == '001' && result.result.adminUsers != ''){
							self.userData = result.result.adminUsers;
							self.totalPage = result.result.adminUsers[0].num;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'页码错误，点什么都没有用...');
				}
			}else{
				this.showAlertTips(true,'您没有查看权限，点什么都没有用...');
			}
		},
		nextPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage < this.totalPage){
					let self = this;
					let jsonStr = JSON.stringify({
						"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
						"parameters":{
							"userjur":(this.realName).toString(),
							"phone":$.trim((this.inputSearchOrder_1).toString()),
							"realName":$.trim(this.inputSearchOrder_2),
							"identityNum":$.trim((this.inputSearchOrder_3).toString()),
							"page":(++this.currentPage).toString(),
							"pageNum":(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('下一页:');
						console.log(result);
						if(result.cod == '001' && result.result.adminUsers != ''){
							self.userData = result.result.adminUsers;
							self.totalPage = result.result.adminUsers[0].num;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'页码错误，点什么都没有用...');
				}
			}else{
				this.showAlertTips(true,'您没有查看权限，点什么都没有用...');
			}
		},
		goTo:function(){
			if(this.readRoot == 1){
				if(this.currentPage >= 1 && this.currentPage <= this.totalPage){
					let self = this;
					let jsonStr = JSON.stringify({
						"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
						"parameters":{
							"userjur":(this.realName).toString(),
							"phone":$.trim((this.inputSearchOrder_1).toString()),
							"realName":$.trim(this.inputSearchOrder_2),
							"identityNum":$.trim((this.inputSearchOrder_3).toString()),
							"page":(this.goInputValue).toString(),
							"pageNum":(this.showPageNum).toString()
						}
					});
					let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('跳转:');
						console.log(result);
						if(result.cod == '001' && result.result.adminUsers != ''){
							self.userData = result.result.adminUsers;
							self.totalPage = result.result.adminUsers[0].num;
							self.currentPage = self.goInputValue;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
				}else{
					this.showAlertTips(true,'页码错误，点什么都没有用...');
				}
			}else{
				this.showAlertTips(true,'您没有查看权限，点什么都没有用...');
			}
		}
	},
	watch:{
		//页码
		showPageNum:function(newValue,oldValue){
			if(this.readRoot == 1){
				let jsonStr = JSON.stringify({
						"api":"YCADMIN_ATTESTATION_FINDUSERATTESTATION",
						"parameters":{
							"userjur":(this.realName).toString(),
							"phone":$.trim((this.inputSearchOrder_1).toString()),
							"realName":$.trim(this.inputSearchOrder_2),
							"identityNum":$.trim((this.inputSearchOrder_3).toString()),
							"page":(this.currentPage).toString(),
							"pageNum":newValue.toString()
						}
					});
					let url = 'http://192.168.1.57:8080/Userattestation/Userattestation.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('页码栏数:');
						console.log(result);
						if(result.cod == '001' && result.result.adminUsers != ''){
							self.userData = result.result.adminUsers;
							self.totalPage = result.result.adminUsers[0].num;
						}else{
							self.userData = [];
							self.showAlertTips(true,'该搜索无返回结果...');
						}
					});
			}else{
				this.showAlertTips(true,'您没有查看权限，点什么都没有用...');
			}
		},
		//用户搜索框
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
.mar14{
  margin-top: 14px;
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
</style>
