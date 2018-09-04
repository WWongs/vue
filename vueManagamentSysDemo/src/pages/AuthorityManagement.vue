<template>
  <div class="authorityManagement">
    <div class="app-title">
        <ul class="app-breadcrumb breadcrumb">
           <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item">系统管理</li>
          <li class="breadcrumb-item"><a href="#">权限管理</a></li>
        </ul>
    </div>
 
    <div class="tile mb-4">
        <div class="page-header">
			      <div class="row">
			        <div class="col-lg-12 clearfix line-head">
			          <h2  style="float: left;">权限管理</h2>
			          <button style="float: right;cursor: pointer;" @click="addPartBtn">添加部门</button>
			        </div>
			        <!--col-lg-12-->
			      </div> 
			    </div>
	      <!--page-header-->
        
        <div class="orderTable pre-scrollable">
	      	<table class="table table-striped">
	      		<thead>
	      			<tr>
	      				<td>部门ID</td>
		      			<td>部门名称</td>
		      			<td>部门描述</td>
		      			<td>成员数量</td>
		      			<td>创建时间</td>
		      			<td>是否启用</td>
		      			<td>操作</td>
		      		</tr>
	      		</thead>	
	      		<tbody>
		      		<tr class="line-head" v-for="(item,index) in rootData" :key="index">
		      			<td>{{item.deId}}</td>
		      			<td>{{item.deName}}</td>
		      			<td>{{item.deValue}}</td>
		      			<td>{{item.denum}}</td>
		      			<td>{{item.createTime}}</td>
		      			<td>{{item.deState == '0' ? '启用' : '停用'}}</td>
		      			<td><a href="##" v-show="showEditBtn" v-on:click="editBtnEve(item)" >编辑</a>|<a href="##" @click="showPartListEve(item)">查看</a></td>
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
      
      <!--/添加部门/-->
      <div class="showDiv_1" v-show="addPartShow">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>添加部门</h1>
						</div>

   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">部门名称:</strong>
   	        		<div class="">
   	        			<input type="text" v-model="addPartName_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">部门描述:</strong>
   	        		<div class="">
   	        			<input type="text" v-model="addPartTips_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">是否启用:</strong>
   	        		<div class="">
   	        			<select name="" v-model="addPartIfOpen_1">
   	        				<option value="0">启用</option>
   	        				<option value="1">停用</option>
   	        			</select>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="underline" style="padding: 10px 20px;border-bottom: 1px solid #ccc;"></div>
   	        
   	        <h4 style="text-align: center;margin-bottom:20px;margin-top: 10px;">权限</h4>
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">待办事项:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
	   	        			<!--<select name="" v-model="addTDListEdit_1" style="width: 50px;margin-left: 5px;">
	   	        				<option value="0">关</option>
	   	        				<option value="1">开</option>
	   	        			</select>-->
	   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addTDListEdit_1"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addTDListView_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addTDListView_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">订单管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addOrderEdit_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addOrderEdit_1"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addOrderView_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addOrderView_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">用户管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addUserEdit_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addUserEdit_1"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addUserView_1" style="width: 50px;margin-left: 5px;">
   	        			  <option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addUserView_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">店铺管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addShopEdit_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addShopEdit_1"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addShopView_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addShopView_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">统计分析:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addSAEdit_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSAEdit_1"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addSAView_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSAView_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">系统管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addSystemEdit_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSystemEdit_1"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addSystemView_1" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSystemView_1"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="underline" style="padding: 10px 20px;border-bottom: 1px solid #ccc;"></div>
   	        
      		</div>
      		<!--//-->
      		
      		<div style="width:144px;margin: 10px auto;">
      			<button class="btn btn-info" @click="sureAddPartBtn">确定添加</button>
      			<button class="btn btn-info" @click="addPartShow = !addPartShow">取消</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
      
      
      <!--/编辑部门/-->
      <div class="showDiv_1" v-show="addPartShow_2">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>编辑部门</h1>
						</div>

   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">部门名称:</strong>
   	        		<div class="">
   	        			<input type="text" v-model="addPartName_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">部门描述:</strong>
   	        		<div class="">
   	        			<input type="text" v-model="addPartTips_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">是否启用:</strong>
   	        		<div class="">
   	        			<select name="" v-model="addPartIfOpen_2">
   	        				<option value="0">启用</option>
   	        				<option value="1">停用</option>
   	        			</select>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="underline" style="padding: 10px 20px;border-bottom: 1px solid #ccc;"></div>
   	        
   	        <h4 style="text-align: center;margin-bottom:20px;margin-top: 10px;">权限</h4>
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">待办事项:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addTDListEdit_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addTDListEdit_2"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addTDListView_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addTDListView_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">订单管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addOrderEdit_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addOrderEdit_2"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addOrderView_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addOrderView_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">用户管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addUserEdit_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addUserEdit_2"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addUserView_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addUserView_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">店铺管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addShopEdit_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addShopEdit_2"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addShopView_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addShopView_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">统计分析:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addSAEdit_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSAEdit_2"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addSAView_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSAView_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">系统管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<!--<select name="" v-model="addSystemEdit_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSystemEdit_2"/>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<!--<select name="" v-model="addSystemView_2" style="width: 50px;margin-left: 5px;">
   	        				<option value="0">关</option>
   	        				<option value="1">开</option>
   	        			</select>-->
   	        			<input type="checkbox" style="margin: 5px 0 0 10px;" v-model="addSystemView_2"/>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="underline" style="padding: 10px 20px;border-bottom: 1px solid #ccc;"></div>
   	        
      		</div>
      		<!--//-->
      		
      		<div style="width:144px;margin: 10px auto;">
      			<button class="btn btn-info" @click="sureEditAddBtn">确定编辑</button>
      			<button class="btn btn-info" @click="addPartShow_2 = !addPartShow_2">取消</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
      
      
      <!--<strong style="color:#6699CC ;">{{addPeopleName_2}}</strong>-->
      
      
      <!--/查看部门信息/-->
      <div class="showDiv_1" v-show="addPartShow_3">
      	<div class="replaceCon_1">
      		<!--//-->
      		<div class="container">
      			<div class="page-header text-center">
						  <h1>查看部门信息</h1>
						</div>

   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">部门名称:</strong>
   	        		<div class="">
   	        			<strong style="color:#6699CC ;">{{addPartName_2}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">部门描述:</strong>
   	        		<div class="">
   	        			<strong style="color:#6699CC ;">{{addPartTips_2}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-top: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-4 clearfix">
   	        		<strong style="float: left;margin-right: 10px;">是否启用:</strong>
   	        		<div class="">
   	        			<strong style="color:#6699CC ;">{{addPartIfOpen_2 == '0' ? '启用' : '停用'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="underline" style="padding: 10px 20px;border-bottom: 1px solid #ccc;"></div>
   	        
   	        <h4 style="text-align: center;margin-bottom:20px;margin-top: 10px;">权限</h4>
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">待办事项:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addTDListEdit_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addTDListView_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">订单管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addOrderEdit_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addOrderView_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">用户管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addUserEdit_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addUserView_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">店铺管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addShopEdit_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addShopView_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">统计分析:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addSAEdit_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addSAView_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="row" style="margin-bottom: 10px;">
   	        	<div class="col-lg-3"></div>
   	        	<div class="col-lg-5">
   	        		<strong style="float: left;margin-right: 40px;">系统管理:</strong>
   	        		<div class="" style="float: left;margin-right:40px;">
   	        			<strong style="float: left;font-style: normal;">编辑:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addSystemEdit_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        		<div class="">
   	        			<strong style="float: left;font-style: normal;">查看:</strong>
   	        			<strong style="color:#6699CC ;margin-left: 10px;">{{addSystemView_2 == '0' ? '关闭' : '开启'}}</strong>
   	        		</div>
   	        	</div>
   	        </div>
   	        <!--row-->
   	        
   	        <div class="underline" style="padding: 10px 20px;border-bottom: 1px solid #ccc;"></div>
   	        
      		</div>
      		<!--//-->
      		
      		<div style="width:144px;margin: 10px auto;">
      			<button class="btn btn-info" @click="addPartShow_3 = !addPartShow_3">确认</button>
      		</div>
      	</div>
      	<!--replaceCon-->
      </div>
      <!--showDiv-->
  </div>
</template>

<script>
export default {
  name: 'authorityManagement',
  data () {
    return {
      rootData:[],
      //alert框
      readOrEditDiv:false,
      alertMsg:'',
      //权限展示编辑按钮
      showEditBtn:false,
      //获取部门列表下标
      indexPartData:'',
      //分页相关
      showPageNum:10,
      goInputValue:'',
      currentPage:1,
      totalPage:'',
      //权限数组
      readRoot:'',
      writeRoot:'',
      //添加部门展示相关
      addPartShow:false,
      addPartName_1:'',
      addPartTips_1:'',
      addPartIfOpen_1:'0',
      addTDListEdit_1:'',
      addTDListView_1:'',
      addOrderEdit_1:'',
      addOrderView_1:'',
      addUserEdit_1:'',
      addUserView_1:'',
      addShopEdit_1:'',
      addShopView_1:'',
      addSAEdit_1:'',
      addSAView_1:'',
      addSystemEdit_1:'',
      addSystemView_1:'',
      //编辑部门展示相关
      addPartShow_2:false,
      addPartName_2:'',
      addPartTips_2:'',
      addPartIfOpen_2:'0',
      addTDListEdit_2:'0',
      addTDListView_2:'0',
      addOrderEdit_2:'0',
      addOrderView_2:'0',
      addUserEdit_2:'0',
      addUserView_2:'0',
      addShopEdit_2:'0',
      addShopView_2:'0',
      addSAEdit_2:'0',
      addSAView_2:'0',
      addSystemEdit_2:'0',
      addSystemView_2:'0',
      //查看展示
      addPartShow_3:false
    }
  },
  created:function(){
		this.initGetRoot();
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
		//初始化列表
		initPeopleList:function(){
			let self = this;
			let jsonStr = JSON.stringify({
			    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
			    'parameters':{
			    	'page':'',
			    	'pageNum':(this.showPageNum).toString()
			    }
			});
			let url = 'http://192.168.1.57:8080/Department/Department.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('初始化:');
				console.log(result);
				if(result.cod = '001' && result.result.departments != ''){
                	if(result.result.departments != ''){
                		self.rootData = result.result.departments;
                		self.totalPage = result.result.departments[0].num;
                	}else{
                		self.showAlertTips(true,'服务器错误,无返回结果...');
                	}
                }
			});
		},
		//清空编辑确定的事件
		clearEditEve:function(){
			this.addPartName_1 = '';
			this.addPartTips_1 = '';
			this.addPartIfOpen_1 = '';
			this.addTDListEdit_1 = '';
			this.addTDListView_1 = '';
			this.addOrderEdit_1 = '';
			this.addOrderView_1 = '';
			this.addUserEdit_1 = '';
			this.addUserView_1 = '';
			this.addShopEdit_1 = '';
			this.addShopView_1 = '';
			this.addSAEdit_1 = '';
			this.addSAView_1 = '';
			this.addSystemEdit_1 = '';
			this.addSystemView_1 = '';
		},
		//添加部门按钮
		addPartBtn:function(){
			if(this.writeRoot == 1){
				this.addPartShow = true;
				this.clearEditEve();
			}else{
			    this.showAlertTips(true,'您没有编辑权限,无法使用添加功能...');
			}
		},
		//确定添加部门按钮事件
		sureAddPartBtn:function(){
			let rootArray = [
			[this.addTDListEdit_1 == false ? 0 : 1,this.addTDListView_1 == false ? 0 : 1],
			[this.addOrderEdit_1 == false ? 0 : 1,this.addOrderView_1 == false ? 0 : 1],
			[this.addUserEdit_1 == false ? 0 : 1,this.addUserView_1 == false ? 0 : 1],
			[this.addShopEdit_1 == false ? 0 : 1,this.addShopView_1 == false ? 0 : 1],
			[this.addSAEdit_1 == false ? 0 : 1,this.addSAView_1 == false ? 0 : 1],
			[this.addSystemEdit_1 == false ? 0 : 1,this.addSystemView_1 == false ? 0 : 1]
			];
			if(this.deName != ''){
				let self = this;
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_DEPARTMENT_INSERTDEPA',
					'parameters':{
						'deName':this.addPartName_1,
						'deValue':this.addPartTips_1,
						'deState':(this.addPartIfOpen_1).toString(),
						'jur':rootArray
					}
				});
				let url = 'http://192.168.1.57:8080/Department/Department.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('添加部门:');
					console.log(result);
					if(result.cod == '001' && result.describa == '成功执行'){
				   	  	self.initPeopleList();
				   	}else{
				   	  	self.showAlertTips(true,'服务器错误,操作失败...');
				   	}
				});
			}else{
				this.showAlertTips(true,'部门名称等重要信息为空,操作失败...');
			}
			this.addPartShow = false;
		},
		//编辑按钮事件
		editBtnEve:function(item){
			let self = this;
			this.addPartShow_2 = true;
			this.indexPartData = this.rootData.indexOf(item);
			this.addPartName_2 = this.rootData[this.indexPartData].deName;
			this.addPartTips_2 = this.rootData[this.indexPartData].deValue;
			this.addPartIfOpen_2 = this.rootData[this.indexPartData].deState;
			
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_DEPARTMENT_FINDDEJUR',
				'parameters':{
					'deId':this.rootData[this.indexPartData].deId
				}
			});
			let url = 'http://192.168.1.57:8080/Department/Department.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('编辑:');
				console.log(result);
				if(result.cod = '001' && result.describa == '成功执行'){
                	self.addTDListEdit_2 = result.result.jurisdictions[0][1] == 0 ? false : true,
					self.addTDListView_2 = result.result.jurisdictions[0][0] == 0 ? false : true,
					self.addOrderEdit_2 = result.result.jurisdictions[1][1] == 0 ? false : true,
					self.addOrderView_2 = result.result.jurisdictions[1][0] == 0 ? false : true,
					self.addUserEdit_2 = result.result.jurisdictions[2][1] == 0 ? false : true,
					self.addUserView_2 = result.result.jurisdictions[2][0] == 0 ? false : true,
					self.addShopEdit_2 = result.result.jurisdictions[3][1] == 0 ? false : true,
					self.addShopView_2 = result.result.jurisdictions[3][0] == 0 ? false : true,
					self.addSAEdit_2 = result.result.jurisdictions[4][1] == 0 ? false : true,
					self.addSAView_2 = result.result.jurisdictions[4][0] == 0 ? false : true,
					self.addSystemEdit_2 = result.result.jurisdictions[5][1] == 0 ? false : true,
					self.addSystemView_2 = result.result.jurisdictions[5][0] == 0 ? false : true
                }else{
                	self.showAlertTips(true,'服务器错误,数据获取失败...')
                }
			});
		},
		//确认编辑添加部门
		sureEditAddBtn:function(){
			let self = this;
			let rootArray_1 = [
			[this.addTDListEdit_2 == false ? 0 : 1,this.addTDListView_2 == false ? 0 : 1],
			[this.addOrderEdit_2 == false ? 0 : 1,this.addOrderView_2 == false ? 0 : 1],
			[this.addUserEdit_2 == false ? 0 : 1,this.addUserView_2 == false ? 0 : 1],
			[this.addShopEdit_2 == false ? 0 : 1,this.addShopView_2 == false ? 0 : 1],
			[this.addSAEdit_2 == false ? 0 : 1,this.addSAView_2 == false ? 0 : 1],
			[this.addSystemEdit_2 == false ? 0 : 1,this.addSystemView_2 == false ? 0 : 1]
			];
			
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_DEPARTMENT_UPDATEJURDE',
				'parameters':{
					'deId':this.rootData[this.indexPartData].deId,
					'deName':this.addPartName_2,
					'deValue':this.addPartTips_2,
					'deState':(this.addPartIfOpen_2).toString(),
					'jur':rootArray_1
				}
			});
			console.log(jsonStr);
			let url = 'http://192.168.1.57:8080/Department/Department.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('确认编辑:');
				console.log(result);
				if(result.cod == '001' && result.describa == '成功执行'){
				   	  	self.initPeopleList();
				   	}else{
				   	  	self.showAlertTips(true,'服务器错误,操作失败...');
				   	}
			});
			this.addPartShow_2 = false;
		},
		//查看按钮事件
		showPartListEve:function(item){
			let self = this;
			this.addPartShow_3 = true;
			this.indexPartData = this.rootData.indexOf(item);
			this.addPartName_2 = this.rootData[this.indexPartData].deName;
			this.addPartTips_2 = this.rootData[this.indexPartData].deValue;
			this.addPartIfOpen_2 = this.rootData[this.indexPartData].deState;
			
			let jsonStr = JSON.stringify({
				'api':'YCADMIN_DEPARTMENT_FINDDEJUR',
				'parameters':{
					'deId':this.rootData[this.indexPartData].deId
				}
			});
			let url = 'http://192.168.1.57:8080/Department/Department.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('查看:');
				console.log(result);
				if(result.cod = '001' && result.describa == '成功执行'){
                	self.addTDListEdit_2 = result.result.jurisdictions[0][1],
					self.addTDListView_2 = result.result.jurisdictions[0][0],
					self.addOrderEdit_2 = result.result.jurisdictions[1][1],
					self.addOrderView_2 = result.result.jurisdictions[1][0],
					self.addUserEdit_2 = result.result.jurisdictions[2][1],
					self.addUserView_2 = result.result.jurisdictions[2][0],
					self.addShopEdit_2 = result.result.jurisdictions[3][1],
					self.addShopView_2 = result.result.jurisdictions[3][0],
					self.addSAEdit_2 = result.result.jurisdictions[4][1],
					self.addSAView_2 = result.result.jurisdictions[4][0],
					self.addSystemEdit_2 = result.result.jurisdictions[5][1],
					self.addSystemView_2 = result.result.jurisdictions[5][0]
                }else{
                	self.showAlertTips(true,'服务器错误,数据获取失败...')
                }
			});
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
				    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
				    'parameters':{
				    	'page':'1',
				    	'pageNum':(this.showPageNum).toString()
				    }
				});
			let url = 'http://192.168.1.57:8080/Department/Department.do';
			this.ajaxGet(url,jsonStr,function(result){
				console.log('首页:');
				console.log(result);
				if(result.cod = '001' && result.result.departments != ''){
                	if(result.result.departments != ''){
                		self.rootData = result.result.departments;
                		self.totalPage = result.result.departments[0].num;
                		self.currentPage = 1;
                	}else{
                		self.rootData = [];
                		self.showAlertTips(true,'该搜索无返回结果...');
                	}
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
				    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
				    'parameters':{
				    	'page':(this.totalPage).toString(),
				    	'pageNum':(this.showPageNum).toString()
				    }
				});
				let url = 'http://192.168.1.57:8080/Department/Department.do';
				this.ajaxGet(url,jsonStr,function(result){
					console.log('尾页:');
					console.log(result);
					if(result.cod = '001' && result.result.departments != ''){
	                	if(result.result.departments != ''){
	                		self.rootData = result.result.departments;
	                		self.totalPage = result.result.departments[0].num;
	                		self.currentPage = self.totalPage;
	                	}else{
	                		self.rootData = [];
	                		self.showAlertTips(true,'该搜索无返回结果...');
	                	}
	                }
				});
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		prevPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage > 1){
					let self = this;
					let jsonStr = JSON.stringify({
					    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
					    'parameters':{
					    	'page':(--this.currentPage).toString(),
					    	'pageNum':(this.showPageNum).toString()
					    }
					});
					let url = 'http://192.168.1.57:8080/Department/Department.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('上一页:');
						console.log(result);
						if(result.cod = '001' && result.result.departments != ''){
		                	if(result.result.departments != ''){
		                		self.rootData = result.result.departments;
		                		self.totalPage = result.result.departments[0].num;
		                	}else{
		                		self.rootData = [];
		                		self.showAlertTips(true,'该搜索无返回结果...');
		                	}
		                }
					});
				}else{
					this.showAlertTips(true,'页码错误,操作失败...');
				}
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		nextPage:function(){
			if(this.readRoot == 1){
				if(this.currentPage < this.totalPage){
					let self = this;
					let jsonStr = JSON.stringify({
					    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
					    'parameters':{
					    	'page':(++this.currentPage).toString(),
					    	'pageNum':(this.showPageNum).toString()
					    }
					});
					let url = 'http://192.168.1.57:8080/Department/Department.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('下一页:');
						console.log(result);
						if(result.cod = '001' && result.result.departments != ''){
		                	if(result.result.departments != ''){
		                		self.rootData = result.result.departments;
		                		self.totalPage = result.result.departments[0].num;
		                	}else{
		                		self.rootData = [];
		                		self.showAlertTips(true,'该搜索无返回结果...');
		                	}
		                }
					});
				}else{
					this.showAlertTips(true,'页码错误,操作失败...');
				}
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		},
		goTo:function(){
			if(this.readRoot == 1){
				if(this.currentPage > 1){
					let self = this;
					let jsonStr = JSON.stringify({
					    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
					    'parameters':{
					    	'page':(this.goInputValue).toString(),
					    	'pageNum':(this.showPageNum).toString()
					    }
					});
					let url = 'http://192.168.1.57:8080/Department/Department.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('跳转:');
						console.log(result);
						if(result.cod = '001' && result.result.departments != ''){
		                	if(result.result.departments != ''){
		                		self.rootData = result.result.departments;
		                		self.totalPage = result.result.departments[0].num;
		                		self.currentPage = self.goInputValue;
		                	}else{
		                		self.rootData = [];
		                		self.showAlertTips(true,'该搜索无返回结果...');
		                	}
		                }
					});
				}else{
					this.showAlertTips(true,'页码错误,操作失败...');
				}
			}else{
				this.showAlertTips(true,'没有读取权限,点也没有用...');
			}
		}
	},
	watch:{
		showPageNum:function(newValue,oldValue){
			if(this.readRoot == 1){
				let self = this;
				let jsonStr = JSON.stringify({
					    'api':'YCADMIN_DEPARTMENT_FINDDEPARTMENTS',
					    'parameters':{
					    	'page':(this.currentPage).toString(),
					    	'pageNum':newValue.toString()
					    }
					});
					let url = 'http://192.168.1.57:8080/Department/Department.do';
					this.ajaxGet(url,jsonStr,function(result){
						console.log('页码更新:');
						console.log(result);
						if(result.cod = '001' && result.result.departments != ''){
		                	if(result.result.departments != ''){
		                		self.rootData = result.result.departments;
		                		self.totalPage = result.result.departments[0].num;
		                	}else{
		                		self.rootData = [];
		                		self.showAlertTips(true,'该搜索无返回结果...');
		                	}
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

</style>
