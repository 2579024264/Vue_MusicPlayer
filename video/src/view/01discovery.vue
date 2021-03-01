<template>
<div class="discovery-outside">
    <!-- 轮播图  -->
    <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
               <img :src="item.imageUrl" alt="">
        </el-carousel-item>
    </el-carousel>
<div class="discovery-container">
<!-- 推荐歌单 -->
    <div class="recommend">
        <div class="top">
            <span class="point"></span>
            <h3 class="title">推荐歌单</h3>
            <div class="linear"></div>
        </div>
        
        <!-- 推荐歌单模块 -->
        <div class="items">
                    <!-- 绑定鼠标进入和离开事件,并且把每个元素唯一的标识传给函数 -->
            <div class="item" @mouseleave="mouseLeave(index)"    @mouseover="mouseOver(index)" v-for="(item,index) in list" :key="index">
                    <!-- 根据唯一的标识index进行设计样式的改变 -->
                <div class="item-hidden" :style="{display:(index===id)? 'block':'none'}">
                    <span>{{item.copywriter}}</span>
                </div>
                <div class="item-img">
                    <img :src="item.picUrl" alt="" width="200px" height="200px">
                </div>
                <span class="button" :style="{display:(index===id)? 'block':'none'}" @click="toPlaylist2(item.id)"></span>
                <p class="name"><span>{{item.name}}</span></p>
            </div>
            
            
        </div>
    </div>
<!-- 最新音乐 -->
    <div class="new">
        <div class="top">
            <span class="point"></span>
            <h3 class="title">新碟上架</h3>
            <div class="linear"></div>
        </div>
        <div class="items">
            <div class="item" @mouseover="mouseOver2(index)" @mouseleave2="mouseLeave2"  v-for="(item,index) in newlist" :key="index">
                <div class="item-img">
                    <img :src="item.picUrl" alt="">
                     <div class="item-button" @click="open(item.id,index)"   :style="{display:(index===id2)? 'block':'none'}"></div>
                </div>
                <div class="item-song">
                    <div class="song-name">{{item.name}}</div>
                    <div class="singer">
                        {{item.song.artists[0].name}}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
<!-- 推荐MV -->
    <div class="MV">
        <div class="top">
            <span class="point"></span>
            <h3 class="title">推荐MV</h3>
            <div class="linear"></div>
        </div>
        <div class="items" >
            <div class="item" @mouseover="mouseOver_s(index)" @mouseleave="mouseLeave_s(index)" v-for="(item,index) in MV" :key='index'>
                <div class="item-img" @click="open_mv(item.id)">
                    <img :src="item.picUrl" alt="">
                    <div class="number">
                    <div class="open"></div>
                    <div class="open-number">{{item.playCount}}</div>
                </div>
                <span class="dianji" :style="{display:(index===ids)? 'block':'none'}"></span>
                </div>
                <p class="name">
                    {{item.name}}
                </p>
            </div>
        </div>
    </div>

</div>
</div>
</template>

<script>
//导入axios
import axios from 'axios'
export default {
    name:'discovery',
    data(){
        return{
            //推荐歌单的鼠标进入显示
            id:undefined,
            //轮播图
            banners:[],
            //推荐歌单
            list:[],
            //最新音乐
            newlist:[],
            //推荐MV
            MV:[],
            //推荐MV鼠标进入显示
            ids:undefined,
            //新碟上架鼠标进入显示
            id2:undefined,
            //获取最新音乐的id
            new_id:'',
            //获取最新音乐歌曲的url
            url:''
            
        }
    },
    //生命周期钩子,在页面加载时就运行的函数
    created(){
        axios({
            //轮播图接口
            url:'https://autumnfish.cn/banner',
            method:'get',
        }).then(res=>{
            // console.log(res);
            this.banners=res.data.banners
        }),
        axios({
            //获取推荐歌单
            url:'https://autumnfish.cn/personalized',
            method:'get',
            params:{
                //获取的数据量
                limit:8
            }
        }).then(res=>{
            // console.log(res);
            this.list=res.data.result
        }),
        axios({
            //获取最新上架
            url:'https://autumnfish.cn/personalized/newsong',
            method:'get',
            params:{
                limit:10,
            }
        }).then(res=>{
            this.newlist=res.data.result;
            // console.log(res)
        }),
        axios({
            //获取MV
            url:'https://autumnfish.cn/personalized/mv',
            method:'get',
            params:{
                limit:4,
                order:'最新',
            }
            }).then(res=>{
                this.MV=res.data.result
                console.log(res);
        
        })
    },
    methods:{
        //鼠标进入事件触发
        mouseOver(i){
            this.id=i;
        },
        //鼠标离去触发
        mouseLeave(){
            this.id=undefined
        },
        //  鼠标进入事件触发
        mouseOver2(i2){
            this.id2=i2;
            
        },
        //鼠标离去触发
        mouseLeave2(){
            this.id2=undefined;
           
        },
         //鼠标进入事件触发
        mouseOver_s:function (j) {
            this.ids=j;
        },
        //鼠标离去触发
         mouseLeave_s:function () {
            this.ids=undefined;
        },
        //获取最新音乐的id
        open:function(id){
             axios({
            //获取最新上架
            url:'https://autumnfish.cn/song/url',
            method:'get',
            params:{             
                id:id,
            }
        }).then(res=>{
            this.url=res.data.data[0].url;
            this.$parent.musicUrl=this.url
            // this.$emit("openup",this.url)         
        });
        },
        toPlaylist2:function(id){
            this.$router.push(`/playlist2?q=${id}`);
        },
        open_mv(id){
            this.$router.push(`/MV2?q=${id}`);
        }
    }
}

</script>

<style>
.el-carousel__item img {
    width: 100%;
    height: 100%;
    line-height: 350px;

  }
   .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel--horizontal{
      overflow-x:hidden;
      background-color: #242424;
    /* background :linear-gradient(to right ,red 0%,blue 20%, yellow 100%); */
  }
.discovery-container{
    width: 1100px;
    height: 100%;
    margin: 0px auto;
    border:1px solid #242424;
}
.discovery-outside{
    width: 100%;
    /* height: 100%; */
    background-color: #FFFFFF;
}
.discovery-container .items .item{
    overflow: hidden;
    font-size: 12px;
    /* 文本溢出时显示省略号来代表被修剪的文本 */
  
}

.discovery-container .title{
    padding-left: 20px;
    font-size: 1.5rem;
    font-weight: normal;
    /* margin: 30px 0px; */
    cursor: pointer;    
}
.discovery-container .point{
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 8px;  
    background: radial-gradient( #ffff 0%, #ffff 30%,#c20c02 30%, #c20c0c 100%);
    float: left;
    position: absolute;
    top: 50%;
    margin-top: -8px;
    
}
.discovery-container .top{
    width: 100%;
    position: relative;
    margin-bottom:30px ;
}
.discovery-container .linear{
    width: 100%;
    height: 3px;
    background-color:#c20c0c ;
    position: absolute;
    bottom: -15px;
}
.recommend{
    height: 550px;
    margin: 50px 0px;
}
.items{
    width: 100%;
}
.recommend .items .item{
    position: relative;
    width:200px ;
    height: 200px;
    margin: 3px;
    overflow: hidden;
    padding-left: 35px;
    padding-bottom: 50px;
    float: left;
}
.recommend .items .item .item-hidden{
    position: absolute;
    background-color:#242424;
    opacity: 0.7;
    color: #f5f5f5;
}
.recommend .items .item .item-img{
    width: 200px;
    height: 200px;
}
.recommend .items .item .button {
    width: 30px;
    height: 30px;
    border-radius: 25px;
    position:absolute;
    bottom: 20px;
    right: 0px;
    /* background-color:red; */
    cursor: pointer;
    background:url(https://s2.music.126.net/style/web2/img/iconall.png?dcc1791bd2faa8e5f9ac67a52e0ef5be) no-repeat -45px -20px ;    
}
.recommend .items .name{
    margin:3px;
    width: 200px;
}
.new .items{
    width: 100%;
}
.new{
     
      margin-bottom: 30px;
      height: 660px;
      /* display: flex; */
}
.new .items .item{
    width: 400px;
    height: 80px;
    position: relative;
    padding: 0px 0px 40px 90px;
    float: left;
}
.new>.items>.item>.item-img{
    width: 80px;
    height: 80px;
    overflow: hidden;
    float: left;
    position: relative;
}
.new>.items>.item>.item-img>img{
    width: 100%;
    height: 100%;
}
.new>.items>.item>.item-img>.item-button{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?dcc1791bd2faa8e5f9ac67a52e0ef5be) no-repeat -1px -111px ;
    cursor: pointer;
}
.new>.items>.item>.item-song{
    width: 100px;
    height: 80px;
    float: left;
    position: relative;
    box-sizing: border-box;
    padding:10px;

}
.new>.items>.item>.item-song>.song-name{
    position: absolute;
    top: 0px;
}
.new>.items>.item>.item-song>.singer{
    position: absolute;
    bottom: 0px;
}
.MV{
    width: 100%;
    height: 270px;
    margin-bottom: 30px;
}
.MV .items{
    width: 100%;
}
.MV>.items>.item{
    width: 245px;
    height: 170px;
    float: left;
    overflow: hidden;
    padding-left: 25px;
    padding-top: 20px;
}
.MV>.items>.item>.item-img{
    height: 150px;
    position: relative;
}
.MV>.items>.item>.item-img>img{
    width: 100%;
    height: 100%;
}
.MV>.items>.item>.item-img>.number{
    position: absolute;
    top: 0px;
    right: 0px;
}
.MV>.items>.item>.item-img>.number>.open{
    box-sizing: border-box;
    border-top:6px solid transparent;
     border-bottom:6px solid transparent;
     border-right:8px solid transparent;
     border-left:8px solid white;
    float: left;
    /* margin-right:2px; */
}
.MV>.items>.item>.item-img>.number>.open-number{
    font-weight: 300;
    color: white;
    float: left;
}
.MV>.items>.item>.item-img>.dianji{
    display: block;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    /* background-color: red; */
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?dcc1791bd2faa8e5f9ac67a52e0ef5be) no-repeat -32px -88px;
    cursor: pointer;
}
.MV>.items>.item>.name{ 
    margin:3px;
    width: 250px;
    text-overflow: clip;
    
    
}
</style>
