<template>
  <div class="index-container" :style="{width:indexWidth}">
    <!-- 导航区 -->
    <div class="wrap">
    <div id="m-top">
      <!-- 网易云图标 -->
      <h1 class="logo">
        <a href="#">网抑云音乐</a>
      </h1>
      <!-- 中间的导航部分 -->
      <ul class="m-nav j-tflag">
        <li class="fst">
          <router-link to="/discovery">
            发现音乐
          </router-link>
        </li>
        <li>
            <router-link to="/playlist">
                今日推荐
            </router-link>
        </li>
        <li>
          <router-link to="/songs">
                最新音乐
            </router-link>
        </li>
        <li>
         <router-link to="/MV">
                最新MV
            </router-link>
        </li>
        <li>
          <router-link to="#">
                你的专属
            </router-link>
        </li>
      </ul>
      <!-- 登录 -->
      <div class="m-tophead">
        <a href="#" class="link">登录</a>
      </div>
      <!-- 创作者中心 -->
      <a href="#" class="m-topvd">创作者中心</a>
      <!-- 搜索框 -->
      <div class="srchbg">
        <span class="parent">
          <input
            type="text"
            id="srch"
            @keyup.enter='toResult'
            v-model="inputValue"
          />
          
        </span>
      </div>
    </div>
    </div>
    <!-- 主体区 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放 -->
    <div class="player" @openup="change">
       <audio :src="musicUrl" class="audio" loop="loop" autoplay controls></audio>
       <!-- <el-slider v-model="currentBar" :show-tooltip="false" @click.native="skipBar"></el-slider> -->
    </div>
    <!-- <el-slider v-model="currentBar" :show-tooltip="false" @click.native="skipBar"></el-slider> -->
  </div>
</template>


<script>
export default {
  name: "index",
  data() {
    return {
      indexWidth:"",
      musicUrl: "",
      inputValue:''
      //
    };
  },
  methods:{
    change:function(data){
      this.musicUrl=data;
    },
    function(){
        this.indexWidth=document.body.clientWidth;
    },
    toResult:function(){
      //非空判断
      if(this.inputValue==''){
        //提示用户
        this.$message.warning('请输入有效内容！');
      }else{
        //转到搜索页，并携带数据
        this.$router.push('/result?q='+this.inputValue)
      }
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
body {
  height: 100%;
  width:100%;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}
.index-container{
  height: 70px;
  background-color:#242424 ;
  position: relative;
 
}
.wrap{
  height: 70px;
  position: relative;
  border-bottom: 1px solid #000;
}
#m-top {
  width: 1100px;
  height: 70px;
  box-sizing: border-box;
  background: #242424;
  border-bottom: 1px solid #000;
  position: absolute;
  /* 水平垂直居中，子元素相对于父元素绝对定位，将子元素的top,right,bottom,left均设为0，然后子元素设置为margin:atuo; */
  top: 0px;
  right: 0px;
  left: 0px;
  bottom:0px;
  margin:auto;
  /* 水平居中：left:50%,marigin-left:-width/2*/
  /* left: 50%; 
   margin-left: -550px; */

 
}
#m-top .logo {
  display: block;
  float: left;
  width: 160px;
  height: 70px;
  background: url(https://s2.music.126.net/style/web2/img/frame/topbar.png?a5ef5d816c7c8bf7bbc42ec9676615c3)
    no-repeat 2px 0px;
  padding-right: 20px;
}
#m-top .logo a {
  float: left;
  /* position: ; */
  width: 120px;
  height: 100%;
  display: block;
  text-decoration: none;
  color: #333;
  text-indent: -99999px;
  line-height: 70px;
}
.m-nav {
  float: left;
  list-style: none;
}
.m-nav li,
.m-nav li span,
.m-nav a,
.m-nav a em {
  float: left;
  height: 70px;
  font-size: 14px;
  text-decoration: none;
}
.m-nav a:hover {
  background-color: #000;
  text-decoration: none;
  color: #fff;
}
.m-nav a {
  padding: 0 19px;
  text-align: center;
  line-height: 70px;
  color: #ccc;
}
em {
  font-style: normal;
}
.m-tophead {
  float: right;
  height: 45px;
  margin-top: 25px;
  margin-left: 25px;
}
.m-tophead .link,
.m-tophead .link:hover {
  display: block;
  width: 30px;
  color: #787878;
  /* text-decoration: none; */
}
.m-tophead:hover .link {
  color: #999;
}
.m-topvd {
  float: right;
  width: 90px;
  height: 28px;
  margin: 20px 0 0 12px;
  display: block;
  border: 1px solid #4f4f4f;
  border-radius: 20px;
  text-decoration: none;
  color: #ccc;
  text-align: center;
  line-height: 28px;
}
.m-topvd:hover {
  border: 1px solid #ccc;
  color: #fff;
}
.srchbg {
  float: right;
  width: 150px;
  height: 32px;
  margin-top: 19px;
  /* background-color: #fff; */
  border-radius: 30px;
  background: #fff
    url(https://s2.music.126.net/style/web2/img/frame/topbar.png?a5ef5d816c7c8bf7bbc42ec9676615c3)
    no-repeat -3px -98px;
}
.parent {
  display: block;
  margin: 7px 0 0 25px;
  position: relative;
}
#srch {
  color: #333;
  line-height: 18px;
  width: 90%;
  border: 0px;
  background: transparent;
  /* opacity: 1; */
}
#srch:focus {
  outline: none;
  outline-offset: 0px;
}
.srchbg .parent .ph {
  display: block;
  width: 90%;
  color: #9b9b9b;
  cursor: text;
  position: absolute;
  top: 0px;
  left: 0px;
}
.index .player{
  /* position: relative; */
  width: 100%;
  height: 50px;
}
.index-container>.player>.audio{
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  outline: none;
  /* background-color: red; */
}
</style>

