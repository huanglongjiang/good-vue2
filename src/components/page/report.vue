<template>
    <div class="layout  width-max position-r left-0  border-success margin-top-10">
        <div class="layout margin-10">
            <ol class="breadbar">
              <li><a>后台管理平台</a></li>
              <li class="active">网站流量统计</li>
            </ol>
            <div class="clear"></div>
        </div>
        <div class="layout">
            <div class="table-data" style="margin:0px">
                <table class="table-group line-height-30" style="border-left:0">
                    <thead class="block-header">
                        <tr>
                            <th>头像</th>
                            <th>浏览次数(PV)</th>
                            <th>独立访客(UV)</th>
                            
                        </tr>
                    </thead>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in 3">
                        <tr>
                            <td>今日</td>
                            <td>200</td>
                            <td>200</td>
                        </tr>
                       </template>
                    </tbody>
                </table> 
            </div>
        

        </div>
        <div class="layout margin-top-10">
            <div id="container" style="min-width:400px;height:400px"></div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data: function(){
            return {
                list:'',
                currentPage1: 1,
                rows:0,
                init:{
                    pagesize:10,
                    page:0  ,
                },
            }
        },
        computed: {
            ...mapState(['state']),
        },
        mounted: function() {
            this.dataList();
            $(function(){
                Highcharts.setOptions({
                    colors: ['#d9534f', '#3ba676', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
                });
                var chart = Highcharts.chart('container',{
                chart: {
                    type: 'area'
                },
                title: {
                    text: '近30流量统计'
                },
                subtitle: {
                    text: '数据来源: <a href="http://www.good1230.com">' +
                    'www.good1230.com</a>'
                },
                xAxis: {
                    allowDecimals: false
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000 + 'k';
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name} 制造 <b>{point.y:,.0f}</b>枚弹头'
                },
                plotOptions: {
                    area: {
                        pointStart: 1940,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: '浏览次数(PV)',
                    data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                           1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                           27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                           26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                           24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                           22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                           10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
                }, {
                    name: '独立访客(UV)',
                    data: [null, null, null, null, null, null, null, null, null, null,
                           5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                           4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                           15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                           33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                           35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                           21000, 20000, 19000, 18000, 18000, 17000, 16000,]
                }]
            });
            })
        },
        methods: {
            
            handleSizeChange(val) {
                //console.log(`每页 ${val} 条`);
                this.init.pagesize=val;
                this.dataList();
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.init.page=val-1;
                this.dataList();
            },
           
            dataList(){
                let data={
                    "google":"t-20002",
                    "operating":"lists",
                }
                debugger
                this.$axios.post(global.APIPATH,data).then(res => {
                    
                    this.list=res.data.data;
                    this.rows=res.data.rows;
                    console.log(this.list)
                })
            },
     
        },
    }
</script>
<style>
    .highcharts-credits{display: none;}
</style>