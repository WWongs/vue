<template>
    <div class="headerBar">
        <header class="app-header"><a class="app-header__logo" href="index.html">订单管理系统</a>
            <!-- Sidebar toggle button--><a class="" href="#" data-toggle="" aria-label="">登录</a>
            <!-- Navbar Right Menu-->
            <ul class="app-nav">
                <!--Notification Menu-->
                <!-- User Menu-->
                <li class="dropdown"><a class="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i class="fa fa-user fa-lg"></i></a>
                <ul class="dropdown-menu settings-menu dropdown-menu-right">
                    <li @click="login"><a class="dropdown-item" href="##"><i class="fa fa-cog fa-lg"></i> 登录</a></li>
                    <li class="userIfoBtn" style="cursor: pointer;" @click="changeSelfIfo"><a class="dropdown-item"><i class="fa fa-user fa-lg"></i> 个人信息</a></li>
                    <li @click="loginOut"><a class="dropdown-item loginOutBtn" href=""><i class="fa fa-sign-out fa-lg"></i> 退出</a></li>
                </ul>
                </li>
            </ul>
        </header>

		<!-- 登录界面 -->		
		<section class="login-content" v-show="loginShowFlag">
			<div class="login-box">
			<div class="login-form">
			<h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>登录界面</h3>
			<div class="form-group">
				<label class="control-label">用户名</label>
				<input id="userName" class="form-control" type="text" placeholder="Username" autofocus v-model="userName">
			</div>
			<div class="form-group">
				<label class="control-label">密码</label>
				<input class="form-control" type="password" placeholder="Password" id="passWord" v-model="passWord">
			</div>
			<div class="form-group">
				<p id="showTips" style="color:#8B0000;text-align:center;" v-text="tipsP" v-show="tipsShowFlag"></p>
			</div>
			<div class="form-group btn-container">
				<button id="loginBtn" class="btn btn-primary btn-block" @click="loginIn"><i class="fa fa-sign-in fa-lg fa-fw"></i>登录</button>
			</div>
			</div>
		</div>
		</section>
			
		



		<!-- //修改用户信息界面 -->
        <div class="showDiv_1" v-show="showChangeIfo">
      	<div class="replaceCon_1">
      		<h3 style="text-align: center;margin: 10px 0;">修改个人信息界面</h3>
      		<!--//-->
      		<div class="container">
      			<div class="row line-head" style="margin: 20px 0;">
      				<div class="col-lg-3 text-right" style="font-size: 16px;">
		          	修改手机号：
		          </div>
		          <div class="col-lg-4">
		          	<input type="text" placeholder="手机号" v-model="peopleTel"/>
		          </div>
      			</div>
      			<!--row-->
      			<div class="row line-head" style="margin: 20px 0;">
      				<div class="col-lg-3 text-right" style="font-size: 16px;">
		          	修改用户名：
		          </div>
		          <div class="col-lg-4">
		          	<input type="text" placeholder="用户名" v-model="peopleName"/>
		          </div>
      			</div>
      			<!--row-->
      			<div class="row line-head" style="margin: 20px 0;">
      				<div class="col-lg-3 text-right" style="font-size: 16px;">
		          	修改邮箱：
		          </div>
		          <div class="col-lg-4">
		          	<input type="email" placeholder="邮箱" v-model="peopleEmail"/>
		          </div>
      			</div>
      			<!--row-->
      			<div class="row line-head" style="margin: 20px 0;">
      				<div class="col-lg-3 text-right" style="font-size: 16px;">
		          	修改密码：
		          </div>
		          <div class="col-lg-4">
		          	<input v-model="peoplePsd" type="password" placeholder="密码"/>
		          </div>
      			</div>
      			<!--row-->
			    	<!--container-->
      		</div>
      		<!--//-->
      		<div class="showBtn" style="margin: 0 auto;width: 136px;">
      			<button class="btn btn-info sureBtn" style="margin-right: 18px;" @click="sureChangeUserIfo">确定</button>
      			<button class="btn btn-danger falseBtn" @click="showChangeIfo = false">取消</button>
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
    name:'headerBar',
    data(){
        return{
			//登录提示系列
			tipsShowFlag:false,
			tipsP:'',
			//登录输入系列
			showChangeIfo:false,
			loginShowFlag:false,
			userName:'',
			passWord:'',
			//修改个人信息系列
			peopleTel:'',
			peopleName:'',
			peoplePsd:'',
			peopleEmail:'',
			//弹出框相关
			readOrEditDiv:false,
			alertMsg:''
        }
    },
    created(){
		//初始化是否登录
        this.initUserLogin();
    },
    methods:{
		//初始化是否登录
		initUserLogin(){
			if(localStorage.getItem('username')){
				this.loginShowFlag = false;
			}else{
				this.loginShowFlag = true;
			}
		},
		//登录按钮显示对话框
		login(){
			this.loginShowFlag = true;
		},
		//登录事件
		loginIn(){
			const self = this;
			if(this.userName && this.passWord){
				let jsonStr = JSON.stringify({
					'api':'ADMIN_USER_LOGIN',
					'parameters':{
						'phone':this.userName,
						'password':this.passWord,
						'eMail':''
					}
				});
				this.$http.post('http://192.168.1.57:8080/adminUser/adminUser.do',{jsonStr:jsonStr},{emulateJSON:true}).then((result) => {
					console.log(result.body);
					const res = result.body;
					if(res.cod == '001' && res.describa == '成功执行'){
						localStorage.setItem('adminuserId',res.result.backuserId);
						localStorage.setItem('username',res.result.backuserName);
						localStorage.setItem('deName',res.result.deName);
						localStorage.setItem('jurisdictions',JSON.stringify(res.result.jurisdictions));
						self.loginShowFlag = false;
						location.reload();
					}else{
						this.tipsShowFlag = true;
						self.tipsP = '服务器错误,请联系后台...';
					}
				}).catch((err) => {
					console.log(err);
					this.tipsShowFlag = true;
					self.tipsP = '服务器错误,请联系后台...';
				});
			}else{
				this.tipsShowFlag = true;
				this.tipsP = '';
				this.tipsP = '账号或密码为空,请填写完整...';
			}
		},
		//退出事件
		loginOut(){
			localStorage.clear();
			this.loginShowFlag = true;
		},
        //修改个人信息按钮
        changeSelfIfo(){
			this.showChangeIfo = true;
			this.clearUserIfo();            
		},
		//修改个人信息事件
		sureChangeUserIfo(){
			const self = this;
			if(this.peopleTel!='' || this.peopleName!='' || this.peopleEmail!='' || this.peoplePsd!='' ){
				let userId = localStorage.getItem('adminuserId');
				let jsonStr = JSON.stringify({
					'api':'YCADMIN_USER_UPDATEUSER',
					'parameters':{
						'phone':(this.peopleTel).trim(),
						'userId':userId,
						'name':(this.peopleName).trim(),
						'eMail':this.peopleEmail,
						'password':(this.peoplePsd).trim()
					}
				});
				const url = 'http://192.168.1.57:8080/adminUser/adminUser.do';
				this.$http.post(url,{jsonStr:jsonStr},{emulateJSON:true}).then((result) => {
					console.log(result.data);
					const res = result.data;
					if(res.cod = '001' && res.describa == '成功执行'){
						self.changeSuccessTips();
					}else{
						self.showAlertTips(true,'操作失败,服务器错误...');
					}
					
				}).catch((err) => {
					console.log(err);
					self.showAlertTips(true,'操作失败,服务器错误...');
				});
			this.showChangeIfo = false;
			}else{
				this.showChangeIfo = false;
				this.showAlertTips(true,'信息填写为空,操作取消...');
			}
		},
		//清空个人信息事件
		clearUserIfo(){
			this.peoplePsd = '';
			this.peopleTel = '';
			this.peopleName = '';
			this.peopleEmail = '';
		},
		//修改弹出框
		showAlertTips:function(display,word){
			this.readOrEditDiv = display;
			this.alertMsg = word;
		},
		//修改成功提示
		changeSuccessTips(){
			const self = this;
			let timer = null;
			let count = 5;
			self.showAlertTips(true,'信息更新成功,将在5秒后进行跳转...');
			timer = setInterval(function(){
				if(count == 0){
					self.showAlertTips(false,'');
					clearInterval(timer);
					self.$router.push('/');
					self.loginShowFlag = true;
				}else{
					count -- ;
					self.showAlertTips(false,'');
					self.showAlertTips(true,'信息更新成功,将在' + count + '秒后进行跳转...');
				}
			},1000);
		}
    }
}
</script>


<style scoped>

</style>
