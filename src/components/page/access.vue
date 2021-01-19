<template>
    <good-page class=" access">
        <good-breadcrumb :list="constant.breadcrumb.access" />
         <div class="layout">
            <good-box class="height-250 margin-bottom-15 align-center overflow-hidden" :data="list">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="minutetData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span class="color-999">近24分钟在线访问量</span>
            </good-box>

            <good-box class="height-250 margin-bottom-15 align-center overflow-hidden" :data="list">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="hourData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span class="color-999">24小时访问量</span>
            </good-box>

            <good-box class="height-250 align-center overflow-hidden" :data="list">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="dayData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span class="color-999">近30日访问量</span>
            </good-box>
         </div>
    </good-page>
</template>

<script>
import gsap from "gsap";
    export default {
        data: function(){
            return {
                filePath:global.filePath,
                list:'',
                data:{},
                google:"t-20014",
                init:{
                    pagesize:10,
                    page:0 ,
                    total:0,
                    currentPage1:1,
                },
                minutetData: {
                    width:20,
                    labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                    series:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
                },
                hourData: {
                    labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                    series:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
                },
                dayData: {
                    labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                    series:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
                },
                chartOptions: {
                    width: '100%',
                    height: 200,
                    low: 0,
                    showArea: true
                }
            }
        },
        created: function() {
            console.log(666)
            this.dataList();
            this.dataList2();
            this.dataList3();
        },
        watch: {
            'init.page': 'dataList',
            'init.pagesize': 'dataList',
        },
        methods: {
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                }
                    this.$axios.post("../phpajax/good.php",data).then(res => {
                    this.data=res.data;
                    console.log(this.data)

                    this.$set(this.minutetData,'labels',this.data.minute.time)
                    this.$set(this.minutetData,'series',[this.data.minute.data])
                    })
            },
            dataList2(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                }
                    this.$axios.post("../phpajax/good2.php",data).then(res => {
                    this.data=res.data;
                    console.log(this.data)

                    this.$set(this.hourData,'labels',this.data.hour.time)
                    this.$set(this.hourData,'series',[this.data.hour.data])
                    })
            },
            dataList3(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                }
                    this.$axios.post("../phpajax/good3.php",data).then(res => {
                    this.data=res.data;
                    console.log(this.data)
                    this.$set(this.dayData,'labels',this.data.day.time)
                    this.$set(this.dayData,'series',[this.data.day.data])
                    })
            },
     
        },
    }
</script>
<style type="text/css" scope>
.access .ct-major-second{height: 200px;}
.access .ct-series-a .ct-bar, 
.access .ct-series-a .ct-line, 
.access .ct-series-a .ct-point, 
.access .ct-series-a .ct-slice-donut {
    stroke: var(--primary)!important;
}
.access .ct-series-a .ct-area, 
.access .ct-series-a .ct-slice-donut-solid, 
.access .ct-series-a .ct-slice-pie{
  fill: var(--primary)!important;
}
.access .ct-label {
    color: rgba(0,0,0,.2)!important;
}
.access .ct-grid {
    stroke: rgba(0,0,0,.2)!important;
    stroke-width: 1px;
    stroke-dasharray: 2px;
}

.access .ct-chart {height: 200px;}
</style>