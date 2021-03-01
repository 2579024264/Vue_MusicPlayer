<template>
  <div class="result-bottom-wrap">
              <div class="result-bottom-container">
                  <div class="items">
                      <div class="item" v-for="(item,index) in playlist" :key="index">
                          <!-- 播放按钮 -->
                          <div class="p0">
                              <div class="open" @click="toPlaylist(item.id)"></div>
                          </div>
                          <!-- 图片 -->
                          <div class="p1">
                              <div class="picture" >
                                  <!-- mv图标  -->
                                 <img :src="item.coverImgUrl" alt="">
                              </div>
                          </div>
                          <div class="p2">
                              <div class="play_name">{{item.name}}</div>
                          </div>
                          <div class="p3">
                              <span class="open_num">{{item.trackCount}}首</span>
                          </div>                   
                          <div class="p4">
                              <span class="store">收藏:{{item.bookCount}}</span>
                          </div>
                          <div class="p5">
                              <span class="listen">收听:{{item.playCount}} </span>
                          </div>
                      </div>
                  </div>
              </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  // name:'playlist1',
  data(){
    return{
      //歌单列表
      playlist:[],
      //歌单相关的数
      count:0,    

    }
  },
  created(){
   axios({
            url:"https://autumnfish.cn/search",
            method:'get',
            params:{
                keywords:this.$parent.song_name,
                type:1000,
                limit:10
            }
        }).then(res=>{
          //歌单逻辑
          this.playlist=res.data.result.playlists;
          console.log(res);
          //总数
          this.count=res.data.result.playlistCount;
          this.$parent.song_total=this.count;
          //文本
          this.$parent.text="个歌单";
          //处理播放次数
          for(let i=0;i<this.playlist.length;i++){
              if(this.playlist[i].playCount>10000){
                  this.playlist[i].playCount=parseInt(this.playlist[i].playCount/10000)+'万';
              }
          }

        })
  },
  methods:{
      //去歌单详情页
      toPlaylist(id){
          //跳转并写单数据即可
          this.$router.push(`/playlist2?q=${id}`)
      }
  }
}

</script>

<style>
.result-bottom-wrap>.result-bottom-container>.items>.item{
    /* background-color: green; */
    height: 55px !important;

}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p0{
    width: 18px;
    height: 18px;
    padding-right: 20px;
    float: left;
    /* background-color: red; */
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p0>.open{
    width:100%;
    height:100%;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?a73f83340161324a07a20ed814c4f00b) no-repeat 0px 0px;
    cursor: pointer;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p1{
    width: 55px;
    height: 55px;
    padding:0px 20px;
    /* background-color: red; */
    float: left;
    
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p1>.picture{
    width: 100%;
    height: 100%;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p1>.picture>img{
    width: 100%;
    height: 100%;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p2{
    width: 400px;
    padding-left:10px;
    float: left;
    font-size: 14px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p3{
    width: 100px;
    padding-left: 50px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p3>.open_num{
    color: #999;
    font-size: 14px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p4,.p5{
    width: 100px;
    padding-left: 30px;
    float: left;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p4>.store{
    color: #999;
    font-size: 14px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.p5>.listen{
    color: #999;
    font-size: 14px;
}

</style>
