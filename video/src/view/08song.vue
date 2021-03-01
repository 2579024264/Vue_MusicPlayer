<template>
   <div class="result-bottom-wrap">
              <div class="result-bottom-container">
                  <div class="items">
                      <div class="item" v-for="(item,index) in songList" :key="index">
                          <div class="w0">
                              <div class="open" @click="open_music(item.id)"></div>
                          </div>
                          <div class="w1">
                              <div class="music_name" >
                                  <span class="name">{{item.name}}
                                       <em  v-if="item.mvid!=0" class="mvs" @click="open_mv(item.mvid)"></em>
                                  </span>
                                  <!-- mv图标 -->
                              </div>
                          </div>
                          <div class="w2">
                              <div class="show">{{item.album.name}}</div>
                          </div>
                          <div class="w3">
                              <div class="artist_name">{{item.artists[0].name}}</div>
                          </div>
                          <div class="w4">
                              <div class="time">{{item.duration}}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            //保存查询歌曲
            songList:[],
        }
    },
    created(){
        axios({
            url:"https://autumnfish.cn/search",
            method:'get',
            params:{
                keywords:this.$parent.song_name,
                type:1,
                limit:10
            }
        }).then(res=>{
            console.log(res);
            this.$parent.song_total=res.data.result.songCount;
            this.$parent. text="首单曲";
            this.songList=res.data.result.songs;
            for(var att=0;att<this.songList.length;att++){
                //duration单位默认是毫秒，
                let min=parseInt(this.songList[att].duration/1000/60);
                let sec=parseInt(this.songList[att].duration/1000%60);
                if(min<10){
                    min='0'+min
                }
                if(sec<10){
                    sec='0'+sec
                }
                this.songList[att].duration=min+":"+sec;
            }
        })
    },
    methods:{
        open_music(id){
            axios({
            //获取音乐
            url:'https://autumnfish.cn/song/url',
            method:'get',
            params:{
                id
            }
        }).then(res=>{
           let url=res.data.data[0].url;
           //设置给祖父组件的播放地址
           this.$parent.$parent.musicUrl=url;
        })
        },
        open_mv:function(id){
            this.$router.push(`/MV2?q=${id}`);
        }
        
    }
}

</script>

<style>
.result-bottom-wrap{
    width: 1000px;
    height: 600px;
    /* background: red; */
    margin:auto;  
}
.result-bottom-wrap>.result-bottom-container{
    width: 100%;
    height: 100%;
}
.result-bottom-wrap>.result-bottom-container>.items>.item{
    width: 940px;
    height: 35px;
    /* background: green; */
    padding: 10px 30px;
    display: flex;
    align-items: center;
    color: #333;
    /* color: red; */
}
.result-bottom-wrap>.result-bottom-container>.items>.item:hover{
    background-color:#F2F2F2 ;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w0{
    width: 18px;
    height: 18px;
    margin-right: 7px;
    float: left;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w0>.open{
    width:100%;
    height: 100%;
    background: url(https://s2.music.126.net/style/web2/img/iconall.png?a73f83340161324a07a20ed814c4f00b) no-repeat 0px 0px;
    cursor: pointer;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w1{
    float: left;
    width: 300px;
    height: 30px;
    /* background:yellow; */
    overflow: hidden;
    margin-right:70px;
    line-height: 30px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w1>.music_name{
    width: 100%;
    height: 100%;
    line-height: 30px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w1>.music_name>.name{
    padding-right: 25px;
    position: relative;
}
.mvs{
    width: 23px;
    height: 17px;
    display: inline-block;
    float: left;
    background:url(https://s2.music.126.net/style/web2/img/table.png?42934e19ed0324dbf5de6b2b62f892e0) no-repeat 0px -151px;
    cursor: pointer;
    position: absolute;
    right: 0px;
    bottom: 0px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w1>.music_name>.open_mv{
    width: 30px;
    height: 30px;
     display: inline-block;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w2{
    width: 260px;
    height: 30px;
    float: left;
    /* background: red; */
    margin-right:35px;
    line-height: 30px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w2>.show{
    width: 100%;
    height: 100%;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w3{
    width: 110px;
    height: 30px;
    float: left;
    line-height: 30px;
    margin-right: 20px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w3>.artist_name{
    width: 100%;
    height: 100%;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w4{
    width: 110px;
    height: 30px;
    float: left;
    line-height: 30px;
}
.result-bottom-wrap>.result-bottom-container>.items>.item>.w4>.time{
    width: 100%;
    height: 100%;
}

</style>
