<template>
  <div class="menu">
    <ul>
      <!-- <router-link tag="li" to="/" class="index on" @click="toChange(0)">
        <p>首页</p>
      </router-link>

      <router-link tag="li" to="/search" class="search" @click="toChange(1)">
        <p>搜索</p>
      </router-link>

      <router-link tag="li" to="/about" class="about" @click="toChange(2)">
        <p>关于</p>
      </router-link>-->
      <li class="index on" @click="toChange(0)">
        <p>首页</p>
      </li>
      <li class="search" @click="toChange(1)">
        <p>搜索</p>
      </li>
      <li class="about" @click="toChange(2)">
        <p>关于</p>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    toChange: function(num) {
      switch (num) {
        case 0:
          this.changeStyle(num);
          break;
        case 1:
          this.changeStyle(num);
          break;
        case 2:
          this.changeStyle(num);
          break;
      }
    },
    changeStyle: function(num) {
      let lis = document.getElementsByTagName("li");
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.remove("on");
      }
      lis[num].classList.add("on");
      this.to(num);
    },
    to: function(num) {
      switch (num) {
        case 0:
          this.$router.push({ path: "/movie" });
          break;
        case 1:
          this.$router.push({ path: "/search" });
          break;
        case 2:
          this.$router.push({ path: "/about" });
          break;
      }
    }
  }
};
</script>


<style scoped>
.menu {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 1.3rem;
  width: 100%;
  background-color: #eeeeee;
}
.menu ul {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu ul li {
  height: 100%;
  width: 100%;
  text-align: center;
  position: relative;
}
.menu ul li.index {
  background: url("../assets/imgs/home.png") no-repeat top;
  background-position-y: 0.05rem;
  background-size: 0.8rem 0.8rem;
}
.menu ul li.search {
  background: url("../assets/imgs/search.png") no-repeat top;
  background-position-y: 0.05rem;
  background-size: 0.8rem 0.8rem;
}
.menu ul li.about {
  background: url("../assets/imgs/profile.png") no-repeat top;
  background-position-y: 0.05rem;
  background-size: 0.8rem 0.8rem;
}
.menu ul li p {
  position: absolute;
  bottom: 0.06rem;
  line-height: 100%;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
}

.menu ul li.on p {
  color: #333;
}
.menu ul li.index.on {
  background: url("../assets/imgs/home-actived.png") no-repeat top;
  background-position-y: 0.05rem;
  background-size: 0.8rem 0.8rem;
}
.menu ul li.search.on {
  background: url("../assets/imgs/search-actived.png") no-repeat top;
  background-position-y: 0.05rem;
  background-size: 0.8rem 0.8rem;
}
.menu ul li.about.on {
  background: url("../assets/imgs/profile-actived.png") no-repeat top;
  background-position-y: 0.05rem;
  background-size: 0.8rem 0.8rem;
}
</style>
