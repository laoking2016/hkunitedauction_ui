<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" >
            <span style="color:white" slot="title">邮票</span>
        </van-nav-bar>
        <van-list style="margin-top:46px;">
            <van-card
                :num="item.num"
                :price="item.price"
                :desc="item.desc"
                :title="item.title"
                :thumb="item.thumb" :key="index" v-for="(item, index) in goods">
            </van-card>
        </van-list>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goods: [
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
<style>
#nav-bar{
    background-color:black;
}
</style>