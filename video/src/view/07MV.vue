<template>
  <div class="MV-warp">
            <div class="MV-container2">
                <div class="items">
                    <div class="MV-picture"  @mouseover="mouseOver_s(index)" @mouseleave="mouseLeave_s" v-for="(item,index) in mv" :key='index'>
                        <div class="picture" @click="open_mv(item.id)">
                            <img :src="item.cover" alt="">
                            <span class="open" :style="{display:(index==id)? 'block':'none'}"></span>
                        </div>
                        <div class="button">
                            <span class="pic"></span>
                            <span class="number">{{item.playCount}}</span>
                        </div>
                        <p class="text">{{item.name}}</p>
                        <p class="singer">{{item.artistName}}</p>
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
      //mv集合
      mv:'',
      //mv总数
      count:'',
      id:undefined,

    }
  },
  created(){
    axios({
      url:"https://autumnfish.cn/search",
            method:'get',
            params:{
                keywords:this.$parent.song_name,
                type:1004,
                limit:16
            }
    }).then(res=>{
      console.log(res);
      //保存mv的数据
        this.mv=res.data.result.mvs;
      //总数
        this.count=res.data.result.mvCount;
        this.$parent.text="个视频"
      //处理数据
      for(let i=0;i<this.mv.length;i++){
        //时间
        let min=parseInt(this.mv[i].duration/1000/60);
        let sec=parseInt(this.mv[i].duration/1000%60);
        if(min<10){
          min='0'+min;
        }
        if(sec<10){
          sec='0'+sec;
        }
        this.mv[i].duration=min+":"+sec;
        //播放次数
        if(this.mv[i].playCount>100000){
          this.mv[i].playCount=parseInt(this.mv[i].playCount/100000)+'万';
        }
      }
    })
  },
  methods:{
     mouseOver_s:function(i){
            this.id=i;
        },
        mouseLeave_s:function(){
            this.id=undefined;
        },
        open_mv(id){
          this.$router.push(`MV2?q=${id}`);
        }
  }
}

</script>

<style>
.MV-warp{
  width: 100%;
  height: 750px;
}
.MV-warp>.MV-container2{
  width: 100%;
  height: 100%;
  padding-top: 20px;
  margin: auto;
}
.MV-warp>.MV-container2>.items>.MV-picture{
   width: 200px;
    height: 170px;
    padding-left:60px;
    padding-bottom: 20px;
    float: left;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
.MV-warp>.MV-container2>.items>.MV-picture>.picture{
    width: 100%;
    height: 120px;
    position: relative;
}
.MV-warp>.MV-container2>.items>.MV-picture>.picture>img{
    width: 100%;
    height: 100%;
}
.MV-warp>.MV-container2>.items>.MV-picture>.button{
    position: absolute;
    top: 0px;
    right: 0px;
    display:flex;
    align-items: center;
}
.MV-warp>.MV-container2>.items>.MV-picture>.button>.pic{
    display: inline-block;
    border:7px solid #f5f5f5;
    border-color: transparent transparent transparent #f5f5f5;
}
.MV-warp>.MV-container2>.items>.MV-picture>.button>.number{
    display: inline-block;
    color: #f5f5f5;
}
.MV-warp>.MV-container2>.items>.MV-picture>.picture>.open{
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
.MV-warp>.MV-container2>.items>.MV-picture>.singer{
  color: #666;
  font-weight: normal;
  font-size: 13px;
}
</style>
