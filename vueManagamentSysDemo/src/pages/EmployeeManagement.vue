<template>
  <div class="employeeManagement">
    <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
           <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">系统管理</li>
          <li class="breadcrumb-item"><a href="#">员工管理</a></li>
        </ul>
    </div>
 
    <div class="tile mb-4">
		      <div class="page-header">
			      <div class="row">
			        <div class="col-lg-12 clearfix line-head">
			          <h2  style="float: left;">员工管理</h2>
			          <button style="float: right;cursor: pointer;" @click="addPeopleBtn">添加员工</button>
			        </div>
			        <!--col-lg-12-->
			      </div> 
			    </div>
	      <!--page-header-->
        <div class="line-head">
		      <div class="row">
		      	<div class="col-lg-3 clearfix">
		      		<div class="title">
		      			部门
		      		</div>
		      		<select v-model="department" class="mar14" style="width: 100px;">
		      			<option value="">全部</option>
		      			<option :value="item.deId" v-for="(item,index) in allPartIfo" :key="index">{{item.deName}}</option>
		      		</select>
		      	</div>
		      </div>
		    </div>
		    <!--line-head-->
		      <!--row-->
	      
      
        <div class="line-head">
        	<div class="row mar14">
        		<div class="col-lg-4 positionOrder">
        			<select v-model="userIfo" class="userIfo">
				    		<option value="phone">用户手机号</option>
				    		<option value="Email">用户邮箱</option>
				    		<option value="name">用户名</option>
			    	  </select>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_1" placeholder="请输入手机号" style="top: 0;left:120px"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_2" placeholder="请输入邮箱" style="display: none;top: 0;left:120px"/>
			    	  <input type="text" class="ifoSearchInput" v-model="inputSearchOrder_3" placeholder="请输入用户名" style="display: none;top: 0;left:120px"/>

        		</div>
        		<!--col-lg-4-->
        		<div class="col-lg-4">
        			<a href="##" class="btn btn-primary" @click="searchBtnEve">搜索</a> 
        			<button v-on:click="clearAllSearch" style="width:58px;height:37px;margin-left: 5px;cursor: pointer;margin-top: 2px;">初始化</button>
        		</div>
        	</div>
        </div>
        <!--line-head-->
      
      
        <div class="orderTable pre-scrollable">
	      	<table class="table table-striped">
	      		<thead>
	      			<tr>
		      			<td>用户ID</td>
		      			<td>联系方式</td>
		      			<td>姓名</td>
		      			<td>部门</td>
		      			<td>邮箱</td>
		      			<td>创建时间</td>
		      			<td>最后登录时间</td>
		      			<td>操作</td>
		      		</tr>
	      		</thead>	
	      		<tbody>
		      		<tr class="line-head" v-for="(item,index) in peopleData" :key="index">
		      			<td>{{item.adminuserId}}</td>
		      			<td>{{item.phone}}</td>
		      			<td>{{item.adminuserName}}</td>
		      			<td>{{item.deName}}</td>
		      			<td>{{item.eMail}}</td>
		      			<td>{{item.createTime}}</td>
		      			<td>{{item.eTime}}</td>
		      			<td><a href="##" v-show="showEditBtn" v-on:click="editBtnEve(item)" >编辑</a>|<a href="##" @click="showPeopleListEve(item)">查看</a></td>
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
      
      <!--/添加员工/-->
      <div class="showDiv_1" v-show="addPeopleShowFlag">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>添加员工</h1>
						</div>
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		姓名:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="text" v-model="addPeopleName" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		手机号:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="text" v-model="addPeopleTel" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		部门:
	          	</div>
	          	<div class="col-lg-6">
	          		<select name="" v-model="addPeoplePart">
	          			<option :value="item.deId" v-for="(item,index) in allPartIfo" :key="index">{{item.deName}}</option>
	          		</select>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		邮箱地址:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="email" v-model="addPeopleEmail" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;"> 
	          	<div class="col-lg-5 text-right">
	          		密码:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="password" v-model="addPeoplePassword_1" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		确认密码:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="password" v-model="addPeoplePassword_2" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
   	        
      		</div>
      		<!--//-->
      		
      		<div style="width:144px;position: absolute;bottom:50px;left: 50%;margin-left: -72px;">
      			<button class="btn btn-info" @click="sureAddPeopleBtn">确定添加</button>
      			<button class="btn btn-info" @click="addPeopleShowFlag = !addPeopleShowFlag">取消</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
      
      
      <!--/编辑员工/-->
      <div class="showDiv_1" v-show="addPeopleShowFlag_2">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>编辑员工信息</h1>
						</div>
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		姓名:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="text" v-model="addPeopleName_2" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		手机号:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="text" v-model="addPeopleTel_2" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		部门:
	          	</div>
	          	<div class="col-lg-6" >
	          		<select name="" v-model="addPeoplePart_2">
	          			<option :value="item.deId" v-for="(item,index) in allPartIfo" :key="index">{{item.deName}}</option>
	          		</select>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		邮箱地址:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="email" v-model="addPeopleEmail_2" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;"> 
	          	<div class="col-lg-5 text-right">
	          		密码:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="password" v-model="addPeoplePassword_3" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		确认密码:
	          	</div>
	          	<div class="col-lg-6">
	          		<input type="password" v-model="addPeoplePassword_4" placeholder=""/>
	          	</div>
	          </div>
	          <!--row-->
   	        
      		</div>
      		<!--//-->
      		
      		<div style="width:144px;position: absolute;bottom:50px;left: 50%;margin-left: -72px;">
      			<button class="btn btn-info" @click="editSureChangeBtn">确定编辑</button>
      			<button class="btn btn-info" @click="addPeopleShowFlag_2 = !addPeopleShowFlag_2">取消</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
      
      
      <!--/查看员工信息/-->
      <div class="showDiv_1" v-show="addPeopleShowFlag_3">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>查看员工信息</h1>
						</div>
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		姓名:
	          	</div>
	          	<div class="col-lg-6">
	          		<strong style="color:#6699CC ;">{{addPeopleName_2}}</strong>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		手机号:
	          	</div>
	          	<div class="col-lg-6">
	          		<strong style="color:#6699CC ;">{{addPeopleTel_2}}</strong>
	          	</div>
	          </div>
	          <!--row-->
	          
	          <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		部门:
	          	</div>
	          	<div class="col-lg-6" >
	          		<strong style="color:#6699CC ;">{{addPeoplePart_2}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        <div class="row" style="font-size: 16px;margin-bottom: 2px;">
	          	<div class="col-lg-5 text-right">
	          		邮箱地址:
	          	</div>
	          	<div class="col-lg-6">
	          		<strong style="color:#6699CC ;">{{addPeopleEmail_2}}</strong>
	          	</div>
	          </div>
	          <!--row-->
   	        
   	        
      		</div>
      		<!--//-->
      		
      		<div style="width:56px;position: absolute;bottom:50px;left: 50%;margin-left: -28px;">
      			<button class="btn btn-info" @click="addPeopleShowFlag_3 = !addPeopleShowFlag_3">确定</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
  </div>
</template>

<script>
export default {
  name: 'employeeManagement',
  data () {
    return {
      department:'',
      userIfo:'phone',
      inputSearchOrder:'',
      peopleData:[],
      allPartIfo:[],
      allPartIfo_1:[],
      inputSearchOrder_1:'',
      inputSearchOrder_2:'',
      inputSearchOrder_3:'',
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
      //添加员工的标志
      addPeopleShowFlag:false,
      addPeopleShowFlag_2:false,
      addPeopleShowFlag_3:false,
      //添加员工的对话框
      addPeopleName:'',
      addPeopleTel:'',
      addPeoplePart:'',
      addPeopleEmail:'',
      addPeoplePassword_1:'',
      addPeoplePassword_2:'',
      //编辑按钮展示
      showEditBtn:false,
      //编辑员工对话框
      addPeopleName_2:'',
      addPeopleTel_2:'',
      addPeoplePart_2:'12',
      addPeopleEmail_2:'',
      addPeoplePassword_3:'',
      addPeoplePassword_4:'',
      //确认index
      indexPeopleItem:''
    }
  },
  created:function(){
		this.initGetRoot();
		this.initAllPart();
		if(this.readRoot == 1){			
			this.initPeopleList();
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
			this.readRoot = rootArray[5][1];
			this.writeRoot = rootArray[5][0];
		},
		//初始化用户列表
		initPeopleList:function(){
			let self = this;
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_USER_FINDADMINUSERS',
				'parameters':{
					'deId':'',
					'phone':'',
					'name':'',
					'eMail':'',
					'page':(this.currentPage).toString(),
					'pageNum':(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
			this.ajaxGet(url,jsonStr,function(result){
				if(result.cod == '001' && result.result.adminUsers != ''){
					console.log('初始化:');
					console.log(result);
					self.peopleData = result.result.adminUsers;
					self.totalPage = result.result.adminUsers[0].num;
				}else{
					self.showAlertTips(true,'服务器错误,无返回结果...');
				}
			});
		},
		//初始化所有部门
		initAllPart:function(){
			let self = this;
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_DEPARTMENT_FINDDENAMES',
				'parameters':{}
			});
			let url = 'http://192.168.1.57:8080/Department/Department.do';
			this.ajaxGet(url,jsonStr,function(result){
				if(result.cod == '001' && result.result.deNames != ''){
					self.allPartIfo = result.result.deNames;
				}else{
					self.showAlertTips(true,'服务器错误,无法获取部门信息...')
				}
			});
		},
		//清空编辑确定的事件
		clearEditEve:function(){
			this.addPeopleName = '';
			this.addPeopleTel = '';
			this.addPeoplePassword_1 = '';
			this.addPeoplePassword_2 = '';
			this.addPeopleEmail = '';
		},
		clearEditEve_2:function(){
			this.addPeopleName_2 = '';
			this.addPeopleTel_2 = '';
			this.addPeoplePassword_3 = '';
			this.addPeoplePassword_4 = '';
			this.addPeopleEmail_2 = '';
		},
		//搜索按钮事件
		searchBtnEve:function(){
			if(this.readRoot == 1){
				let jsonStr = JSON.stringify({
				'api':'YCADMIN_USER_FINDADMINUSERS',
				'parameters':{
					'deId':(this.department).toString(),
					'phone':(this.inputSearchOrder_1).toString(),
					'name':this.inputSearchOrder_3,
					'eMail':this.inputSearchOrder_2,
					'page':(this.currentPage).toString(),
					'pageNum':(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
			this.ajaxGet(url,jsonStr,function(result){
				if(result.cod == '001' && result.result.adminUsers != ''){
					console.log('搜索:');
					console.log(result);
					self.peopleData = result.result.adminUsers;
					self.totalPage = result.result.adminUsers[0].num;
				}else{
					self.peopleData = [];
					self.showAlertTips(true,'该搜索无返回结果...');
				}
			});
			}else{
				this.showAlertTips(true,'没有读取权限,无法进行搜索...');
			}
		},
		//初始化按钮事件
		clearAllSearch:function(){
			this.department = '';
			this.userIfo = 'phone';
			this.inputSearchOrder_1 = '';
			this.inputSearchOrder_2 = '';
			this.inputSearchOrder_3 = '';
		},
		//添加员工信息
		addPeopleBtn:function(){
			if(this.writeRoot == 1){
				this.addPeopleShowFlag = !this.addPeopleShowFlag;
				this.clearEditEve();
			}else{
				this.showAlertTips(true,'没有编辑权限无法添加员工...');
			}		
		},
		//确定添加员工
		sureAddPeopleBtn:function(){
			let self = this;
			this.addPeopleShowFlag = !this.addPeopleShowFlag;
			if(this.addPeopleName!='' && this.addPeopleTel!='' && this.addPeoplePassword_1!=''){
				if(this.addPeoplePassword_1 == this.addPeoplePassword_2 && this.addPeopleTel.length == 11){
					console.log(this.addPeopleTel.length);
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_USER_INSERTADMINUSER',
						'parameters':{
							'adminuserName':this.addPeopleName,
							'phone':(this.addPeopleTel).toString(),
							'deId':(this.addPeoplePart).toString(),
							'password':(this.addPeoplePassword_1).toString(),
							'eMail':this.addPeopleEmail
						}
					});
					let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('编辑确定');
						console.log(result);
						if(result.cod == '001' && result.describa == '成功执行'){
					   	  	self.initPeopleList();
					   	}else{
					   	  	self.showAlertTips(true,'服务器错误,操作失败...');
					   	}
					});
				}else{
					this.showAlertTips(true,'两次密码不正确或手机号没有十一位...')
				}
			}else{
				this.showAlertTips(true,'没有添加必要信息,操作失败...');
			}
			
		},
		//编辑按钮事件
		editBtnEve:function(item){
			this.indexPeopleItem = this.peopleData.indexOf(item);
			this.clearEditEve_2();
			this.addPeopleShowFlag_2 = true;
			this.addPeopleName_2 = item.adminuserName;
			this.addPeopleTel_2 = item.phone;
			this.addPeopleEmail_2 = item.eMail;
		},
		//编辑员工确认修改按钮
		editSureChangeBtn:function(){
			let self = this;
			this.addPeopleShowFlag_2 = false;
			if(this.addPeoplePassword_3 && this.addPeoplePassword_4){
				if(this.addPeoplePassword_3 == this.addPeoplePassword_4){
					let jsonStr = JSON.stringify({
						'api':'YCADMIN_USER_UPDATEADMINUSER',
						'parameters':{
							'adminuserId':this.peopleData[this.indexPeopleItem].adminuserId,
							'adminuserName':this.addPeopleName_2,
							'phone':(this.addPeopleTel_2).toString(),
							'deId':this.addPeoplePart_2,
							'password':(this.addPeoplePassword_3).toString(),
							'eMail':this.addPeopleEmail_2
						}
					});
					let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('编辑确定');
						console.log(result);
						if(result.cod == '001' && result.describa == '成功执行'){
					   	  	self.initPeopleList();
					   	}else{
					   	  	self.showAlertTips(true,'服务器错误,操作失败...');
					   	}
					});
				}else{
					this.showAlertTips(true,'两次密码不一样,无法确认修改...');
				}
			}else{
				this.showAlertTips(true,'密码账号为空,无法确认修改...');
			}
			
		},
		//查看员工信息按钮事件
		showPeopleListEve:function(item){
			this.addPeopleShowFlag_3 = true;
			this.indexPeopleItem = this.peopleData.indexOf(item);
			this.addPeopleName_2 = item.adminuserName;
			this.addPeopleTel_2 = item.phone;
			this.addPeopleEmail_2 = item.eMail;
			this.addPeoplePart_2 = item.deName;
		},
		//修改弹出框
		showAlertTips:function(display,word){
			this.readOrEditDiv = display;
			this.alertMsg = word;
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
		//分页事件相关
		firstPage:function(){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
				'api':'YCADMIN_USER_FINDADMINUSERS',
				'parameters':{
					'deId':(this.department).toString(),
					'phone':(this.inputSearchOrder_1).toString(),
					'name':this.inputSearchOrder_1,
					'eMail':this.inputSearchOrder_3,
					'page':'1',
					'pageNum':(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
			this.ajaxGet(url,jsonStr,function(result){
				if(result.cod == '001' && result.result.adminUsers != ''){
					console.log('首页');
					console.log(result);
					self.peopleData = result.result.adminUsers;
					self.totalPage = result.result.adminUsers[0].num;
					self.currentPage = 1;
				}else{
					self.peopleData = [];
					self.showAlertTips(true,'该搜索无返回结果...');
				}
			});
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		},
		lastPage:function(){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
				'api':'YCADMIN_USER_FINDADMINUSERS',
				'parameters':{
					'deId':(this.department).toString(),
					'phone':(this.inputSearchOrder_1).toString(),
					'name':this.inputSearchOrder_1,
					'eMail':this.inputSearchOrder_3,
					'page':(this.totalPage).toString(),
					'pageNum':(this.showPageNum).toString()
				}
			});
			let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
			this.ajaxGet(url,jsonStr,function(result){
				if(result.cod == '001' && result.result.adminUsers != ''){
					console.log('尾页');
					console.log(result);
					self.peopleData = result.result.adminUsers;
					self.totalPage = result.result.adminUsers[0].num;
					self.currentPage = self.totalPage;
				}else{
					self.peopleData = [];
					self.showAlertTips(true,'该搜索无返回结果...');
				}
			});
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		},
		prevPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage > 1){
					let self = this;
					let jsonStr = JSON.stringify({
					'api':'YCADMIN_USER_FINDADMINUSERS',
					'parameters':{
						'deId':(this.department).toString(),
						'phone':(this.inputSearchOrder_1).toString(),
						'name':this.inputSearchOrder_1,
						'eMail':this.inputSearchOrder_3,
						'page':(--this.currentPage).toString(),
						'pageNum':(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.adminUsers != ''){
						console.log('上一页:');
						console.log(result);
						self.peopleData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
					}else{
						self.peopleData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
			    this.showAlertTips(true,'传输的页码错误,操作失败...');	
			}
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		},
		nextPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage < this.totalPage){
					let self = this;
					let jsonStr = JSON.stringify({
					'api':'YCADMIN_USER_FINDADMINUSERS',
					'parameters':{
						'deId':(this.department).toString(),
						'phone':(this.inputSearchOrder_1).toString(),
						'name':this.inputSearchOrder_1,
						'eMail':this.inputSearchOrder_3,
						'page':(++this.currentPage).toString(),
						'pageNum':(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.adminUsers != ''){
						console.log('下一页:');
						console.log(result);
						self.peopleData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
					}else{
						self.peopleData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
			    this.showAlertTips(true,'传输的页码错误,操作失败...');	
			}
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		},
		goTo:function(){
			if(this.readRoot == 1){
				if(this.currentPage >= 1 && this.currentPage <= this.totalPage){
					let self = this;
					let jsonStr = JSON.stringify({
					'api':'YCADMIN_USER_FINDADMINUSERS',
					'parameters':{
						'deId':(this.department).toString(),
						'phone':(this.inputSearchOrder_1).toString(),
						'name':this.inputSearchOrder_1,
						'eMail':this.inputSearchOrder_3,
						'page':(this.inputSearchOrder).toString(),
						'pageNum':(this.showPageNum).toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.adminUsers != ''){
						console.log('跳转:');
						console.log(result);
						self.peopleData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
						self.currentPage = self.goInputValue;
					}else{
						self.peopleData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
			    this.showAlertTips(true,'页码错误,操作失败...');	
			}
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		}
	},
	watch:{
		//页码下拉框
		showPageNum:function(newValue,oldValue){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_USER_FINDADMINUSERS',
					'parameters':{
						'deId':(this.department).toString(),
						'phone':(this.inputSearchOrder_1).toString(),
						'name':this.inputSearchOrder_1,
						'eMail':this.inputSearchOrder_3,
						'page':(this.currentPage).toString(),
						'pageNum':newValue.toString()
					}
				});
				let url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.ajaxGet(url,jsonStr,function(result){
					if(result.cod == '001' && result.result.adminUsers != ''){
						console.log('页码更改:');
						console.log(result);
						self.peopleData = result.result.adminUsers;
						self.totalPage = result.result.adminUsers[0].num;
					}else{
						self.peopleData = [];
						self.showAlertTips(true,'该搜索无返回结果...');
					}
				});
			}else{
				this.showAlertTips(true,'点也没有用,没有读取权限...');
			}
		},
		//部门
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
    	
</style>
