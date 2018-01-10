<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
   <div class="home-area">
       欢迎登陆后台！
   </div>
</template>
<script>
    export default {
        data () {
            return {
                title:"",
                themfffe1: 'light'
            }
        }
    }
</script>