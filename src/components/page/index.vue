<template>
    <good-page>
        <good-breadcrumb :list="constant.breadcrumb.index" />
        <div>

        <div class="color-white margin-bottom-15 clearfix flex">
            <div class="height-120 margin-right-15 radius-5 padding-20 padding-top-10 width-300" style="background:linear-gradient(60deg, #2180FB, var(--primary));"><div>当前用户访问次数<span class=" font-size-24 padding-top-10 position-r top-3 margin-left-10">{{login_total}}</span></div><div class=" font-size-16 padding-top-10">上一次访问时间是<span class=" block font-size-24 padding-top-10">{{data.last_time}}</span></div></div>

            <div class="item height-120 background-red margin-right-15 radius-5 padding-20" style="background:linear-gradient(60deg, #66bb6a, var(--primary));"><span>用户</span><span class="block font-size-36 align-center">{{user_total}}</span></div>

            <div class="item height-120 background-red margin-right-15 radius-5 padding-20" style="background:linear-gradient(60deg, #962eaf, var(--primary));"><span>文章</span><span class="block font-size-36 align-center">{{article_total}}</span></div>
            <div class="item height-120 background-red radius-5 padding-20" style="background: linear-gradient(60deg, #ec4c49, var(--primary));"><span>访问</span><span class="block font-size-36 align-center">{{rizhi_total}}</span></div>
            </div>

         <div class="color-white flex align-center margin-bottom-15">
            <div class="height-220 align-center radius-5 margin-right-15 width-300" style="background:#ec4c49">
                <div class="height-110 width-300 radius-5 padding-top-20"><span>今日访问</span><span class="block font-size-36 align-center  padding-top-10">{{today_total}}</span></div>

                <div class="height-110 width-300radius-5 padding-top-20"><span>昨日访问</span><span class="block font-size-36 align-center  padding-top-10">{{yesterday_total}}</span></div>
            </div>


            <div class="height-220 align-center radius-5 padding-20 margin-right-15 item" style="background: rgb(84, 173, 88);">
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

            <div class="height-220 align-center radius-5 padding-20 item" style="background:#962eaf;">
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

         </div>



          <div class="flex">

<div class="table-data item margin-right-15 background-white" style="box-shadow: 0px 0px 3px #ccc">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th colspan="4">
                              <div class="color-ccc"><i class="fa fa-list padding-right-10 "></i>最新文章</div>
                            </th>
                        </tr>
                        <tr>
                            <th>图片</th>
                            <th>发布作者</th>
                            <th>标题</th>
                            <th>发布时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in articleList">
                            <tr>
                                <td>
                                    <div class="line-height-30 padding-3">
                                        <template v-if="item.file!=''">
                                        <img :src="filePath+'/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-if="item.file.length>7">
                                        <img :src="'http://www.good1230.com/good/RandomUser/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-else>
                                    </template>
                                    <template v-else>
                                        <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 radius-20 block">
                                    </template>
                                    </div>
                                    
                                </td>
                                <td>{{item.account}}</td>
                                <td>
                                    <div class="width-max break">
                                        <span>{{item.title}}</span>
                                    </div>
                                </td>
                                <td>{{item.insertTime}}</td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>


      <div class="table-data item margin-right-15 background-white" style="box-shadow: 0px 0px 3px #ccc">
        <div class="table-data">
                <table class="table-group line-height-30">
                    <thead class="block-header">
                        <tr>
                            <th colspan="4">
                              <div class="color-ccc"><i class="fa fa-user padding-right-10 "></i>最新注册用户</div>
                            </th>
                        </tr>
                        <tr>
                            <th>用户头像</th>
                            <th>用户名</th>
                            <th>注册时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(item,index) in userList">
                            <tr>
                                <td>
                                    <div class="line-height-30 padding-3">
                                        <template v-if="item.file!=''">
                                        <img :src="filePath+'/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-if="item.file.length>7">
                                        <img :src="'http://www.good1230.com/good/RandomUser/'+item.file" alt="" class="width-30 height-30 radius-20 block" v-else>
                                    </template>
                                    <template v-else>
                                        <img src="static/images/tianmao.jpg" alt="" class="width-30 height-30 radius-20 block">
                                    </template>
                                    </div>
                                    
                                </td>
                                <td><span>{{item.name}}</span></td>
                                
                                <td>{{item.time}}</td>
                            </tr>
                        </template>
                    </tbody>    
                </table> 
            </div>
      </div>
      </div>
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
                userList: [],
                articleList: [],
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
                    width: '100%',
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
            this.dataList2();
            this.dataList3();
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
            dataList2(){
                const data={
                    "google":"t-10010",
                    "operating":"lists",
                    "pagesize":10,
                    "page":0,
                }
              
                this.$axios.post(global.APIPATH,data).then(res => {
                     console.log(res)
                    this.userList=res.data.data;
                });
            },
            dataList3(){
                const data={
                    "google":"t-10008",
                    "operating":"lists",
                    "pagesize":10,
                    "page":0,
                }
                this.$axios.post(global.APIPATH,data).then(res => {
                    this.articleList=res.data.data;
                });
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
.flex{

  display: flex;
  flex-direction: row 
}
.item{flex: 1}
.item2{width: 100px;}
.table-data .table-group{background:#fff;}
</style>