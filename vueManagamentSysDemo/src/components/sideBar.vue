<template>
    <div class="side-bar">
    
    <aside class="app-sidebar">
      <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg" alt="User Image">
        <div>
          <p class="app-sidebar__user-name" v-text="userName"></p>
          <!--<p class="app-sidebar__user-designation">Frontend Developer</p>-->
        </div>
      </div>
      <ul class="app-menu">
        <li><a class="app-menu__item active" href="##"><i class="app-menu__icon fa fa-dashboard"></i><router-link to="/" tag="span" class="app-menu__label" >待办事项</router-link></a></li>
        
        <li><a class="app-menu__item" href="##"><i class="app-menu__icon fa fa-pie-chart"></i><router-link to="/StatisticalAnalysis" tag="span" class="app-menu__label" >统计分析</router-link></a></li>
        
        <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-laptop"></i><span class="app-menu__label">订单管理</span><i class="treeview-indicator fa fa-angle-right"></i></a>
          <ul class="treeview-menu">
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> <router-link to="/OrderList" tag="span" class="app-menu__label">订单列表</router-link></a></li>
          </ul>
        </li>
       
        <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-edit"></i><span class="app-menu__label">用户管理</span><i class="treeview-indicator fa fa-angle-right"></i></a>
          <ul class="treeview-menu">
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> <router-link to="/UserList" tag="span" class="app-menu__label">用户列表</router-link></a></li>
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> <router-link to="/UserAuthentication" tag="span" class="app-menu__label">用户认证</router-link></a></li>
          </ul>
        </li>
        
        <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-th-list"></i><span class="app-menu__label">店铺管理</span><i class="treeview-indicator fa fa-angle-right"></i></a>
          <ul class="treeview-menu">
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i>  <router-link to="/ShopList" tag="span" class="app-menu__label">店铺列表</router-link></a></li>
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> <router-link to="/ShopAuthentication" tag="span" class="app-menu__label">店铺认证</router-link></a></li>       
          </ul>
        </li>
        
        <li class="treeview"><a class="app-menu__item" href="#" data-toggle="treeview"><i class="app-menu__icon fa fa-file-text"></i><span class="app-menu__label">系统管理</span><i class="treeview-indicator fa fa-angle-right"></i></a>
          <ul class="treeview-menu">
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> <router-link to="/EmployeeManagement" tag="span" class="app-menu__label">员工管理</router-link></a></li>
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> <router-link to="/AuthorityManagement" tag="span" class="app-menu__label">权限管理</router-link></a></li>
            <li><a class="treeview-item" href="##"><i class="icon fa fa-circle-o"></i> 系统管理</a></li>
          </ul>
        </li>
      </ul>
    </aside>
    <!--aside-->
    </div>
</template>

<script>


export default {
    data(){
        return{
            userName:'未登录'
        }
    },
    created(){
      
    },
    methods:{
        //初始化mian.js手风琴效果
        initMain(){
            var treeviewMenu = $('.app-menu');

            // Toggle Sidebar
            $('[data-toggle="sidebar"]').click(function(event) {
                event.preventDefault();
                $('.app').toggleClass('sidenav-toggled');
            });

            // Activate sidebar treeview toggle
            $("[data-toggle='treeview']").click(function(event) {
                
                event.preventDefault();

                if(!$(this).parent().hasClass('is-expanded')) {
                    treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
                }
                $(this).parent().toggleClass('is-expanded');
            });

            // Set initial active toggle
            $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

            $(".app-menu__item").click(function(){
                const lis = $(".app-menu__item");
                for(let i = 0 ; i < lis.length; i++){
                    $(".app-menu__item").eq(i).removeClass('active');    
                }
                $(this).addClass('active');         
            })
        },
        //初始化用户名
        initUSerName(){
          if(localStorage.getItem('username')){
            this.userName = localStorage.getItem('username');
          }else{
            this.userName = '未登录';
          }
        }
    },
    mounted () {
        this.initMain();
        this.initUSerName();
    }
}
</script>


<style scoped>

</style>