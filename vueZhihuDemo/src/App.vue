<template>
      <swiper :options="swiperOption" ref="swiper" class="swiper" :style="{height:phoneInnerHeight}">
        <swiper-slide class="menu">
           <div class="menuCon">
              <div class="menuHead">    
              </div>
              <ul class="menuUl">
                  <li @click="returnMain">
                      首页
                  </li>
                  <li v-for="(item,index) in menu" :key="index" @click="getItemOneNew(item)">
                      {{item.name}}
                  </li>
              </ul>
          </div>
        </swiper-slide>
        <swiper-slide class="content">
          <div class="menu-button" :class="{ 'cross': menuCross }" @click="toggleMenu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <div class="index">
            <div class="header">
              {{headerTitle}}
            </div>
            <!-- <router-view></router-view> -->
            <div class="childVueCon">
              <Main v-show="showMainFlag" @showNewEve="showNewEve"></Main>
              <Menu v-show="showMenuFlag" :newOneIfo="newOneIfo" @getMenuNewId="getMenuNewId"></Menu>
              <New v-show="showNewFlag" :getMainNewIfo="getMainNewIfo"></New>
            </div>
          </div>
        </swiper-slide>
      </swiper>
</template>

<script>
import Menu from './pages/Menu'
import Main from './pages/Main'
import New from './pages/New'
  export default {
    data() {
      const self = this
      return {
        menuCross: false,
        swiperOption: {
          initialSlide: 1,
          resistanceRatio: 0,
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          on: {
            slideChange() {
              if (this.activeIndex === 0) {
                self.menuCross = true
              } else {
                self.menuCross = false
              }
            }
          }
        },
        phoneInnerHeight:"",
        menu:'',
        newOneIfo:'',
        showMainFlag:true,
        showMenuFlag:false,
        showNewFlag:false,
        getMainNewIfo:'',
        headerTitle:'知乎日报'
      }
    },
    components:{
      Menu,Main,New
    },
    created(){
      this.initMenu();
      this.initPageHeight();
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      }
    },
    methods: {
      toggleMenu() {
        if (this.swiper.activeIndex === 0) {
          this.swiper.slideNext()
        } else {
          this.menuCross = false
          this.swiper.slidePrev()
        }
      },
      initPageHeight(){
        let height = window.innerHeight;  
        this.phoneInnerHeight = height + 'px';
      },
      //初始化菜单选项
      initMenu(){
          this.$axios.get('https://news-at.zhihu.com/api/4/themes').then((result) => {
              console.log('菜单')
              console.log(result);
              this.menu = result.data.others;
          }).catch((err) => {
              
          });
      },
      returnMain(){
        this.showMainFlag = true;
        this.showNewFlag = false;
        this.showMenuFlag = false;
      },
      getItemOneNew(item){
        this.headerTitle = item.name;

        this.showMainFlag = false;
        this.showNewFlag = false;
        this.showMenuFlag = true;

        this.$axios.get('https://news-at.zhihu.com/api/4/theme/' + item.id).then((result) => {
            console.log('获取菜单消息');
            console.log(result.data);
            this.newOneIfo = result.data.stories;
        }).catch((err) => {
            
        });
      },
      showNewEve(id){
        this.showNewFlag = true;
        this.showMainFlag = false;
        this.showMenuFlag = false;
        this.getMainNewId = id;

        this.$axios.get('https://news-at.zhihu.com/api/4/news/' + id).then((result) => {
            console.log('获取最新消息');
            console.log(result.data);
            this.getMainNewIfo = result.data.body;
        }).catch((err) => {
            
        });
      },
      getMenuNewId(id){
        this.showNewFlag = true;
        this.showMainFlag = false;
        this.showMenuFlag = false;
        this.$axios.get('https://news-at.zhihu.com/api/4/news/' + id).then((result) => {
            console.log('获取菜单消息');
            console.log(result.data);
            this.getMainNewIfo = result.data.body;
        }).catch((err) => {
            
        });
      }
    }
  }
</script>

<style scoped>
  .index{
    width: 100%;
    height: 100%;
    background-color: #F0F0F0;
    /* overflow: scroll; */
  }
  .index .childVueCon{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .menu {
    min-width: 100px;
    width: 70%;
    max-width: 320px;
    background-color: #CDC0B0;
    color: #fff;
  }
  .content {
    width: 100%;
  }
  .menu-button {
    position: absolute;
    top: 0px; 
    left: 0px;
    padding: 8px;
    cursor: pointer;
    -webkit-transition: .3s;
    transition: .3s;
    background-color: #CDC0B0;
  }
  .menu-button .bar:nth-of-type(1) {
    margin-top: 0px;
  }
  .menu-button .bar:nth-of-type(3) {
    margin-bottom: 0px;
  }
  .bar {
    position: relative;
    display: block;
    width: 25px;
    height: 3px;
    margin: 3px auto;
    background-color: #fff;
    border-radius: 10px;
    -webkit-transition: .3s;
    transition: .3s;
  }
  
  .header{
    height: 31px;
    text-align: center;
    line-height: 31px;
  }

.menuCon{
  width: 100%;
}
.menuHead{
    height: 31px;
}
.menuUl{
    list-style: none;
}
.menuUl li{
    box-sizing: border-box;
    width: 100%;
    height: 31px;
    line-height: 31px;
    border-bottom: 1px solid #fff;
    padding-left: 10px;
    color: #2B2B2B;
    transition: all 0.2s;
}
.menuUl li:hover{
    background-color: #ccc;
    color: #2B2B2B;
}

.index{
  width: 100%;
  height: 100%;
}
</style>
