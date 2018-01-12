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
    .today-box{
        .count-num{
            text-align: center;
            line-height: 300%;
            font-size: 28px;
            color:#222222;
        }
    }
</style>
<template>
   <div class="home-area">
       
        <div class="home-box">
            
            <div class="public-title">今日概览</div>
            <Row>
                <Col span="8" :style="{'padding-right':'20px'}">
                    <div class="public-card today-box">
                        <div class="card-title">销售额</div>
                        <div class="card-body">
                            <div class="count-num">￥9885.30</div>
                        </div>
                    </div>
                </Col>
                <Col span="8" :style="{'padding-right':'20px'}">
                    <div class="public-card today-box">
                        <div class="card-title">订单数</div>
                        <div class="card-body">
                            <div class="count-num">568</div>
                        </div>
                    </div>
                </Col>
                <Col span="8">
                    <div class="public-card today-box">
                        <div class="card-title">新增会员数</div>
                        <div class="card-body">
                            <div class="count-num">137</div>
                        </div>
                    </div>
                </Col>
            </Row>
            
            
            <div class="public-card business-box">
                <div class="card-title">销售额概况</div>
                <div class="card-body">
                    <div id="businessChart" :style="{height: '300px'}"></div>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
    export default {
        data () {
            return {
                title:"",
                themfffe1: 'light'
            }
        },

        mounted(){
            this.businessFn();
        },

        methods: {

            //销售额概况
            businessFn(){
                let myChart = this.$echarts.init(document.getElementById('businessChart'))
                
                myChart.setOption({
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['9点','10点','11点','12点','13点','14点','15点','16点','17点','18点'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel:{
                                rotate:30
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'直接访问',
                            type:'line',
                            barWidth: '10%',
                            data:[50, 80, 200, 334, 500, 680, 550,650,233,800]
                        }
                    ]
                });
            }
            
        }
    }
</script>