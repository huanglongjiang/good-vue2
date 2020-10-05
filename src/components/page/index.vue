<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.log" />
        <good-box :data="true">
        <div class="color-white clearfix padding-10">
            
        
            <div class="height-210 align-center radius-5 padding-20 padding-20 float-left margin-right-20 margin-bottom-20" style="background: rgb(84, 173, 88); width: 48%; min-width: 400px; max-width: 500px;">
                <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="chartData"
                    :options="chartOptions" >
                </chartist>
            </div>

            <div class="height-210 align-center radius-5 padding-20 padding-20 float-left margin-right-20 margin-bottom-20" style="background:#962eaf; width: 48%; min-width: 400px; max-width: 500px;">
                <chartist
                    ratio="ct-major-second"
                    type="Bar"
                    :data="chartData"
                    :options="chartOptions" >
                </chartist>
            </div>
            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: #f7ba2a; width: 28%; min-width: 500px;"><div>当前用户访问次数<span class=" block font-size-24 padding-top-10">10</span></div><div class="margin-top-20">上一次访问时间是<span class=" block font-size-24 padding-top-10">2020-08-21 13:14:45</span></div></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background:#f7ba2a; width: 28%; min-width: 500px;"><span>用户</span><span class="block font-size-36 margin-top-30 align-center">82</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(32, 160, 255); width: 28%; min-width: 500px;"><span>文章</span><span class="block font-size-36 margin-top-30 align-center">82</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(32, 160, 255); width: 28%; min-width: 500px;"><span>访问</span><span class="block font-size-36 margin-top-30 align-center">82</span></div>
        </div>
        </good-box>
    </good-page>
</template>

<script>
    export default {
        data: function(){
            return {
                list:'',
                google:"t-20008",
                init:{
                    pagesize:10,
                    page:0 ,
                    total:0,
                    currentPage1:1,
                },
                chartData: {
                    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
                    series:[[0,0,0,0,0,0,0]]
                },
                chartOptions: {
                    width: 460,
                    height: 150,
                    low: 0,
                    axisX: {
                    labelInterpolationFnc: function(value, index) {
                      return 30 % 2 === 0 ? 10 : null;
                    }
                  }
                }
            }
        },
        created: function() {
            this.dataList();
        },
       
        methods: {
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    
                    this.$set(this.chartData,'labels',res.data.online_date)
                    this.$set(this.chartData,'series',[res.data.online])
                })
            },
     
        },
    }
</script>
<style type="text/css">
.ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut {
    stroke: hsla(0,0%,100%,.8);
}
.ct-label {
    color: hsla(0,0%,100%,.7);
}
.ct-grid {
    stroke: hsla(0,0%,100%,.2);
    stroke-width: 1px;
    stroke-dasharray: 2px;
}

.ct-chart {height: 150px;}
</style>