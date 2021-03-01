<template>
  <div class="playlist">
    <div class="playlist-container">
      <!-- 精品歌单 -->
      <div class="picture">
        <div class="background" :style="background"></div>
        <div class="pictur-container">
          <img :src="pic.coverImgUrl" alt="" />
        </div>
        <div class="text">
          <div class="tag">精品歌单</div>
          <div class="title">{{ pic.name }}</div>
          <p class="info">{{ pic.description }}</p>
        </div>
      </div>
      <!-- 导航 -->
      <div class="nav">
        <ul class="choose">
          <li :class="{ active: tag == '全部' }" @click="tag = '全部'">全部</li>
          <li :class="{ active: tag == '欧美' }" @click="tag = '欧美'">欧美</li>
          <li :class="{ active: tag == '华语' }" @click="tag = '华语'">华语</li>
          <li :class="{ active: tag == '流行' }" @click="tag = '流行'">流行</li>
          <li :class="{ active: tag == '说唱' }" @click="tag = '说唱'">说唱</li>
          <li :class="{ active: tag == '摇滚' }" @click="tag = '摇滚'">摇滚</li>
          <li :class="{ active: tag == '民谣' }" @click="tag = '民谣'">民谣</li>
          <li :class="{ active: tag == '电子' }" @click="tag = '电子'">电子</li>
          <li :class="{ active: tag == '轻音乐' }" @click="tag = '轻音乐'">
            轻音乐
          </li>
          <li :class="{ active: tag == '影视原声' }" @click="tag = '影视原声'">
            影视原声
          </li>
          <li :class="{ active: tag == 'ACG' }" @click="tag = 'ACG'">ACG</li>
          <li :class="{ active: tag == '怀旧' }" @click="tag = '怀旧'">怀旧</li>
          <li :class="{ active: tag == '治愈' }" @click="tag = '治愈'">治愈</li>
          <li :class="{ active: tag == '旅行' }" @click="tag = '旅行'">旅行</li>
        </ul>
        <div class="linear"></div>
      </div>
      <!-- 列表 -->
      <div class="list">
        <div class="choose-container">
          <div class="items">
            <div class="item" v-for="(item, index) in list" :key="index">
              <!-- 图片区 -->
              <div class="item-picture">
                <img :src="item.coverImgUrl" alt="" />
                <!-- 下面的浮动区 -->
                <div class="bottom">
                  <span class="ear"></span>
                  <span class="number">{{ item.playCount }}</span>
                </div>
                <div class="open" @click="open(item.id)"></div>
              </div>
              <p class="text">{{ item.name }}</p>
              <p class="name">情思天鹅</p>
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
        :page-size="20"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      //精品歌单
      pic: {},
      //背景图片
      background: "",
      //获取歌单数据
      list: [],
      //当前选择的数据
      tag: "全部",
      //歌单总数
      total: 0,
      //page页数
      page: 0,
     //歌曲播放的id号
      id:'',
      //歌曲地址
      url:'',
    };
  },
  //侦听器，当click事件发生时，tag的数值会发生变化，从而触发侦听器。
  watch: {
    tag() {
      this.topData(), 
      this.listData(),
      //修改页码为1
      this.page=1
    },
  },
  methods: {
    //抽取的方法1
    topData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          cat: this.tag,
        },
      }).then((res) => {
        // data.playlists[0].coverImgUrl
        this.pic = res.data.playlists[0];
        this.background = `background:url(${this.pic.coverImgUrl}), no-repeat 0px 0px/100% 100%; filter: blur(8px);`;
      });
    },
    listData() {
      axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 12,
          cat: this.tag,
          //起始的值
          offset:(this.page-1)*12,
        },
      }).then((res) => {
        this.list = res.data.playlists;
        this.total = res.data.total;
        for(let i=0;i<this.list.length;i++){
            if(this.list[i].playCount>10000){
              let play_units=(this.list[i].playCount/10000).toFixed(1);
              this.list[i].playCount=play_units+"万";
            }           
        }
        console.log(res);
        
      });
    },
    //页码改变事件
    // current-change="handCurrentChange
    handCurrentChange(val) {
      this.page=val;
      this.listData();
    },
    //打开歌单函数
    open:function(id){
        //跳转到歌单界面
      this.$router.push(`playlist2?q=${id}`);
    }
  },
  created() {
    this.topData(), 
    this.listData();
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
.playlist {
  width: 100%;
  height: 100%;
}
.playlist-container {
  position: relative;
  width: 1100px;
  margin: 0px auto;
  overflow: hidden;
  border: 1px solid #242424;
}
.playlist-container > .picture {
  width: 800px;
  height: 200px;
  margin: 40px auto;
  /* background-color: blue; */
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
}
.playlist-container > .picture > .background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0px;
  left: 0px;
}
.playlist-container > .picture > .pictur-container {
  float: left;
  width: 150px;
  height: 150px;
  background-color: black;
  margin-left: 20px;
}
.playlist-container > .picture > .pictur-container > img {
  width: 100%;
  height: 100%;
}
.playlist-container > .picture > .text {
  width: 590px;
  height: 150px;
  float: left;
  margin-left: 20px;
  background: transparent;
  overflow: hidden;
}
.playlist-container > .picture > .text > .tag {
  width: 32px;
  color: #DFAC67;
  padding: 5px;
  border: 1px solid #DFAC67;
  border-radius: 3px;
}
.playlist-container > .picture > .text > .title {
  margin-top: 6px;
  margin-bottom: 6px;
  color: #f5f5f5;
  font-weight: normal;
  font-size: 13px;
}
.playlist-container > .nav {
  width: 955px;
  /* text-align: center; */
  margin: 0px auto;
}
.playlist-container > .nav > .choose {
  list-style: none;
  height: 30px;
  display: inline-block;
  position: relative;
  right: 0px;
  /* border: 1px solid #242424; */
  /* margin-bottom:6px ; */
}
.playlist-container .nav .choose > li {
  float: left;
  margin-left: 40px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.playlist-container .nav .linear {
  height: 3px;
  background-color: #c20c0c;
}
.choose-container {
  width: 1000px;
  height: 850px;
  margin: 30px auto;
  background-color: antiquewhite;
  /* border: 1px solid #242424; */
}
.choose-container .items .item {
  position: relative;
  width: 200px;
  height: 250px;
  float: left;
  /* background-color:#242424 ; */
  padding: 20px 25px;
}
.choose-container .items .item-picture {
  position: relative;
  height: 200px;
}
.choose-container .items .item .item-picture > img {
  width: 100%;
  height: 100%;
}
.choose-container .items .item .item-picture > .bottom {
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  background: #37332e;
  display: flex;
  align-items: center;
}
.choose-container .items .item .item-picture > .bottom > .ear {
  width: 20px;
  height: 20px;
  display: block;
  background: red;
  margin-left: 10px;
  line-height: 30px;

  background: url(https://s2.music.126.net/style/web2/img/iconall.png?dcc1791bd2faa8e5f9ac67a52e0ef5be) no-repeat 4px -19px;
}
.choose-container .items .item .item-picture > .bottom > .number {
  line-height: 30px;
  margin-left: 3px;
  color: #f5f5f5;
  font-weight: normal;
}
.choose-container .items .item .item-picture > .open {
  width: 20px;
  height: 20px;
  background: yellow;
  position: absolute;
  right: 3px;
  bottom: 5px;
  background: url(https://s2.music.126.net/style/web2/img/iconall.png?dcc1791bd2faa8e5f9ac67a52e0ef5be) no-repeat 0px 1px;
  cursor: pointer;
}
.choose-container .items .item > .text {
  margin-top: 10px;
  height: 20px;
  overflow: hidden;
}
/* 添加一个类 元素高亮的样式*/
.active {
  color: #DFAC67;
}
.playlist .playlist-container .page {
  width: 500px;
  margin: 0px auto;
}
</style>
