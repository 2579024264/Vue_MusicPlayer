<template>
  <div class="MV2_wrap f-cbb">
      <div class="g-bd4 f-cbb">
          <div class="g-mn4">
              <div class="g-mn4c">
                  <div class="g-wrap6">
                      <div class="n-mv">
                          <div class="title f-cbb">
                              <h2 class="f-thide">
                                  <i class="u-icn2"></i>
                                  {{music_name}}
                              </h2>
                              <span class="name">{{name}}</span>
                          </div>
                          <div class="mv">
                              <video :src="url" controls autoplay></video>
                          </div>
                          <div class="btns f-cbb">
                              <a href="" class="btn u-btn2">
                                  <i>
                                      <em class="icn"></em>
                                  (1216)
                                  </i>
                              </a>
                              <a href="" class="btn u-btn3">
                                   <i>(2014)</i>  
                              </a>
                              <a href="" class="btn u-btn4">
                                  <i>(142)</i>
                              </a>
                          </div>
                          <div class="info-wrap f-cbb">
                              <div class="singer-wrap">
                                  <div class="singer-pic">
                                      <img :src="icon" alt="">
                                  </div>
                                  <span class="singer-name">{{mvInfo.artistName}}</span>
                              </div> 
                              <div class="mv-info">
                                  <h2 class="title2">{{mvInfo.name}}</h2>
                                  <span class="date">发布：{{mvInfo.publishTime}}</span>
                                  <span class="number">播放：{{mvInfo.playCount}}次</span>
                                  <p class="desc">{{mvInfo.desc}}</p>
                              </div>
                          </div>
                          <div class="comment-wrap f-cbb">
                            <p>热门评论({{hotComments_total}})
                                <span class="num">
                                    <!-- ({{total}}) -->
                                </span>
                            </p>
                            <div class="comments-wrap f-cbb"  v-for="(item,index) in hotComments" :key="index">
                                <div class="item f-cbb">
                                    <div class="icon-wrap">
                                        <img :src="item.user.avatarUrl" alt="">
                                    </div>
                                    <div class="content-wrap f-cbb">
                                        <div class="content">
                                            <span class="name">{{item.user.nickname}}:</span>
                                            <span class="comment">{{item.content}}</span>
                                        </div>
                                        <div v-if="item.beReplied.length!=0">
                                            <div class="re-content" v-for="(one,index) in item.beReplied" :key="index">
                                                <span class="name">{{one.user.nickname}}:</span>
                                                <span class="comment">{{one.content}}</span>
                                            </div>
                                        </div>
                                        <div class="date">
                                           {{item.time}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 最新评论 -->
                        <div class="comment-wrap f-cbb">
                            <p>最新评论
                                <span class="num">
                                    ({{total}})
                                </span>
                            </p>
                            <div class="comments-wrap f-cbb" v-for="(item,index) in Comments" :key="index">
                                <div class="item f-cbb">
                                    <div class="icon-wrap">
                                        <img :src="item.user.avatarUrl" alt="">
                                    </div>
                                    <div class="content-wrap f-cbb">
                                        <div class="content">
                                            <span class="name">{{item.user.nickname}}:</span>
                                            <span class="comment">{{item.content}}</span>
                                        </div>
                                        <div v-if="item.beReplied.length!=0">
                                            <div class="re-content" v-for="(single,index) in item.beReplied" :key="index">
                                                <span class="name">{{single.user.nickname}}:</span>
                                                <span class="comment">{{single.content}}</span>
                                            </div>
                                        </div>
                                        <div class="date">
                                            {{item.time}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 分页条 -->
                        <div>
                            <el-pagination class="page"
                                @current-change="handCurrentChange"
                                background
                                layout="prev, pager, next"
                                :total="total"
                                :current-page="page"
                                :page-size="10">
                            </el-pagination>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="g-sd4">
              <div class="g-wrap7">
                  <h3 class="u-hd3">相关推荐</h3>
                  <ul class="n-multi f-cbb">
                      <li class="item f-cbb" v-for="(item,index) in simiMVs" :key="index" @mouseover="Mouseover(index)" @mouseleave="Mouseleave(index)">
                          <div class="u-cover-8">
                              <img :src="item.cover" alt="">
                              <p class="ci">
                                  <span class="num"></span>
                                 {{item.playCount}} 
                              </p>
                              <span class="open" :style="{display:(index==id)? 'block':'none'}" @click="open_mv(item.id)"></span>
                              <span class="time">{{item.duration}}</span>
                          </div>
                          <div class="cnt">
                              <p class="name">{{item.name}}</p>
                              <p class="singer">{{item.artistName}}</p>
                          </div>
                      </li>
                  </ul>
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
            //获取mvid
            mv_id:this.$route.query.q,
            //评论的总数
            total:0,
            //页码
            page:1,
            //mv地址
            url:'',
            //相关mv数组
            simiMVs:[],
            //mv的信息
            mvInfo:{},
            //头像
            icon:"",
            //热门评论
            hotComments:[],
            //最新评论
            Comments:[],
            //热门评论的总数
            hotComments_total:0,
            //最新评论的总数
            Comments_total:0,
            //播放按钮的显示
            id:undefined,
            //mv名称
            music_name:'',
            //创作者名字
            name:'',
            
        }
    },
    created(){
        //通过id值获取mv视频
       this.mv();
        //获取相关mv
       this.mvs();
        //获取mv的信息
        this.mv_info();
        //获取评论
        this.comment();
       
    },
    methods:{
         handCurrentChange(val){
            this.page=val;
            this.comment();
        },
        //通过id值获取mv视频
        mv:function(){
            axios({
                url:'https://autumnfish.cn/mv/url',
                method:'get',
                params:{
                    //获取url中的id
                    id:this.mv_id,
                }
            }).then(res=>{
                // console.log(res);
                this.url=res.data.data.url;
            })
        },
        //获取相关mv
        mvs:function(){
            axios({
                url:'https://autumnfish.cn/simi/mv',
                method:'get',
                params:{
                    mvid:this.mv_id,
                }
            }).then(res=>{
                console.log(res);
                //相关mv数组
                this.simiMVs=res.data.mvs;
                //播放量
                for(var i=0;i<this.simiMVs.length;i++){
                    if( res.data.mvs[i].playCount>10000){
                        this.simiMVs[i].playCount=parseInt(res.data.mvs[i].playCount/10000)+"w";
                    }
                    var min=parseInt(res.data.mvs[i].duration/1000/60);
                    var sec=parseInt(res.data.mvs[i].duration/1000%60);
                    if(min<10){
                        min="0"+min;
                    }
                    if(sec<10){
                        sec="0"+sec;
                    }
                    this.simiMVs[i].duration=min+":"+sec;
                }
            })
        },
         //获取mv的信息
        mv_info:function(){  
            axios({
                url:'https://autumnfish.cn/mv/detail',
                method:'get',
                params:{
                    mvid:this.mv_id,
                }

            }).then(res=>{
                // console.log(res);
                this.mvInfo=res.data.data;
                 this.name=this.mvInfo.artistName;
                 this.music_name=this.mvInfo.name;
                    // this.
                //获取歌手信息
                axios({
                    url:'https://autumnfish.cn/artists',
                    method:'get',
                    params:{
                        id:this.mvInfo.artists[0].id
                    }
                }).then(res=>{
                    // console.log(res);
                    this.icon=res.data.artist.picUrl;
                })
            })
        },
        //获取评论数据
        comment:function(){
        axios({
            url:'https://autumnfish.cn/comment/mv',
            method:'get',
            params:{
                id:this.mv_id,
                limit:10,
                offset:(this.page-1)*10,
            }
        }).then(res=>{
            // console.log(res);
            if(this.page==1){
                this.hotComments=res.data.hotComments;
                this.hotComments_total=res.data.hotComments.length;
                for(var i=0;i<this.hotComments.length;i++){
                    this.hotComments[i].time=new Date(res.data.hotComments[i].time).toLocaleString();
                }
            }
            this.Comments=res.data.comments;
            this.Comments_total=res.data.comments.length;
            // this.hotComments_total=res.data.hotComments.length;
            this.total=res.data.total;
            for(var i=0;i<this.Comments.length;i++){
                this.Comments[i].time=new Date(res.data.comments[i].time).toLocaleString();
            }
        })
        },
        Mouseover(index){
            this.id=index;
        },
        Mouseleave(index){
            this.id=undefined;
        },
        open_mv:function(id){
            this.mv_id=id;
            this.mv();
            this.mvs();
            this.mv_info();
            this.comment();
        }

    }
}

</script>

<style >
.MV2_wrap{
    width: 100%;
    background-color: #F1F1F1;
}
.g-bd4{
    width:1000px;
    min-height: 700px;
    margin: 0px auto;
    border: 1px solid #d3d3d3;
     background-color:#FFFFFF ;
    border-width: 0 1px;
}
.g-mn4{
    float: left;
    width: 100%;
    /* 两个浮动元素是否能放的下是要看margin值 */
    margin-right: -270px;
}
.g-mn4c{
    margin-right:271px;
    border-right:1px solid #d3d3d3 ;
}
.g-wrap6{
    padding: 30px 30px 40px 39px;
}
.g-wrap6 .n-mv .title{
    padding-top: 10px;
    margin-bottom: 8px;
    overflow: hidden;
}
.g-wrap6 .n-mv .title .f-thide{
    float: left;
    max-width: 100%;
   font-size: 24px;
   margin-right: 8px;
    font-weight: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 32px;
    margin-top: -10px;
}
.g-wrap6 .title .f-thide i{
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: middle;
    /* 元素设置为浮动格式，子元素会占有父元素的padding。 */
    float: left;
    margin:7px 5px auto auto;
    /* vertical-align: middle; */
    background: url(https://s2.music.126.net/style/web2/img/icon2.png?154f4e9425bd70d85e172834d31a8f8b) no-repeat -230px -480px;

}
.g-wrap6 .n-mv .title .name{
    line-height: 18px;
    font-size: 12px;
    display: inline-block;
     float: left;
     margin-top: 2px;
     color:#0c73c2 ;
}
.g-wrap6 .mv{
    width: 100%;
    height: 350px;
    margin-bottom:20px;
}
.g-wrap6 .mv video{
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: 5px;
}
.g-wrap6 .btns{
    margin-bottom:45px;
    overflow: hidden;   
}
.g-wrap6 .btn{
    padding: 0 5px 0 0;
    margin-right:10px;
    display: inline-block;
    height: 31px;
    line-height: 31px;
    float: left;
    overflow: hidden;


}
.g-wrap6 .u-btn2,.g-wrap6 .u-btn2 i, .g-wrap6 .u-btn3,.g-wrap6 .u-btn3 i,.g-wrap6 .u-btn4,.g-wrap6 .u-btn4 i{
    background: url(https://s2.music.126.net/style/web2/img/button2.png?b880a97c4a1708840fa5bb3d5f08ae3e) no-repeat right -100px;
}
.g-wrap6 .u-btn2 i{
    display: inline-block;
    padding:0px 5px 0px 10px;
     font-style: normal;
    font-weight: normal;
    height: 31px;
    line-height: 31px;
    color: #333;
    overflow: hidden;
     background-position:0 -59px;
}
.g-wrap6 .u-btn2 .icn{
    float: left;
    width: 17px;
    height: 15px;
    margin: 8px 6px 0px 0px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?b880a97c4a1708840fa5bb3d5f08ae3e) no-repeat 0px -95px;

}
.g-wrap6  .u-btn3{
    background-position: right -1020px;
}
.g-wrap6 .u-btn3 i{
    float: left;
    height: 31px;
    line-height: 31px;
    min-width: 23px;
    cursor: pointer;
    padding:0px 7px 0 36px;
    font-style: normal;
    font-weight: normal;
    background-position:0px -977px;
}
.g-wrap6 .u-btn4{
    background-position:right -1020px;
}
.g-wrap6 .u-btn4 i{
    float: left;
    height: 31px;
    line-height: 31px;
    min-width: 23px;
    padding: 0px 7px 0px 36px;
   background-position:0px -1225px;
    font-style: normal;
    font-weight: normal;
}
.info-wrap{
    width: 100%; 
    margin-bottom: 50px;
    overflow: hidden;  
}
.info-wrap .singer-wrap{
    width: 100%;
    overflow: hidden;
    padding-bottom: 20px;
}
.singer-wrap .singer-pic{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color:red;
    float: left;
    margin-right: 10px;
    overflow: hidden;
}
.singer-wrap .singer-pic img{
    width: 100%;
    height:100%;
}
.singer-wrap .singer-name{
    display: inline-block;
    float: left;
    height: 71px;
    line-height: 71px;
}
.mv-info{
    width: 100%;
    padding-bottom: 20px;
}
.mv-info .title2{
    font-size: 30px;
    padding-bottom: 30px;
}

.mv-info .number{
    color: #bebebe;
    font-size: 12px;
}
.mv-info .desc{
    padding-top: 35px;

}
.g-sd4{
    position: relative;
    float: right;
    width: 270px;
  
}
.g-wrap7{
   padding: 20px 20px 20px 20px; 
}
.g-wrap7 .u-hd3{
    height: 23px;
    margin-bottom: 24px;
    border-bottom: 1px solid #ccc;
    color: #333;
}
.g-wrap7 .n-multi{
    list-style: none;
}
.g-wrap7 .item{
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;
}
.g-wrap7 .item .u-cover-8{
    width: 130px;
    height:85px;
    float: left;
    overflow: hidden;
    position: absolute;
}
.g-wrap7 .item .u-cover-8 img{
    width: 100%;
    height: 100%;
}
.g-wrap7 .item .u-cover-8 .ci{
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 13px;
    color: #ffffff;
}
.ci .num{
    border: 7px solid #ffffff;
    border-color: transparent transparent transparent #ffffff;
    /* border-radius: 10px 10px 10px 0; */
    display: inline-block;
    margin-right: -5px;
}
.n-multi .item .open{
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    margin: auto;
    cursor: pointer;
    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAwFBMVEUAAAATExMlJSUHBweRkZH///////9HcEz09PT///////////////8cHBz///+0tLT////////////b29vy8vLv7+////////98fHz///9AQEA3Nzf////Pz8////9lZWXDw8P////////////e3t6bm5vY2Njw8PCxsbH///+5ublgYGBdXV3////////////k5ORdXV0wMDDt7e2mpqb////h4eF4eHhCQkKNjY3JyclPT0/U1NTQ0NDc3Nzg4ODNvLiUAAAAQHRSTlNmaGlnc2F+APCABx95aWR3DVMKe+1+WitxSmtrA3pxb3g+Imh8oNDrr1d4b244OiXbg3Pnp3fYjnmZwn7Lx9R8wCePZgAAAi9JREFUSMell9da3DAQhcdVc9zLFrb3Ql3CsoEEkrz/W+WCJWAsW3J8Lm39n+yZ0dEMCam8wyKNpgEQTKN0cfDkq0jyLLmLXBTkRneJFuz3XABzezY0DSLDHM7sOQC35yth3wEQ31hUkHUTA3D8WjhJgdw2SCLDzoE0qYb7Abo2VcruIuhXwOMBEJtUIzMGBmMZ7DnABSl0AThZGc5W+DMipUY5VtlX2FthYpKGwglWXhEeO5iERJq0My7AA6xN0pS5xuAz3AdGpK0R0P+Ak0Ad52LMg+QffImYGinG5Tu8RDdsBoddLM+wA5sayobzBvvIqbFy+EKQED3Zxpvd9ql+654QJDIXkjN4z8w/H6phA24mSNziSvJyx8x8/FFNX+FWkHBwLXnHb3p9roKv4QjyXFjVMO82lhy24Hp0wJxqYObti5ye40ALeZI/YN49WvJ4LyjFTAEzf/8mWTFDShGGSpg7+3I2h4hoClMNM9+XNjcxpQCGDsy7TalMAgJIC2bef1kCNICPpURrf3Zp5xAn3YBx51ESMK1UyVI9RKRVJNzZW9IiUZcn8++XivJUHoyq2p7joDqSzNvn6iNZbwZ83NSZQYUNndlfD/U2JDfAdw+z6g1Qbr0q9zxbr9z0N8fXJx3Tb3XdtLvoWl2x7S73Vm2FEAOstX87zIsNTbtWSmRNmrhM0j6u/7d9bNe4tmuZ2zXrLccE1YCybDQaWVaj0ajlUPZpHDy57qluHPwLCJFHIPLGbYAAAAAASUVORK5CYII=) no-repeat center center;
    /* background-color: red; */
}
.n-multi .item .time{
    display: block;
    position: absolute;
    width: 32px;
    height: 18px;
    line-height: 20px;
    bottom: 0px;
    right: 0px;
    color: #ffffff;
    font-size: 13px;
    /* background: black; */
}
.item .cnt{
    position: relative;
    margin-left:135px;
    height: 85px;
    float: left;
}
.item .cnt .name{
    width: 100px;
    padding:-1px 5px 10px 0;
    font-size: 13px;
    position: absolute;
    top: 0px;

}
.item .cnt .singer{
    width:100px;
    font-size: 12px;
    color: #ccc;
    position: absolute;
    bottom: 0px;
}
</style>
