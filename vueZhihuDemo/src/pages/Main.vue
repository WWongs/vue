<template>
    <div class="main">
        <div class="h_Con" v-for="(item,index) in lastNews" :key="index">
            <!-- <p v-text="newOneIfo"></p> -->
            <img :src="getImage(item.image)" :alt="item.title">
            <a href="##" @click="goNewInterface(item.id)"><strong v-text="item.title"></strong></a>
            <b v-text="item.name?'item.name':'最新消息'"></b>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            lastNews:[]
        }
    },
    created(){
        this.initLastNews();
    },
    methods:{
       initLastNews(){
           this.$axios.get('https://news-at.zhihu.com/api/4/news/latest').then((result) => {
                console.log('mian');
                console.log(result);
                this.lastNews = result.data.top_stories;
                
           }).catch((err) => {
               
           });
       },
       getImage(url){
            // 把现在的图片连接传进来，返回一个不受限制的路径
            if(url !== undefined){
                return url.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
            }
        },
        goNewInterface(id){
            // this.$axios.get('https://news-at.zhihu.com/api/4/news/'+id).then((result) => {
            //     console.log('获取消息');
            //     console.log(result.data);
            // }).catch((err) => {
                
            // });
            this.$emit("showNewEve",id);
        }
    }
}
</script>



<style scoped>
.main{
    width: 100%;
    height: 100%;
    position: relative;
    /* z-index: 1; */
    overflow: scroll;
}
.h_Con{

    width:90%;
    height: 80px;
    background-color: #fff;
    margin: 5px auto;
    position: relative;
    padding: 5px 0;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, .3);
}
.h_Con a{
    text-decoration: none;
    color: #3B3B3B;
}
.h_Con img{
    display: block;
    width: 100px;
    height: 80px;
    float: left;
    border: none;
    margin-right: 8px;
    box-sizing: border-box;
    padding: 0 3px;
}
.h_Con strong{
    /* display: inline-block; */
    font-size: 16px; 
}
.h_Con b{
    position: absolute;
    bottom: 10px;
    left: 105px;
    font-weight: 600;
}
</style>
