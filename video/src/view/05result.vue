<template>
  <div class="result">
      <div class="result-container">
          <div class="result-top-wrap">
              <div class="result-top-container">
                  <!-- this.$route.query.q来获取父元素送来的值 -->
                  <input type="text" class="text"  v-model="song_name">
                  <span class="search"><a class="icon iconfont icon-RectangleCopy"></a></span>
              </div>
          </div>
          <div class="result-body-wrap">
              <div class="result-body-container">
                  <div>搜索{{song_name}}，找到{{song_total}}{{text}}</div>
                  <ul class="list">
                      <li>
                          <router-link to="/songs1">单曲</router-link>
                      </li>
                      <li>歌手</li>
                      <li>专辑</li>
                      <li>
                            <router-link to="/MV1">视频</router-link>  
                      </li>
                      <li>歌词</li>
                      <li>
                          <router-link to="/playlist1">歌单</router-link>
                      </li>
                      <li>主播电台</li>
                      <li>用户</li>
                  </ul>  
              </div>
          </div>
         <!-- 路由显示 -->
            <div>
                <router-view></router-view>
            </div>
          
      </div>
      

  </div>
</template>

<script>
export default {
    name:"search",
    data(){
        return{
            //保存搜索关键词
            song_name:this.$route.query.q,
            //歌曲数目
            song_total:undefined,
            text:''
        }
    },
    methods:{

    },
}

</script>

<style>
*{
    margin: 0px;
    padding: 0px;
    font-size: 15px;
}
.result{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
.result>.result-container{
    width: 1100px;
    /* height:1100px; */
    margin: 0px auto;
    overflow: hidden;
    border: 1px solid #d3d3d3;
    background: #ffffff;
}
.result>.result-container>.result-top-wrap{
    width: 100%;
    height: 50px;
    /* background: yellow; */
    margin: 40px auto;
    position: relative;
}
.result>.result-container>.result-top-wrap>.result-top-container{
    width: 500px;
    height: 100%;
    position: absolute;
    /* background: green; */
    left: 50%;
    margin-left: -250px;
    border: 2px solid #c9c9c9;
    box-shadow: -1px 1px 5px #dadbda inset;
    border-radius:10px;
    display: flex;
    align-items: center;
    position: relative;    
}
.result>.result-container>.result-top-wrap>.result-top-container>.text{
    width: 390px;
    height: 25px;
    vertical-align:top;
    /* background: red; */
    margin-left: 40px;
    border: none;
}
.result>.result-container>.result-top-wrap>.result-top-container>.text:focus{
    outline: none;
}
.result>.result-container>.result-top-wrap>.result-top-container>.search{
    display: inline-block;
    width: 46px;
    height: 50px;
    /* background: red; */
    position: absolute;
    right: 0px;
    border-radius: 0px 10px 10px 0px;
    text-align: center;
    background: linear-gradient(to bottom,#fdfdfd 0%,#ededed 100%);
    border-left:2px solid #c9c9c9;
    cursor: pointer;
    display: flex;
}
.result>.result-container>.result-top-wrap>.result-top-container>.search:hover{
    background: linear-gradient(to bottom,#ffffff 0%,#f8f8f8 100%);
}
.result>.result-container>.result-body-wrap{
    width: 1000px;
    height: 90px;
    /* background: red; */
    margin: 0px auto;    
}
.result>.result-container>.result-body-wrap>.result-body-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.result>.result-container>.result-body-wrap>.result-body-container>div{
    width: 100%;
    font-size: 17px;
    color: #999;
    margin: 10px 0px;
}
.result>.result-container>.result-body-wrap>.result-body-container>.list{
    list-style: none;
    height: 40px;
    border: 1px solid #ccc;
    /* border-width:0 1px; */
    background: linear-gradient(to bottom,#f9f9f9 0%,#f6f6f6 100%);
}
.result>.result-container>.result-body-wrap>.result-body-container>.list>li{
    float: left;
    /* margin-right: 30px; */
    font-size: 17px;
    color: #333;
    line-height: 40px;
    text-align: center;
    width: 124px;
    cursor: pointer;
}
.result>.result-container>.result-body-wrap>.result-body-container>.list>li:hover{
    border-top: 3px solid #c20c0c;
}
.result>.result-container>.result-body-wrap>.result-body-container>.list>li>a{
    text-decoration: none;
    color: #333;
   display: block;
    width: 100%;
    height: 100%;
}
.result>.result-container>.result-body-wrap>.result-body-container>.list>li>a:hover{
    background-color: #FFFFFF;
}
.result>.result-container>.result-body-wrap>.result-body-container>.list>li>a:active{
    background-color: #FFFFFF;
}

</style>
