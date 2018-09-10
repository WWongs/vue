<template>
    <div class="new">
        <div class="body" v-html="getMainNewIfo">
            
        </div>
    </div>
</template>


<script>
export default {
    props:['getMainNewIfo'],
    data(){
        return{
            
        }
    },
    methods:{

    }
       
}
</script>


<style scoped>
.new{
    width: 100%;
    height: 100%;
    /* overflow: scroll; */
    position: relative;
    /* z-index: ; */
}
.body{
    overflow: scroll;
    height: 100%;
    background-color: #fff;
}
</style>
