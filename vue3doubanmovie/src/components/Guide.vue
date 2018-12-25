<template>
  <div class="guide">
    <div class="goApp" @click="go">开始体验</div>
  </div>
  <!-- app -->
</template>

<script>
export default {
  name: "guide",
  data() {
    return {
      city: "长沙"
    };
  },
  created() {},
  mounted() {},
  methods: {
    go: function() {
      let that = this;
      let city = that.city;
      // setTimeout(function() {
      //   that.$bus.$emit("getCity", that.city);
      // }, 5);

      that.$router.push({ name: "Movie", params: {city: city}});
    }
  }
};
</script>

<style lang="less">
.guide {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #fff;
  background: url("../assets/imgs/guide.jpg") no-repeat center center;
  background-size: cover;
}
.goApp {
  line-height: 1rem;
  text-align: center;
  position: absolute;
  bottom: 1.8rem;
  left: 50%;
  width: 3rem;
  margin-left: -1.5rem;
  background-color: rgba(64, 88, 109, 0.4);
  color: #fff;
  border: 1px solid rgba(64, 88, 109, 0.8);
  border-radius: 2rem;
  font-size: 0.4rem;
}
</style>
