<template>
  <div class="MV_s">
    <div class="MV-container">
      <div class="MV-top-warp">
        <div class="MV-top-container">
          <div class="area">
             <div>地区:</div> 
            <ul>
              <li :class="{active:area=='全部'}" @click="area='全部'">全部</li>
              <li :class="{active:area=='内地'}" @click="area='内地'">内地</li>
              <li :class="{active:area=='港台'}" @click="area='港台'">港台</li>
              <li :class="{active:area=='欧美'}" @click="area='欧美'">欧美</li>
              <li :class="{active:area=='日本'}" @click="area='日本'">日本</li>
              <li :class="{active:area=='韩国'}" @click="area='韩国'">韩国</li>
            </ul>
          </div>
          <div class="type">
              <div>类型:</div>
            <ul>
                <li :class="{active:type=='全部'}" @click="type='全部'">全部</li>
                <li :class="{active:type=='官方版'}" @click="type='官方版'">官方版</li>
                <li :class="{active:type=='原声'}" @click="type='原声'">原声</li>
                <li :class="{active:type=='现场版'}" @click="type='现场版'">现场版</li>
                <li :class="{active:type=='网易出品'}" @click="type='网易出品'">网易出品</li>
            </ul>
          </div>
          <div class="order">
              <div>排序:</div>
            <ul>
                <li :class="{active:order=='上升最快'}" @click="order='上升最快'">上升最快</li>
                <li :class="{active:order=='最热'}" @click="order='最热'">最热</li>
                <li :class="{active:order=='最新'}" @click="order='最新'">最新</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="MV-list-warp">
          <div class="MV-list-container">
              <div>MV列表</div>
              <div></div>
          </div>
      </div>
      <div class="MV-body-warp">
            <div class="MV-body-container">
                <div class="items">
                    <div class="MV-picture"  @mouseover="mouseOver_s(index)" @mouseleave="mouseLeave_s" v-for="(item,index) in list" :key='index'>
                        <div class="picture">
                            <img :src="item.cover" alt="">
                        </div>
                        <div class="button">
                            <span class="pic"></span>
                            <span class="number">{{item.playCount}}</span>
                        </div>
                        <span class="open" :style="{display:(index==id)? 'block':'none'}" @click="open_mv(item.id)"></span>
                        <p class="text">{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
            <!-- 页面跳转 -->
            <el-pagination class="page"
                @current-change="handCurrentChange"
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="page"
                :page-size="12"
            >
            </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'mv',
    data(){
        return{
            list:'',
            //总条数
            total:0,
            //页码
            page:0,
            //页容量
            limit:12,
            //地区
            area:'全部',
            //类型
            type:'全部',
            //排序
            order:'上升最快',
            //mv播放按钮的标志
            id:undefined,

        }
    },
    created(){
        //获取数据
        this.getlist();
    },
    //侦听器
    watch:{
        area(){
            this.getlist();
            this.page=1;
        },
        type(){
            this.getlist();
            this.page=1;
        },
        order(){
            this.getlist();
            this.page=1;
        }

    },
    methods:{
        getlist:function(){
            axios({
           url:'https://autumnfish.cn/mv/all',
           method:'get',
           params:{
               area:this.area,
               type:this.type,
               order:this.order,
               //数量
               limit:this.limit,
               //偏移值
               offset:(this.page-1)*this.limit,
           } 
        }).then(res=>{
            console.log(res);
            this.list=res.data.data;
            this.total=res.data.code;
            //处理次数
            for (let i=0;i<this.list.length;i++){
                if(this.list[i].playCount>100000){
                    this.list[i].playCount=parseInt(this.list[i].playCount/10000)+"万"
                }
            }

        })
        },
        //返回页数，
        handCurrentChange(val){
            this.page=val;
            // this.offset=(this.page-1)*this.limit;
            this.getlist();
        },
        mouseOver_s:function(i){
            this.id=i;
        },
        mouseLeave_s:function(){
            this.id=undefined;
        },
         //播放mv
        open_mv:function(id){
            this.id=id;
        this.$router.push(`/MV2?q=${this.id}`);
        }
    },

};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  font-size: 15px;
}
.MV_s {
  width: 100%;
  height: 100%;
}
.MV-container {
  width: 1100px;
  height: 1030px;
  /* background: red; */
  margin: 0px auto;
  overflow: hidden;
  border: 1px solid #242424;
}
.MV-container > .MV-top-warp {
  width: 900px;
  height: 250px;
  margin: 10px auto;
  /* background: green; */
}
.MV-container > .MV-top-warp >.MV-top-container{
    width: 100%;
    height: 100%;
}
.MV-container > .MV-top-warp >.MV-top-container>.area,.type,.order{
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
}
.MV-container > .MV-top-warp >.MV-top-container>div{
    font-weight: bold;
    float: left;
}
/* .MV-container > .MV-top-warp >.MV-top-container>div::before{
    
} */
.MV-container > .MV-top-warp >.MV-top-container ul{
    float: left;
    list-style: none;
}
.MV-container > .MV-top-warp >.MV-top-container li{
    float: left;
    width: 65px;
    margin-left: 70px;
    font-weight: normal;
    cursor: pointer;
}
.MV-container>.MV-list-warp{
    width: 100%;
    height: 30px;
    /* background:yellow; */
}
.MV-container>.MV-list-warp>.MV-list-container{
    width: 100%;
    display: flex;
    align-items: center;
}
.MV-container>.MV-list-warp>.MV-list-container>div:nth-of-type(1){
    font-size: 27px;
    font-weight: 500;
    float: left;
    margin-left: 10px;
}
.MV-container>.MV-list-warp>.MV-list-container>div:nth-of-type(2){
    width: 985px;
    float: left;
    height: 3px;
    background: #c20c0c;
}
.MV-container > .MV-body-warp{
    width: 1100px;
    height: 650px;
    margin: 0px auto;
    padding-top: 10px;
    /* border-top: 3px solid #c20c0c; */
}
.MV-container>.MV-body-warp>.MV-body-container{
    width: 100%;
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture{
    width: 250px;
    height: 170px;
    margin: 25px 0px 0px 20px;
    float: left;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture>.picture{
    width: 100%;
    height: 150px;
    position: relative;
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture>.picture>img{
    width: 100%;
    height: 100%;   
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture>.button{
    position: absolute;
    top: 0px;
    right: 0px;
    display:flex;
    align-items: center;
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture>.button>.pic{
    display: inline-block;
    border:7px solid #f5f5f5;
    border-color: transparent transparent transparent #f5f5f5;

    
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture>.button>.number{
    display: inline-block;
    color: #f5f5f5;
}
.MV-container>.MV-body-warp>.MV-body-container>.items>.MV-picture>.open{
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    margin-top:-20px;
    left: 50%;
    margin-left: -20px;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?a73f83340161324a07a20ed814c4f00b) no-repeat -32px -137px;
    
}
.active{
    color:coral;
}
.MV-container>.page{
    width: 500px;
    /* background: red; */
    margin: 0px auto;
}

</style>
