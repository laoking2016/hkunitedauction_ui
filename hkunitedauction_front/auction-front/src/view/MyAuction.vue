<template>
    <div>
        <van-nav-bar left-arrow id="nav-bar" :border="false" @click-left="$router.back(-1)">
            <div style="color:white" slot="title">{{title}}</div>
        </van-nav-bar>
        <van-list>
            <van-card
                :num="item.num"
                :price="item.price"
                :desc="item.desc"
                :title="item.title"
                :thumb="item.thumb" :key="index" v-for="(item, index) in data" @click="viewOrderDetail(1)">
                
            </van-card>
        </van-list>
    </div>    
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { featuredImage } from '../util/image'

export default {
    mounted() {
        this.type = this.$route.params.type;
        axios.get(`/auction/member/lot/${this.type}?page=1&pagesize=10`).then((response) => {
            this.data = response.data.list.map((item) => {
                return {
                    price: item.nextBid,
                    desc: item.description,
                    title: item.name,
                    thumb: featuredImage(item.images)
                }
            });
        });
    },
    computed: {
        ...mapGetters({
            user: 'user/user'
        }),
        title(){
            switch(this.type){
                case 'getting':
                    return '竞买中';
                case 'got':
                    return '已得标';
                case 'failed':
                    return '未得标';
            }
        }
    },
    methods: {
        viewOrderDetail(id){
            this.$router.push(`/order/detail/${id}`);
        }
    },
    data(){
        return {
            type: 'getting',
            data: [
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                },
                {
                    price: 2.00,
                    desc: "描述信息",
                    title: "商品标题",
                    thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
                }
            ]
        }
    }
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
#nav-title .van-dropdown-menu__title {
    color:white;
}
</style>