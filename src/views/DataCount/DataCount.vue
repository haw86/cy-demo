<style scoped lang="less">

</style>
<template>
   <div class="DataCount-area">
       <div class="top-box">
           
       </div>
        
        <div class="DataCount-box">
            <div class="public-card business-box">
                <div class="card-title">销售额概况</div>
                <div class="card-body">
                    <div id="businessChart" :style="{height: '300px'}"></div>
                </div>
            </div>
            <div class="public-card pay-box">
                <div class="card-title">销售额占比</div>
                <div class="card-body">
                    <div id="payChart" :style="{height: '300px'}"></div>
                </div>
            </div>
            <div class="public-card sales-box">
                <div class="card-title">支付方式占比</div>
                <div class="card-body">
                    <div id="salesChart" :style="{height: '300px'}"></div>
                </div>
            </div>
            
        </div>
   </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },

        mounted(){
            this.businessFn();
            this.payFn();
            this.salesFn();
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
                            data : ['2018-01-01','2018-01-02','2018-01-03','2018-01-04','2018-01-05','2018-01-06','2018-01-07','2018-01-08','2018-01-09','2018-01-10'],
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
                            data:[10, 52, 200, 334, 390, 330, 220,25,233,480]
                        }
                    ]
                });
            },

            //支付方式占比
            payFn(){
                let myChart = this.$echarts.init(document.getElementById('payChart'))
                
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:['支付宝','微信','银联卡','其它']
                    },
                    series: [
                        {
                            name:'支付方式占比',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'支付宝'},
                                {value:310, name:'微信'},
                                {value:234, name:'银联卡'},
                                {value:135, name:'其它'}
                            ]
                        }
                    ]
                });
            },
            
            //销售额占比
            salesFn(){
                let myChart = this.$echarts.init(document.getElementById('salesChart'))
                
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:['实收','折让','积分抵扣','抹零']
                    },
                    series: [
                        {
                            name:'支付方式占比',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'实收'},
                                {value:310, name:'折让'},
                                {value:234, name:'积分抵扣'},
                                {value:135, name:'抹零'}
                            ]
                        }
                    ]
                });
            }
            
        }
    }
</script>
