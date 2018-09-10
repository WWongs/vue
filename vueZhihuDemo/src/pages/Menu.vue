<template>
    <div class="menuCon">
        <div class="h_Con">
            <!-- <p v-text="newOneIfo"></p> -->
            <p v-for="(item,index) in newOneIfo" :key="index" @click="getMenuNewId(item.id)">
                {{item.title}}
            </p>
        </div>
    </div>
</template>


<script>
export default {
    props:['newOneIfo'],
    methods:{
       getImage(url){
            // 把现在的图片连接传进来，返回一个不受限制的路径
            if(url !== undefined){
                return url.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
            }
        },
        getMenuNewId(id){
            this.$emit('getMenuNewId',id);
        }
    }, 
    mounted(){
        
    }
}
</script>


<style scoped>
.heart{
    width: 100%;
    height: 100%;
    position: relative;
    /* z-index: 0;  */
}
.h_Con{
    width: 100%;
    height: 100%;
    margin: 5px 0px;
    position: relative;
}
.h_Con p{
    color: #383838;
    margin: 10px;
}
</style>
