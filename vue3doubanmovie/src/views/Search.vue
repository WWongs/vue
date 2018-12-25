<template>
  <div id="search">
    <van-loading color="white" v-if="isAllShow"/>
    <div class="header">
      <input
        class="search"
        type="text"
        placeholder="请在此输入搜索内容"
        v-model="searchValue"
        @blur="getSearchValue"
      >
    </div>
    <!-- header -->
    <div class="body">
      <vue-better-scroll style="height:15.4rem" :pullUpLoad="pullUpLoadObj" @pullingUp="onPullingUp">
        <div
          class="item"
          v-for="(item, index) in allSearchData"
          :key="index"
          @click="toDetail(item)"
        >
          <img :src="item.images.small">
          <div class="detail">
            <p class="title">标题：{{ item.title }}</p>
            <p class="sub-title">
              演员：
              <span v-for="(item, index) in item.casts" :key="index">{{ item.name }}</span>
            </p>
            <p class="artists">
              导演：
              <span v-for="(item, index) in item.directors" :key="index">{{ item.name }}</span>
            </p>
          </div>
          <div class="rating">
            <p>{{ item.rating.average }}</p>
          </div>
        </div>
        <!-- item -->
      </vue-better-scroll>
    </div>
    <!-- body -->
    <div class="loading" v-show="isLoading">
      <img src="../assets/imgs/loading.gif" alt>
      <span>玩命加载中...</span>
    </div>
    <!-- loading -->
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchValue: "",
      isLoading: false,
      start: 0,
      count: 9,
      allSearchData: [],
      isAllShow: false,
      //better
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "没有更多数据了",
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //失去焦点得到input
    getSearchValue: function() {
      // console.log(this.searchValue);
      if(this.searchValue == ''){
        return 'none';
      }
      let that = this;
      that.showLoading(true);
      let value = that.searchValue;
      let url = `http://localhost:8080/api/search?q=${value}&start=${
        that.start
      }&count=${that.count}`;
      that.$axios.get(url).then(function(result) {
        // console.table(result.data.subjects);
        that.showLoading(false);
        result.data.subjects.forEach(element => {
          if (element) {
            that.allSearchData.push(element);
          }else{
            that.$toast('没有更多数据了...');
          }
        });
      });
      that.ifNoneMovieData();
    },
    //跳转到详情
    toDetail: function(item) {
      this.$router.push({ name: "Detail", params: { id: item.id } });
    },
    // 展示loading
    showLoading: function(method) {
      let that = this;
      that.isAllShow = method;
    },
    //模拟没有数据
    ifNoneMovieData: function() {
       let that = this;
        setTimeout(function() {
          if(that.allSearchData == ''){
              that.showLoading(false);
              that.$toast('没有更多数据了...');
          }
        }, 5000);
    },
    // 滚动到页面顶部
    onPullingUp() {
      // 模拟上拉 加载更多数据
      // console.log("上拉加载");
      let that = this;
      that.start += 10;
      that.count += 11;
      that.getSearchValue();
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  z-index: 3;
}
.header .search {
  width: 100%;
  padding: 0.2rem 0.4rem;
  color: #666;
  font-size: 0.38rem;
  text-align: center;
  border: none;
}

.loading {
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading img {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: middle;
  margin-right: 0.2rem;
}

.body {
  padding-bottom: 1.3rem;
}
.item {
  display: flex;
  padding: 0.2rem 0.4rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.item img {
  display: block;
  width: 2.3rem;
  height: 3rem;
  margin-right: 0.2rem;
}
.item .detail {
  flex: 1;
  flex-direction: column;
}
.item .detail .title {
  font-size: 0.32rem;
}
.item .detail .title,
.item .detail .sub-title {
  display: block;
  margin-bottom: 0.2rem;
}
.item .detail .sub-title {
  font-size: 0.22rem;
  color: #c0c0c0;
}
.item .detail .artists {
  font-size: 0.24rem;
  color: #999;
}
.item .detail .sub-title span,
.item .detail .artists span {
  margin-right: 0.2rem;
}

.item .rating p {
  display: inline-block;
  width: 1rem;
  font-size: 0.28rem;
  font-weight: bold;
  text-align: center;
  background-color: rgba(247, 76, 49, 0.8);
  color: #fff;
  padding: 0.1rem;
  border-radius: 0.2rem;
}
</style>
