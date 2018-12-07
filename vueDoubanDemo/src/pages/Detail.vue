<template>
  <div class="detail">
    <div class="publicHead" @click="goBack">
      <a href="##">
        <img src="../assets/imgs/back.png">
      </a>
      <span>电影详情</span>
    </div>
    <!-- publicHead -->
    <div class="backImg">
      <img :src="detailData.images.medium ? detailData.images.medium : '../assets/imgs/guide.jpg'">
    </div>
    <!-- backImg -->
    <div class="container">
      <div class="head">
        <img :src="detailData.images.small ? detailData.images.medium : '../assets/imgs/guide.jpg'">
        <p class="title">{{ detailData.title }}</p>
        <div class="know">
          <p>评分：{{ detailData.rating.average }}</p>
          <p>
            导演：
            <span v-for="(item, index) in detailData.directors" :key="index">{{ item.name }}</span>
          </p>
          <p>
            主演：
            <span v-for="(item, index) in detailData.casts" :key="index">{{ item.name }}</span>
          </p>
        </div>
      </div>
      <!-- head -->
      <div class="body">
        <p class="title">摘要:</p>
        <p class="content">{{ detailData.summary }}</p>
      </div>
      <!-- body -->
    </div>
  </div>
</template>

<style scoped>
.detail {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 2;
  background-color: #fff;
}
.detail .backImg img {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.1;
  z-index: 1;
}
.container {
  position: relative;
  z-index: 2;
  width: 80%;
  margin: 0 auto;
}
.container .head {
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}
.container .head img {
  width: 100%;
  height: 11rem;
}
.container .head .title {
  width: 100%;
  font-size: 0.5rem;
  line-height: 100%;
  text-align: center;
  margin: 0.3rem auto;
}
.container .head .know {
  margin-top: 0.2rem;
}
.container .head .know p {
  font-size: 0.3rem;
  line-height: 0.5rem;
  color: #888;
  margin-bottom: 0.2rem;
}
.container .head .know p span {
  padding-right: 0.2rem;
}

.container .body {
  padding-top: 1rem;
  padding-bottom: 1.5rem;
}
.container .body .title {
  font-size: 0.5rem;
  margin-bottom: 0.3rem;
}
.container .body .content {
  text-indent: 2em;
  font-size: 0.3rem;
  color: #666;
  line-height: 0.4rem;
}

.publicHead {
  position: absolute;
  width: 100%;
  background-color: #fff;
  text-align: center;
  font-size: 0.4rem;
  line-height: 0.9rem;
  color: #333333;
  /* border-bottom: 1px solid #c5c5c5; */
  background: rgba(0, 0, 0, .1);
  z-index: 3;
}
.publicHead img {
  position: absolute;
  display: block;
  width: 0.22rem;
  height: 0.44rem;
  left: 0.35rem;
  top: 0.25rem;
}
</style>


<script>
export default {
  data() {
    return {
      moiveId: "",
      detailData: {}
    };
  },
  created() {},
  mounted() {
    this.moiveId = this.$route.params.id;
    this.getDetailForId();
  },
  methods: {
    // 根据id获得电影详情
    getDetailForId: function() {
      let that = this;
      let moiveId = that.$route.params.id;
      let url = `http://localhost:8080/api/subject/${moiveId}`;
      that.$axios.get(url).then(function(result) {
        // console.table(result.data);
        that.detailData = result.data;
      });
    },
    //回退
    goBack: function() {
      console.log('1');
        // this.$router.push({ path: '/movie' });
        this.$router.back(-1);
    }
  }
};
</script>
