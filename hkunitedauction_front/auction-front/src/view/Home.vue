<template>
    <div>
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" :style="{height: '12rem', width: '100%'}" />
            </van-swipe-item>
            <div slot="indicator"></div>
        </van-swipe>
        <div style="margin:0.5rem;padding:0.5rem;background-color:white;">
            <van-grid :column-num="4" :border="false">
                <van-grid-item>
                    <img slot="icon" src="http://101.201.233.31/wechat-app-qa/images/class.jpg" class="icon-size">
                    <div slot="text">分类</div>
                </van-grid-item>
                <van-grid-item>
                    <img slot="icon" src="http://101.201.233.31/wechat-app-qa/images/contact.jpg" class="icon-size">
                    <div slot="text">联系我们</div>
                </van-grid-item>
                <van-grid-item>
                    <img slot="icon" src="http://101.201.233.31/wechat-app-qa/images/jingjia.jpg" class="icon-size">
                    <div slot="text">竞价说明</div>
                </van-grid-item>
                <van-grid-item>
                    <img slot="icon" src="http://101.201.233.31/wechat-app-qa/images/paimai.jpg" class="icon-size">
                    <div slot="text">历史成交</div>
                </van-grid-item>
            </van-grid>
        </div>
        <div style="margin:0.5rem;padding:0.5rem;background-color:white;">
            <van-row type="flex" justify="space-between">
                <van-col span="6">热门推荐</van-col>
                <van-col span="7">
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="selectedMenu" :options="menus" />
                    </van-dropdown-menu></van-col>
            </van-row>
        </div>
        <div style="margin-left:0.5rem;margin-right:0.5rem;margin-top:-0.5rem;">
            <van-grid :column-num="2">
                <van-grid-item :key="index" v-for="(item, index) in data" :to="`/lot/${item.id}`" style="width:100%">
                    <div slot="icon" class="img-item" :style="{backgroundImage: `url(${item.image})`}"></div>
                    <div slot="text" style="width:100%">
                        <div>{{item.name}}</div>
                        <div>&yen;{{item.quote}}</div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <main-menu selectedItem="auction" />
    </div>
</template>
<script>
import axios from 'axios'
import { featuredImage } from '../util/image'

export default {
    methods: {
        
    },
    mounted(){
        axios.get(`/auction/lot?filter=${encodeURIComponent(`status=20&status=30`)}`).then((response) => {
            this.data = response.data.list.map((item, index) => {
                return {
                    id: item.id,
                    name: item.name,
                    image: featuredImage(item.images),
                    quote: item.nextBid == null ? 0 : item.nextBid
                }
            });
        });
    },
    data(){
        return {
            images: [
                'http://101.201.233.31/upload_dir/ad/01.jpg?v=3',
                'http://101.201.233.31/upload_dir/ad/02.jpg?v=3'
            ],
            selectedMenu: 'a',
            menus: [
                { text: '日期降序', value: 'a' },
                { text: '日期升序', value: 'b' },
                { text: '价格降序', value: 'c' },
                { text: '价格升序', value: 'd' },
            ],
            data:[]
        }
    }
}
</script>
<style scoped>
.icon-size{
    width: 2.3rem; 
    height: 2.3rem !important;
}
.van-cell__value {
    overflow: auto !important;
}
.van-dropdown-menu{
    height: auto !important;
}
.img-item{
    width: 10rem;
    height: 7.8rem;
    background-repeat: no-repeat;
    background-size: 100% auto;
}
</style>