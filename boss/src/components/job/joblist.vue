<template>
    <div id='main'>
        <div class='main_fixed_top'>
            <div class='job_header clear'>
                <div class='job_header_left'>
                    <span>WEB前端</span>
                    <span>HTML5</span>
                </div>
                <div class='inforight job_header_icon'>
                    <span>
                        <i class='iconfont icon-jiahao'></i>
                    </span>
                    <span>
                        <i class='iconfont icon-sousuo'></i>
                    </span>
                </div>
            </div>
            <div class='job_nav'>
                <ul class='flex_parent'>
                    <li class='flex_child'
                        v-for="(nav, index) in navlist"
                        :class="{selected: nav.isSelected}"
                        @click='changeColor(nav, index)'
                    >{{ nav.title }}<span class='icon-down'></span></li>
                </ul>
                <!-- 引入其他的组件并使用 -->
                <!-- 第一个子组件 -->
                <slideTabComp
                v-show="navlist[0].isSelected"
                @toParent='fromChild'
                @hide='hide'
                :slideTemp='slideTemp'
               
                ></slideTabComp>
                <!-- 第二个子组件 -->
                <selectCityComp
                v-show="navlist[1].isSelected"
               
                 @hide='hide'
                ></selectCityComp>
                <!-- 第三个子组件 -->
                <compRequireComp
                v-show="navlist[2].isSelected"
                :slideTemp='slideTemp'
                :indexArr='indexArr'
                 @hide='hide'
                ></compRequireComp>
                <!-- 第四个子组件 -->
                 <compRequireComp
                v-show="navlist[3].isSelected"
                :slideTemp='slideTemp'
                :indexArr='indexArr'
                 @hide='hide'
                ></compRequireComp>
            </div>
        </div>
        <div class='job_content'>
            <!--职位信息-->
            <!--
                 v-infinite-scroll='loadMore'  指定加载函数
                 infinite-scroll-disabled='loading'  由变量决定加载是否执行
                  infinite-scroll-distance='50'  设置距离底部多少时，开始执行加载方法
            -->
            <ul class='page-infinite-list job_lists' 
                v-infinite-scroll='loadMore'
                infinite-scroll-disabled='loading'
                infinite-scroll-distance='50'
            >
                <li v-for="(job, index) in jobs">
                    <!-- 路由跳转到职位详情，并传入参数job.id -->
                    <router-link :to="{name:'detail', params:{jobId:job.id}}">
                        <h4 class='clear'>
                             {{ job.need_job }}
                             <span class='inforight'>{{ job.job_money }}</span>
                        </h4>
                        <p class='clear'>
                            <span>{{ job.conmpany }}</span>
                        </p>
                        <p class="clear">
                            <span class='icon-position'></span>
                            <span>{{ job.con_place }}</span>
                            <span class='icon-seniority'></span>
                            <span>{{ job.seniority }}</span>
                            <span class='icon-education'></span>
                            <span>{{ job.education }}</span>
                        </p>
                        <p class="clear title">
                            <img :src="job.src" alt="" class='infoleft'>
                            <span class='infoleft'>{{ job.ceo }}</span>
                            <span class='infoleft'>{{ job.title }}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
            <div v-show='loading' class='page-infinite-loading'>
                <mt-spinner type='fading-circle'></mt-spinner>正在加载更多...
            </div>
        </div>
    </div>
</template>
<script>
//加载推荐子组件
import slideTabComp from './slideTabComp';
//加城市子组件
import selectCityComp from './selectCityComp';
//公司和要求是公用一个组件的
import compRequireComp from './compRequireComp';

export default {
    data () {
        return {
            //一个json文件中保存了 我们想要的数据
            //需要请求数据的地址
            apiUrl:'',
            //保存职位
            jobs:[],
            //保存职位，模拟无限下拉加载
            temp: [],
            //加载更多是否显示
            loading : false,
            //导航列表的数据
            navlist : [
                {title: '推荐', isSelected:false},
                {title: '上海', isSelected:false},
                {title: '公司', isSelected:false},
                {title: '要求', isSelected:false},
            ],
            //当前点击的nav的下标，所谓是否显示当前组件的条件
            slideIndex:'',
            //保存当前下拉组件的数据
            slideTemp:[],
            //传递给后面两个组件的数据
            indexArr : [[0], [0], [0]],
            //下拉组件中的数据,包含了三个组件的数据 不包括上海
            slideData:[
                    [
                        {
                            "name":"推荐",
                            "hadSelested":true
                        },
                        {
                            "name":"最新",
                            "hadSelested":false
                        }
                    ],
                  
                    [0,1],
                    [
                        {
                            title:"融资规模",
                            isCheckbox:true,
                            list:["全部","未融资","天使轮","A轮","B轮","C轮","D轮及以上","已上市","不需要融资"]
                        },
                        {
                            title:"团队规模",
                            isCheckbox:true,
                            list:["全部","0-20人","20-99人","100-499人","500-999人","1000-9999人","10000人以上"]
                        },
                        {
                            title:"行业",
                            isCheckbox:true,
                            list:["全部","非互联网行业","健康医疗","生活服务","旅游","金融","信息安全","广告营销","数据服务","智能硬件","文化娱乐","网络招聘",
                                "分类信息","电子商务","移动互联网","企业服务","社交网络","教育培训","O2O","游戏","互联网","媒体","IT软件"]
                        }
                    ],
                    [
                        {
                            title:"最低学历",
                            isCheckbox:true,
                            list:["全部","中专及以下","高中","大专","本科","硕士","博士"]
                        },
                        {
                            title:"经验",
                            isCheckbox:true,
                            list:["全部","应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]
                        },
                        {
                            title:"薪资(单选)",
                            isCheckbox:false,
                            list:["全部","3k以下","3k-5k","5k-10k","10k-20k","20k-50k","50k以上"]
                        },
                    ]
                ],

        }
    },
    methods : {
        //接收自子组件传递过来的参数
        fromChild(msg){
            //将父组件中的标题改为子组件传递过来的参数
            this.navlist[0].title = msg
        },
        //清空所有的选中的效果,点击阴影区域，让子组件不显示
        hide () {
             this.navlist.forEach(function (value) {
                    value.isSelected = false;
                })
        },
        //改版导航颜色
        changeColor (nav, index) {
            //保存当前点击的下拉选项的下标，作为是否显示当前组件的条件
            this.slideIndex = index;
            //通过索引值，取到当前组件的数据，保存起来
            this.slideTemp = this.slideData[index];
            if (nav.isSelected) {
                nav.isSelected = false;
            } else {
                //先清后加
                this.navlist.forEach(function (value) {
                    value.isSelected = false;
                })
                 nav.isSelected = true;
            }
        },
        //初始化apiUrl信息
        initApiUrl () {
            var url = 'http://'+window.location.host+'/';
            this.apiUrl = url + 'static/data/joblist.json';
            //console.log(this.apiUrl);
        },
        //加载职位信息的数据
        loadData () {
            this.$http.get(this.apiUrl).then(
                //接受返回信息
                response => {
                    if (response.data.code == '0') {
                        //将请求到的job信息保存再jobs数组中
                        this.jobs = response.data.main;
                        this.temp = response.data.main;
                    }
                }
            )
            //如果有错误就捕获错误信息
            .catch(error=>{
                console.log('数据请求出错了');
            })
            
        },
        //加载更多方法
        loadMore () {
            //console.log(123123);
            this.loading = true;
            setTimeout(()=>{
                //整合两个数组，使this.jobs有更新，这样页面中才会更新数据
                //每次执行 往jobs中新增十条数据
                this.jobs = this.jobs.concat(this.temp);
                //console.log(this.jobs);
                this.loading = false;
            }, 3000);
           
        }
    },
    created () {
        //实例创建完成就会执行
        this.initApiUrl();
        this.loadData();
    },
    components:{
        slideTabComp,
        selectCityComp,
        compRequireComp
    }
}
</script>
<style scoped>

</style>