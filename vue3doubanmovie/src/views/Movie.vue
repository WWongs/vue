<template>
  <div id="movie">
    <van-loading color="white" v-if="isAllShow"/>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white" @change="bannerChange">
        <van-swipe-item v-for="(item, index) in todayMovieData" :key="index">
          <img :src="item.images.small" @click="toDetail(item)">
        </van-swipe-item>
        <div
          class="custom-indicator"
          slot="indicator"
        >{{ currentIndex + 1}}/{{ todayMovieTotalNum }}</div>
      </van-swipe>
    </div>
    <!-- banner -->
    <div class="list">
      <div class="title">今日电影</div>
      <div class="itemCon clearfix">
        <div class="item" v-for="(item, index) in todayMovieData" :key="index" @click="toDetail(item)">
          <img :src="item.images.small" alt>
        </div>
      </div>
      <!-- itemCon -->
    </div>
    <!-- list -->
    <div class="list">
      <div class="title">top250系列</div>
      <div class="itemCon clearfix">
        <div class="item" v-for="(item, index) in top250Data" :key="index" @click="toDetail(item)">
          <img :src="item.images.small" alt>
        </div>
      </div>
    </div>
    <!-- list -->
  </div>
  <!-- movie -->
</template>

<script>
export default {
  name: "movie",
  data() {
    return {
      city: "",
      todayMovieData: [],
      todayMovieTotalNum: 0,
      top250Data: [],
      currentIndex: 0,
      isAllShow: false
    };
  },
  beforeCreate() {
    let that = this;
    that.city = that.$route.params.city;
  },
  mounted() {
    this.getAllMovieToShow();
  },
  methods: {
    //获取今天电影banner &start=0&count=10
    getTodayMovie: function() {
      let that = this;
      let city = that.$route.params.city;
      let url = `http://localhost:8080/api/in_theaters?city=${city}`;
      that.$axios.get(url).then(function(result) {
        // console.table(result.data.subjects);
        that.todayMovieData = result.data.subjects;
        that.todayMovieTotalNum = result.data.subjects.length;
      });
    },
    //获取top250
    getTop250: function() {
      let that = this;
      let url = `http://localhost:8080/api/top250?start=0&count=15`;
      that.$axios.get(url).then(function(result) {
        // console.table(result.data.subjects);
        that.top250Data = result.data.subjects;
        that.isAllShow = false;
      });
    },
    //电影全部获取才显示
    getAllMovieToShow: function() {
      let that = this;
      that.isAllShow = true;
      that.getTodayMovie();
      that.getTop250();
    },
    //跳转到详情
    toDetail: function(item) {
        this.$router.push({ name: "Detail", params: {id: item.id}});
    },
    // banner显示下标
    bannerChange: function(index) {
      this.currentIndex = index;
    }
  }
};
</script>


<style scoped>
@import "../assets/css/movie.css";
</style>
