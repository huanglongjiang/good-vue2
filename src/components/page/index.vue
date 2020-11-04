<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.index" />
        <good-box :data="true">
        <div class="color-white clearfix padding-10">
            
        
            <div class="height-220 align-center radius-5 padding-20 padding-20 float-left margin-right-20 margin-bottom-20" style="background: rgb(84, 173, 88); width: 48%; min-width: 400px; max-width: 500px;">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Line"
                    :data="chartData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span>12日内访问量</span>
            </div>

            <div class="height-220 align-center radius-5 padding-20 padding-20 float-left margin-right-20 margin-bottom-20" style="background:#962eaf; width: 48%; min-width: 400px; max-width: 500px;">
                <div>
                    <chartist
                    ratio="ct-major-second"
                    type="Bar"
                    :data="chartData"
                    :options="chartOptions" >
                </chartist>
                </div>
                <span>12日内访问量</span>
            </div>
            <div class="clear"></div>
            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(32, 160, 255); width: 28%; min-width: 360px;"><div>当前用户访问次数<span class=" block font-size-24 padding-top-10">{{login_total}}</span></div><div class="margin-top-20">上一次访问时间是<span class=" block font-size-24 padding-top-10">{{data.last_time}}</span></div></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background:#f7ba2a; width: 28%; min-width: 360px;"><span>用户</span><span class="block font-size-36 margin-top-30 align-center">{{user_total}}</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: #f7ba2a; width: 28%; min-width: 360px;"><span>文章</span><span class="block font-size-36 margin-top-30 align-center">{{article_total}}</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(32, 160, 255); width: 28%; min-width: 360px;"><span>访问</span><span class="block font-size-36 margin-top-30 align-center">{{rizhi_total}}</span></div>

            <div class="width-400 height-180 background-red margin-right-20 margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(247, 186, 42); width: 28%; min-width: 360px;"><span>今日访问</span><span class="block font-size-36 margin-top-30 align-center">{{today_total}}</span></div>

            <div class="width-400 height-180 background-red margin-bottom-20 float-left radius-5 padding-20" style="background: rgb(247, 186, 42); width: 28%; min-width: 360px;"><span>昨日访问</span><span class="block font-size-36 margin-top-30 align-center">{{yesterday_total}}</span></div>
        </div>
        </good-box>
    </good-page>
</template>

<script>
    import gsap from "gsap";
    export default {
        data: function(){
            return {
                list:'',
                data:{},
                data2:{
                    login_total:0,
                    user_total:0,
                    article_total:0,
                    rizhi_total:0,
                    today_total:0,
                    yesterday_total:0,
                },
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
                   /* axisX: {
                        labelInterpolationFnc: function(value, index) {
                          return 30 % 2 === 0 ? 10 : null;
                        }
                    }*/
                }
            }
        },
        created: function() {
            this.dataList();
        },

        computed: {
           /* animatedNumber: function() {
              return this.tweenedNumber.toFixed(0);
            }*/
            login_total(){return this.data2.login_total.toFixed(0);},
            user_total(){return this.data2.user_total.toFixed(0);},
            article_total(){return this.data2.article_total.toFixed(0);},
            rizhi_total(){return this.data2.rizhi_total.toFixed(0);},
            today_total(){return this.data2.today_total.toFixed(0);},
            yesterday_total(){return this.data2.yesterday_total.toFixed(0);},
        },
       
        methods: {
            dataList(){
                const data={
                    "google":this.google,
                    "operating":"lists",
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.data=res.data;
                    this.$set(this.chartData,'labels',res.data.online_date)
                    this.$set(this.chartData,'series',[res.data.online])

                    const data=res.data;
                    gsap.to(this.$data, { duration: 0.5, tweenedNumber: 666666 });
                    gsap.to(this.$data.data2, { duration: 0.5, login_total: data.login_total });
                    gsap.to(this.$data.data2, { duration: 0.5, user_total: data.user_total });
                    gsap.to(this.$data.data2, { duration: 0.5, article_total: data.article_total });
                    gsap.to(this.$data.data2, { duration: 0.5, rizhi_total: data.rizhi_total });
                    gsap.to(this.$data.data2, { duration: 0.5, today_total: data.today_total });
                    gsap.to(this.$data.data2, { duration: 0.5, yesterday_total: data.yesterday_total });
                })
            },
     
        },
    }
</script>
<style type="text/css">
.ct-major-second{height: 160px;}
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