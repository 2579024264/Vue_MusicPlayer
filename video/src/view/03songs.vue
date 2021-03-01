<template>
  <div class="song">
    <div class="song-container">
        <!-- 头部的外框  用于定位-->
        <div class="song-top-warp">
            <!-- 头部的内容 -->
            <div class="song-info">
                <!-- 图片区 -->
                <div class="picture">
                    <img src="http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150" alt="">
                </div>
                <!-- 右边的文字区 -->
                <div class="topic-warp">
                    <div class="title">
                        <h2>云音乐新歌榜</h2>
                    </div>
                    <div class="use">
                        <li>
                            <span class="open"></span>
                            <span class="text">播放</span>
                        </li>
                        <li>
                            <span>+</span>
                        </li>
                        <li>
                            <span class="shoucang"></span>
                            <span class="number">(2345667)</span>
                        </li>
                        <li>
                            <span class="zhuanfa"></span>
                            <span class="number">(8514)</span>
                        </li>
                        <li>
                            <span class="xiazai"></span>
                            <span class="text">下载</span>
                        </li>
                    </div>
                </div>
            </div>
        </div>
            <!-- 歌曲列表 -->
            <!-- 列表外框，用于定位 -->
            <div class="list-wrap">
                <!-- 列表内容 -->
                <div class="list-container">
                    <div class="topic">
                        <h4>歌曲列表</h4>
                        <ul>
                            <li @click="tag=0"  :class="{active:tag==0}">全部</li>
                            <li @click="tag=7"  :class="{active:tag==7}">华语</li>
                            <li @click="tag=96" :class="{active:tag==96}">欧美</li>
                            <li @click="tag=8"  :class="{active:tag==8}">日本</li>
                            <li @click="tag=16" :class="{active:tag==16}">韩国</li>
                        </ul>
                    </div>
                    <!-- 属性栏 -->
                    <table class="table">
                        <!-- 表头 -->
                        <thead>
                            <tr>
                                <th class="w1"></th>
                                <th class="w2">
                                    <div class="wp">音乐标题</div>
                                </th>
                                <th class="w3">
                                    <div class="wp">时长</div>
                                </th>
                                <th class="w4">
                                    <div class="wp">歌手</div>
                                </th>
                                <th class="w5">
                                    <div class="wp">专辑</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in list" :key="index" :style="{background:(index%2==0)? '#f7f7f7':'#ffffff'}">
                                <td>
                                    <div class="rank1">
                                        <span>{{index+1}}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="rank2">
                                            <div class="picture" @click="open_music(item.id)"  @mouseover="mouseIn_s(index)" @mouseleave="mouseOut_s">
                                                <img :src="item.album.picUrl" alt="">
                                                <span class="open" :style="{display:(index===id)? 'block':'none'}"></span>
                                            </div>
                                            <div class="ttc">
                                                <span class="text">{{item.name}}</span>
                                            </div>
                                        
                                    </div>
                                </td>
                                <td>
                                    <div class="rank3">
                                        <span>{{item.duration}}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="rank4">
                                        <span>{{item.artists[0].name}}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="rank5">
                                        <span>{{item.album.name}}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'new',
    data(){
        return{
            //元素高亮的标识
            tag:0,
            list:[],
            //播放按钮是否显示
            id:undefined,
            //音乐播放id
            // ids:'',
            //返回音乐的地址
            url:''
        }
    },
    //侦听器，用来监听tag值的变化
    watch:{
        tag(){
            this.getlist();
        }
    },
    methods:{
        mouseIn_s:function(i){
            this.id=i;
        },
        mouseOut_s:function(){
            this.id=undefined;
        },
        open_music:function(id){
            axios({
                url:'https://autumnfish.cn/song/url',
                method:'get',
                params:{
                    id:id
                }
            }).then(res=>{
                this.url=res.data.data[0].url;
                this.$parent.musicUrl=this.url;
            })
        },
        getlist:function(){
            axios({
            url:'https://autumnfish.cn/top/song',
            method:'get',
            params:{
                type:this.tag,
                limit:21,

            }
        }).then(res=>{
            // console.log(res);
            this.list=res.data.data;
            //处理时长为毫秒 转为分秒
            for(let i=0;i<this.list.length;i++){
                let duration=this.list[i].duration;
                let min=parseInt(duration/1000/60);
                let sec=parseInt(duration/1000%60);
                if(min<10){
                    min='0'+min;
                }
                if(sec<10){
                    sec='0'+sec;
                }
                this.list[i].duration=`${min}:${sec}`
            }
        })
        }
        

    },
    created(){
        this.getlist();
    }
}

</script>

<style>
*{
    margin: 0px;
    padding: 0px;
}
.song{
    width: 100%;
    height: 100%;
    font-size: 12px;
}
.song-container{
    width: 1000px;
    margin: 0px auto;
    /* background-color:blue ; */
    overflow: hidden;
}
.song-container>.song-top-warp{
    width: 100%;
    height: 250px;
    margin-top: 50px;
    /* background-color: red; */
    position: relative;
}
.song-container>.song-top-warp>.song-info{
    width: 80%;
    height: 90%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    /* background-color:green ; */
}
.song-container>.song-top-warp>.song-info>.picture{
    float: left;
    padding: 3px;
    border: 1px solid #cccccc;
    width: 13.5rem;
    height:13.5rem;
    /* background-color:skyblue ; */
}
.song-container>.song-top-warp>.song-info>.picture>img{
    width: 100%;
    height: 100%;
}
.song-container>.song-top-warp>.song-info>.topic-warp{
    float: left;
    margin-left: 50px;    
}
.song-container>.song-top-warp>.song-info>.topic-warp>.title{
    margin: 40px 0px 4px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.title>h2{
    font-size: 35px;
    font-weight:normal;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use{
    list-style: none;
    margin-top: 70px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li{
    float: left;
    margin-right:8px;
    font-size: 15px;
    display: flex;
    align-items: center;
    align-content: center;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(1){
    background-color:#2576c4 ;
    border: 1px solid #3984ce;
    width: 88px;
    height: 30px;
    color: #f5f5f5;
    border-radius: 3px;
    margin-right: 1px !important;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(1)>.open{
    display: inline-block;
    margin-left: 20px;
    width: 20px;
    height: 20px;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?9e644d7efa82034ed55ca69186c4dd44) no-repeat 0px -57px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(2){
    width: 30px;
    height: 30px;
    background-color: #2576c4;
    border: 1px solid #3984ce;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(2)>span{
    margin: 0px auto;
    color: #f5f5f5;
    font-size: 25px !important;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(3){
    width: 110px;
    height: 31px;
    background-color: #fdfdfd;
    border: 1px solid #cccccc;
    border-radius: 3px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(3)>.shoucang{
    display: inline-block;
    width:20px;
    height: 20px;
    margin-left: 12px;
    background: url(https://s2.music.126.net/style/web2/img/table.png?74b789ad8f25c462cdd8ef6f7ba6fed4) no-repeat 0px -171px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(4){
    width: 80px;
    height: 30px;
    background-color: #fdfdfd;
    border:1px solid #cccccc;
    border-radius:3px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(4)>.zhuanfa{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 10px;
    background: url(https://s2.music.126.net/style/web2/img/table.png?74b789ad8f25c462cdd8ef6f7ba6fed4) no-repeat 0px -192px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(5){
    width: 70px;
    height: 30px;
    background-color: #fdfdfd;
    border: 1px solid #cccccc;
    border-radius:3px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(5)>.xiazai{
    display: inline-block;
    width: 20px;
    height: 25px;
    margin-left: 10px;
    background: url(https://s2.music.126.net/style/web2/img/table.png?74b789ad8f25c462cdd8ef6f7ba6fed4) no-repeat -81px -169px;
}
.song-container>.song-top-warp>.song-info>.topic-warp>.use>li:nth-child(5)>.text{
    font-size: 14px !important;
}
.song-container>.list-wrap{
    width: 100%;
    height: 1800px;
}
.song-container>.list-wrap>.list-container{
    width: 100%;
    margin: 0px auto;
}
.song-container>.list-wrap>.list-container>.topic{
    width: 100%;
    height: 50px;
    position: relative;
    border-bottom: 3px solid #c20c0c;
}
.song-container>.list-wrap>.list-container>.topic>h4{
    font-weight: normal;
    font-size: 20px;
    float: left;
    line-height: 50px;
}
.song-container>.list-wrap>.list-container>.topic>ul{
    list-style: none;
    float:right;
    line-height: 50px;
}
.song-container>.list-wrap>.list-container>.topic>ul>li{
    float: left;
    margin-right: 30px;
    font-size: 14px;
    cursor: pointer;
}
.active{
    color: coral;
}
.song-container>.list-wrap>.list-container>.table{
    width: 100%;
    table-layout:fixed;
    border-collapse: collapse;
    border-spacing: 0px;
    border: 1px solid #d9d9d9;
    /* border-style:hidden; */
    
}
.song-container>.list-wrap>.list-container>.table>thead>tr{
    width: 100%;
    height: 55px;
    border: inherit;
    background: linear-gradient(to bottom,#fdfdfd 0%,#f0f0f0 100%);
}
.song-container>.list-wrap>.list-container>.table>thead>tr>th{
    border: 1px solid #d4d4d4;
}
.song-container>.list-wrap>.list-container>.table>thead>tr>.w1{
    width: 30px;

}
.song-container>.list-wrap>.list-container>.table>thead>tr>.w2{
    width: 120px;
}
.song-container>.list-wrap>.list-container>.table>thead>tr>.w3{
    width: 50px;
}
.song-container>.list-wrap>.list-container>.table>thead>tr>.w4{
    width: 80px;
}
.song-container>.list-wrap>.list-container>.table>thead>tr>.w5{
    width: 90px;
}
.song-container>.list-wrap>.list-container>.table>tbody>tr{
    height: 81px;
     
}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank1,.rank2,.rank3,.rank4,.rank5{
    text-align: center;
    font-size: 15px;
}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank2{
    position: relative;
    display: flex;
    align-items: center;
}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank2 .picture{
    width: 70px;
    height: 70px;
    position: relative;
    float: left;
    margin-left: 20px;
    cursor: pointer;
}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank2 .picture>img{
    width: 100%;
    height: 100%;
}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank2 .picture>.open{
    display: block;
    width: 25px;
    height: 25px;
    position: absolute;
    bottom: 0px;
    top: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?9e644d7efa82034ed55ca69186c4dd44) no-repeat -42px -52px ;

}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank2>.ttc{
    font-size: 15px;
    float: left;
    margin-left: 40px;
    
}
.song-container>.list-wrap>.list-container>.table>tbody>tr>td>.rank3>.span{
    text-align: center;
}

</style>
