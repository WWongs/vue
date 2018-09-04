<template>
    <div class="login">
        <section class="material-half-bg">
      <div class="cover"></div>
    </section>
    <section class="login-content">
      <div class="logo">
        <h1>意厨后台管理系统</h1>
      </div>
      <div class="login-box">
        <div class="login-form">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-user"></i>登录界面</h3>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input id="userName" class="form-control" type="text" placeholder="Username" autofocus>
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input class="form-control" type="password" placeholder="Password" id="passWord">
          </div>
          <div class="form-group">
            <p id="showTips" style="color:#8B0000;display: none;"></p>
          </div>
          <div class="form-group btn-container">
            <button  id="loginBtn" class="btn btn-primary btn-block"><i class="fa fa-sign-in fa-lg fa-fw"></i>登录</button>
          </div>
        </div>
        <form class="forget-form">
          <h3 class="login-head"><i class="fa fa-lg fa-fw fa-lock"></i>Forgot Password ?</h3>
          <div class="form-group">
            <label class="control-label">EMAIL</label>
            <input class="form-control" type="text" placeholder="Email">
          </div>
          <div class="form-group btn-container">
            <button class="btn btn-primary btn-block"><i class="fa fa-unlock fa-lg fa-fw"></i>RESET</button>
          </div>
          <div class="form-group mt-3">
            <p class="semibold-text mb-0"><a href="#" data-toggle="flip"><i class="fa fa-angle-left fa-fw"></i> Back to Login</a></p>
          </div>
        </form>
      </div>
    </section>  
    </div>
</template>

<script>
export default {
    
}
</script>


<style scoped>

</style>
