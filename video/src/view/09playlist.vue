<template>
    <div class="playDetail-container">
         <div class="playDetail-wrap">
             <div class="playDetail-wrap2">
                 <div class="m-info">
                    <div class="cover">
                        <img :src="playlist.coverImgUrl" alt="">
                    </div>
                    <div class="cnt">
                        <div class="cntc">
                            <div class="hd">
                                <i class="u-icn"></i>
                                <div class="tit">
                                    <h2 class="f-ff2">{{playlist.name}}</h2>
                                </div>
                            </div>
                            <div class="user">
                                <a class="face">
                                    <img :src="playlist.creator.avatarUrl" alt="">
                                </a>
                                <span class="name">
                                    <a href="#"  class="s-fc s-fc7">{{playlist.creator.nickname}}</a>
                                </span>
                                <span class="time s-fc4">
                                    {{playlist.createTime}}&nbsp;创建
                                </span>
                            </div>
                            <div class="btns">
                                <a href="" class="u-btn">
                                    <i>
                                        <em class="ply"></em>
                                        播放
                                    </i></a>
                                <a href="" class="u-btni u-btni-add "></a>
                                <a href="" class="u-btni u-btni-fav">
                                    <i>({{storeCount}})</i>
                                </a>
                                <a href="" class="u-btni u-btni-share">
                                    <i>({{shareCount}})</i>
                                </a>
                                <a href="" class="u-btni u-btni-cmmt" >
                                    <i>下载</i>
                                </a>
                                <a href="" class="u-btni u-btni-dl">
                                    <i>({{subscribedCount}})</i>
                                </a>
                            </div>
                            <div class="tags">
                                <b>标签：</b>
                                <a href="" class="u-tag" v-for="(item,index) in playlist.tags" :key="index">
                                    <i>{{item}}</i>
                                </a>
                            </div>
                            <p class="intr">
                                <b>介绍:</b>
                                {{playlist.description}}
                            </p>
                        </div>
                    </div>
                 </div>
                 <div class="m-con">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="歌曲列表" name="1">
                        <div class="j-flag">
                            <table class="m-table">
                                <thead>
                                    <tr>
                                        <th class="w1">
                                            <div class="wp">
                                            </div>
                                        </th>
                                        <th class="w2">
                                            <div class="wp af0"></div>
                                        </th>
                                        <th class="w3">
                                            <div class="wp af1"></div>
                                        </th>
                                        <th class="w4">
                                            <div class="wp af2"></div>
                                        </th>
                                        <th class="w5">
                                            <div class="wp af3"></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-for="(item,index) in playlist.tracks" :key="index">
                                    <tr class="even" :style="{background:(index%2==0)? '#F7F7F7':'#FFFFFF'}">
                                        <td class="left">
                                            <div class="hd">
                                                <span class="num">{{index+1}}</span>
                                                <span class="ply" @click="begin(item.id)"></span>
                                            </div>
                                        </td>
                                        <td class="left2">
                                            <div class="f-cb"> 
                                                <div class="tt">
                                                    <div class="ttc">
                                                        <span class="txt">
                                                            <span class="song">{{item.name}}</span>
                                                            <!-- 数组方式动态实现类名选择 -->
                                                            <span :class="[item.mv!=0? 'mv':'']" @click="open_mv(item.mv)"></span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="left3">
                                            <span class="u-dur">{{item.dt}}</span>
                                        </td>
                                        <td class="left4">
                                            <div class="text">{{item.ar[0].name}}</div>
                                        </td>
                                        <td class="left5">
                                            <div class="text">{{item.al.name}}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'评论('+comments+')'" name="2">
                        <!-- 精彩评论区 -->
                        <div class="comment-wrap f-cbb">
                            <p>热门评论
                                <span class="num">
                                    ({{hotCount}})
                                </span>
                            </p>
                            <div class="comments-wrap f-cbb" v-for="(item,index) in hotComment" :key="index">
                                <div class="item f-cbb">
                                    <div class="icon-wrap">
                                        <img :src="item.user.avatarUrl" alt="">
                                    </div>
                                    <div class="content-wrap f-cbb">
                                        <div class="content">
                                            <span class="name">{{item.user.nickname}}:</span>
                                            <span class="comment">{{item.content}}</span>
                                        </div>
                                        <div class="re-content" v-if="item.beReplied.length!=0">
                                            <span class="name">{{item.beReplied[0].nickname}}:</span>
                                            <span class="comment">{{item.beReplied[0].content}}</span>
                                        </div>
                                        <div class="date">
                                            {{item.time}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 最新评论区 -->
                        <div class="comment-wrap f-cbb">
                            <p>最新评论
                                <span class="num">
                                    ({{total}})
                                </span>
                            </p>
                            <div class="comments-wrap f-cbb" v-for="(item,index) in newComment" :key="index">
                                <div class="item f-cbb">
                                    <div class="icon-wrap">
                                        <img :src="item.user.avatarUrl" alt="">
                                    </div>
                                    <div class="content-wrap f-cbb">
                                        <div class="content">
                                            <span class="name">{{item.user.nickname}}:</span>
                                            <span class="comment">{{item.content}}</span>
                                        </div>
                                        <div class="re-content" v-if="item.beReplied.length!=0">
                                            <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                                            <span class="comment">{{item.beReplied[0].content}}</span>
                                        </div>
                                        <div class="date">
                                            {{item.time}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 分页 -->
                        <div class="f-cbb el">
                            <el-pagination class="page"
                                @current-change="handCurrentChange"
                                background
                                layout="prev, pager, next"
                                :total="total"
                                :current-page="page"
                                :page-size="20">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    </el-tabs>
                </div>
                
            </div> 
        </div> 
    </div>
</template>

<script>
//导入axios
import axios from 'axios'
export default {
    name:'playlist2',
    data(){
        return{
            activeName:'1',
            //总条数
            total:0,
            //页码
            page:1,
            //歌单详情数据
            playlist:{},
            //歌曲地址
            url:'',
            //热门评论数组
            hotComment:[],
            //最新评论数组
            newComment:[],
            //热门评论的个数
            hotCount:undefined,
            //总的评论数
            comments:0,
            //歌单收藏总数
            storeCount:0,
            //分享总数
            shareCount:0,
            //留言总数
            subscribedCount:0,
            
        }
    },
    created(){
        axios({
            url:"https://autumnfish.cn/playlist/detail",
            method:'get',
            params:{
                id:this.$route.query.q
            }
        }).then(res=>{
            // console.log(res);
            this.playlist=res.data.playlist;
            //歌单的评论总数
            this.comments=res.data.playlist.commentCount;
            //歌单的收藏，分享，留言总数
            this.storeCount=res.data.playlist.playCount;
            this.shareCount=res.data.playlist.shareCount;
            this.subscribedCount=res.data.playlist.subscribedCount;
            //将以毫秒为单位的时间转换为特定格式的时间
            this.playlist.createTime=new Date(res.data.playlist.createTime).toLocaleDateString();
            //播放时间
            var tra=this.playlist.tracks;
            for(var i=0;i<tra.length;i++){
                var dt=this.playlist.tracks[i].dt;
                var min=parseInt(dt/1000/60);
                var sec=parseInt(dt/1000%60);
                if(min<10){
                    min="0"+min;
                }
                if(sec<10){
                    sec="0"+sec;
                }
               this.playlist.tracks[i].dt=min+":"+sec;
            }
            
        }),
        //获取 评论
        axios({
           url:"https://autumnfish.cn/comment/hot",
           method:'get',
           params:{
               id:this.$route.query.q,
               //传递类型
               type:2
           }

        }).then(res=>{
            // console.log(res);
            this.hotComment=res.data.hotComments;
            this.hotCount=res.data.total;
            for(var i=0;i<this.hotComment.length;i++){
                res.data.hotComments[i].time=new Date(this.hotComment[i].time).toLocaleDateString();
            }
        }),
        //获取最新评论
        this.comment();
    },
    methods:{
        handleClick(tab,event){
            console.log(tab.event)
        },
        handCurrentChange(val){
            this.page=val;
            this.comment();
        },
        begin:function(id){
            axios({
                url:'https://autumnfish.cn/song/url',
                method:'get',
                params:{             
                    id:id,
                }
            }).then(res=>{
                // console.log(res);
                this.url=res.data.data[0].url;
                // console.log(this.url);
                this.$parent.musicUrl=this.url;
            })
        },
        comment:function(){
             axios({
            url:"https://autumnfish.cn/comment/playlist",
            method:'get',
            params:{
                id:this.$route.query.q,
                limit:10,
                offset:(this.page-1)*10,
            }
        }).then(res=>{
            // console.log(res);
            this.newComment=res.data.comments;
            //总个数
            this.total=res.data.total;
            for(var i=0;i<this.newComment.length;i++){
                this.newComment[i].time=new Date(this.newComment[i].time).toLocaleDateString();
            }
        })  
        },
        open_mv:function(id){
            this.$router.push(`/MV2?q=${id}`);
        }
    }
}

</script>

<style>
/* 分页条样式设置*/

.el-pagination{
   width: 500px;
   margin: auto;
}
body{
    font-size: 12px !important;
    color:#333;
    font-family: Arial, Helvetica, sans-serif;
}
a,a *,.f-hand,.f-hang *{
    cursor: pointer;
    text-decoration: none;
}
.playDetail-container{
    width: 100%;
    min-height: 700px;
    /* margin: 0px auto; */
    position: relative;
    background-color:#F5F5F5;
    /* display: flex; */
}
.playDetail-container:after{
     clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden; 
}
.playDetail-wrap::after{
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.playDetail-wrap{
    width: 1000px;
    background-color:#FFFFFF;
    border: 1px solid #d3d3d3;
    margin: auto;
    
}
.playDetail-container>.playDetail-wrap>.playDetail-wrap2{
    padding: 47px 50px 40px 40px;
}
.playDetail-wrap2::after{
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
}
.m-info{
    overflow: hidden;
}
.m-info .cover{
    width: 200px;
    height: 200px;
    float: left;
    position: absolute;
    display: inline;
    padding: 5px;
    border: 1px solid #d5d5d5;
    margin: 0px -220px 0px 0px;
    /* z-index: 0; */
}
.m-info .cover img{
    width: 100%;
    height: 100%;

}
.m-info .cnt{
    float: right;
    width: 100%;
}
.m-info .cntc{
    margin-left: 280px;
    margin-top: 5px;
}
.m-info .hd{
    position: relative;
    margin: 0 0 12px;
    line-height: 24px;
}
.u-icn{
    width: 54px;
    height: 24px;
    /* background-position:0 -2/43px; */
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    float:left;
    background:url(https://s2.music.126.net/style/web2/img/icon.png?1f73f289d8e007c4013112f187bf555a) no-repeat 0 -245px ;
}
.m-info .tit{
    margin-left: 64px;
    position: relative;
    line-height: 24px;
}
.m-info .hd h2{
    line-height: 24px;
    font-size: 20px;
    font-weight: normal;
}
.m-info .user{
    margin: 0px 0px 20px;
    line-height: 40px;
}
.m-info .user .face{
    margin-right: 18px;
}
.m-info .user .face,.m-info .user .face img{
    float: left;
    width: 40px;
    height: 40px;
}
.m-info .user .name{
    /* span元素添加float属性或者absolute属性会使行内元素变为块级元素 */
    float: left;
    /* 父元素设置了line-height，所以整个元素的高就会变为设置的line-height的值 */
}
.s-fc{
     font-size: 14px;
    color: #0c73c2;
}
.m-info .user .time{
    margin-left:20px;
    font-size: 14px;
}
.s-fc4,a.s-fc:hover{
    color:#999;
}
.m-info .btns{
    margin-bottom:25px;
    margin-right: -10px;
    /* 子元素都设置了浮动属性，所以父元素得设置overflow，以防止父元素高度塌陷 */
    overflow: hidden;
    line-height: 31px;
}
.u-btn,.u-btn:hover{
    display:inline-block;
    height: 31px;
    overflow: hidden;
    vertical-align: top;
    float: left;
    color: #fff;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat right -428px;
    text-decoration: none;
    text-align: center;
    padding: 0px 5px 0px 0px;
    
}
.u-btn i{
    display: inline-block;
    height: 31px;
    line-height: 31px;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    padding: 0px 7px 0px 8px;
    /* 背景图片的开始是从padding的边界的开始的 */
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0 -387px;
    font-style: normal;
    font-size: 12px;
}
.u-btn .ply{
    width: 20px;
    height: 18px;
    float: left;
    overflow: hidden;
    margin: 6px 2px 2px 0;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px -1622px;
}
.u-btni,.u-btni i{
    float: left;
    height: 31px;
    line-height: 30px;
    min-width: 23px;
    cursor: pointer;
    font-family: simsun,\5b8b\4f53;
    font-style: normal;
    padding: 0px 5px 0px 0px;
    color: #333;
    font-size: 12px;
}

.u-btni-add{
    width: 31px;
    margin-left: -3px;
    margin-right: 5px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px -1588px;
}
.m-info .u-btni-fav{
    margin-right: 6px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat right -1020px;
}
.m-info .u-btni i{
    padding-right: 2px;
    padding-left: 28px;
}
.m-info .u-btni-share{
    margin-right: 6px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat right -1020px;
}
.m-info .u-btni-fav i{
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px -977px;
}
.u-btni-share i{
    background:url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px -1225px;
}
.m-info .u-btni-cmmt{
    margin-right: 6px;
    background:url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat right -1020px;
}
.u-btni-cmmt i{
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px -2761px;
}
.m-info .u-btni-dl{
    margin-right:6px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat right -1020px;
}
.u-btni-dl i{
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px -1465px;
}
.m-info .tags{
    margin: 25px 0px 5px;
    line-height: 22px;
    overflow: hidden;
}
.tags b{
    float: left;
    font-weight: normal;
    color: #666;
    font-size: 12px;

}
.u-tag,.u-tag:hover{
    color: #777;
    text-decoration: none;
}
.u-tag,.u-tag i{
    height: 22px;
    line-height: 22px;
}
.tags .u-tag{
    padding:0px 10px 0px 0px;
    float: left;
    margin: 0px 10px 3px 0px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat right -27px;
}
.u-tag i{
    /* 元素设置为浮动或者是绝对定位，固定定位则变为块级元素 */
    position: relative;
    float: left;
    padding: 0 3px 0 13px;
    font-style: normal;
    font-size: 12px;
    background: url(https://s2.music.126.net/style/web2/img/button2.png?415d719eca011e520d34e93b99e9c22b) no-repeat 0px 0px;
}
.intr{
    margin-top: 4px;
    line-height: 18px;
    color:#666;
    font-size: 12px;
}
.intr b{
    display: inline-block;
    font-weight: normal;
    color: #666;
    font-size: inherit;  
}
.j-flag{
    border-top: 2px solid #c20c0c;
}
.m-table{
    width: 100%;
    border: 1px solid #d9d9d9;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
.m-table th{
    height: 35px;
    background: #f7f7f7;
    /* 子元素在th中自动默认为center */
    /* vertical-align: top; */
    text-align: left;
    font-weight: normal;
    color: #666;
    background: url(https://s2.music.126.net/style/web2/img/table.png?42934e19ed0324dbf5de6b2b62f892e0) no-repeat 0px 0px;
    background-repeat: repeat-x;
}
.m-table .w1{
    width: 85px;
}
.m-table th .wp{
    padding: 8px 10px;
    font-size: 12px;
    /* 这里可以不设置高度，div的高度由里面内容撑开  但是为了要设置背景图片，所以要设置高度 */
    height: 18px;
    line-height: 18px;
    background: url(https://s2.music.126.net/style/web2/img/table.png?42934e19ed0324dbf5de6b2b62f892e0) no-repeat -1px -56px;  
}
.m-table .af0:after{
    content:'\6b4c\66f2\6807\9898';
}
.m-table .w3{
    width: 130px;
}
.m-table .af1:after{
    content:'\65f6\957f';
}
.m-table .w4{
    width: 20%;
}
.m-table .af2:after{
    content:'\6b4c\624b';
}
.m-table .w5{
    width: 25%;
}
.m-table  .af3:after{
    content:'\4e13\8f91';
}
.m-table .even td{
    padding: 6px 10px;
    line-height: 40px;
    text-align: left;
}
.m-table .hd{
    height: 18px;
    line-height: 18px;
}
.m-table .even .hd .num{
    font-size: 12px;
    margin-left:12px;
}
.m-table .even .hd .ply{
    float: right;
    width: 17px;
    height: 17px;
    cursor: pointer;
    margin-right: 5px;
    background: url(https://s2.music.126.net/style/web2/img/table.png?42934e19ed0324dbf5de6b2b62f892e0) no-repeat 0px -103px;
}
.m-table .f-cb{
    clear: both;
    content: '.';
    display: block;
    height: 0;
    /* visibility: hidden; */
}
.left2 .tt{
   width: 100%;
    /* 因为父元素使用了伪类选择器after，所以会占用一定的块级空间，使用float可以避开 */
    float: left;
}
.left2 .ttc{
    height: 18px;
    line-height: 18px;
    margin-right:20px;
}
.left2 .txt{
    position: relative;
    display: inline-block;
    padding-right: 25px;
    height: 20px;
    overflow: hidden;
    /* 超出父元素的子元素内容变为... */
    text-overflow: ellipsis;
}
.left2 .mv{
    width: 23px;
    height: 17px;
    display: inline-block;
    position: absolute;
    right: 0px;
    float: left;
    background: url(https://s2.music.126.net/style/web2/img/table.png?42934e19ed0324dbf5de6b2b62f892e0) no-repeat 0px -151px;
    cursor: pointer;
}
.left2 .song{
    vertical-align: bottom;
}
.left3 .u-dur{
    font-size: 12px;
}
.m-table .text{
    width: 100%;
    height: 18px;
    line-height: 18px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
}
.comment-wrap{
    width: 100%;
    margin-bottom: 50px;
}
.f-cbb::after{
    clear: both;
    /* float: left; */
    content: '.';
    height: 0;
    display: block;
    visibility: hidden;
}
.comment-wrap p,.comment-wrap .num{
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
}
.comments-wrap{
    width: 100%;    
}
.comments-wrap .item{
    padding-top: 20px;
}
.comments-wrap>.item>.icon-wrap{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background: red;
    overflow: hidden;
    float: left;
    position: absolute;
}
.comments-wrap .item .icon-wrap img{
    width: 100%;
    height: 100%;
}
.content-wrap{
    margin-left:62px;    
}
.content,.re-content,.date{
    margin-right: 200px;
    margin-bottom: 8px;
    /* line-height: 20px; */
}
.re-content{
    background-color:#E6E5E6 ;
    padding:8px;
    border-radius: 3px;

}
.content .name,.re-content .name{
    color: #517eaf;
    font-size: 13px;
}
.content .comment,.re-content .comment{
    font-size: 12px;
    font-weight: normal;
    color: #333;
}
.date{
    color: #bebebe;
    font-size: 12px;
}
</style>
