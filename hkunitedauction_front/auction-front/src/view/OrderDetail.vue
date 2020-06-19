<template>
    <div>
        <van-nav-bar left-arrow id="nav-bar" :border="false" @click-left="$router.back(-1)">
            <div style="color:white" slot="title">订单详情</div>
        </van-nav-bar>
        <van-steps :active="activeStep">
            <van-step>待支付</van-step>
            <van-step>待发货</van-step>
            <van-step>待收货</van-step>
            <van-step>已完成</van-step>
        </van-steps>
        <van-cell-group style="margin-top:0.5rem;">
            <van-cell title="订单编号" :value="id"></van-cell>
            <van-cell title="下单时间" :value="date"></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top:0.5rem;">
            <van-cell title="总金额" :value="finalAmount"></van-cell>
            <van-cell title="运费" :value="transportCost"></van-cell>
            <van-cell title="实付款" :value="transportCost"></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top:0.5rem;">
            <van-cell :title="name" :label="address" :value="contact"></van-cell>
        </van-cell-group>
        <van-card
            :num="item.num"
            :price="item.price"
            :desc="item.desc"
            :title="item.title"
            :thumb="item.thumb" :key="index" v-for="(item, index) in goods">
        </van-card>
        <div style="position:fixed;bottom:0px;width:100%;">
            <van-button v-show="status == 'SUBMITTED'" type="danger" size="large" @click="pay">确认支付</van-button>
            <van-button v-show="status == 'SHIPPING'" type="danger" size="large" @click="receive">确认收货</van-button>
        </div>
    </div>
</template>
<script>
var moment = require('moment')
import axios from 'axios'
import { featuredImage } from '../util/image'

export default {
    mounted(){
        this.id = this.$route.params.id
        this.reload()
    },
    computed: {
        activeStep(){
            if(this.status == 'SUBMITTED'){
                return 0
            }
            if(this.status == 'PAYED'){
                return 1
            }
            if(this.status == 'SHIPPING'){
                return 2
            }
            if(this.status == 'RECEIVED'){
                return 3
            }
        }
    },
    methods: {
        featuredImage,
        receive(){
            axios.post(`/order/order/${this.id}/receive`).then((response) => {
                this.$toast("确认收货已提交");
                this.reload();
            })
        },
        pay(){
            axios.post(`/order/order/${this.id}/pay`).then((response) => {
                this.$toast("确认付款已提交");
                this.reload();
            })
        },
        reload(){
            axios.get(`/order/order?filter=${encodeURIComponent(`id=${this.id}`)}`).then((response) => {
                var order = response.data.list[0];
                this.name = order.name;
                this.contact = order.contact;
                this.address = order.address;
                this.finalAmount = order.finalAmount;
                this.status = order.status;
                this.date = moment(order.orderDate).format('YYYY/MM/DD HH:mm:ss');
                this.goods = order.detail.map((item) => {
                    return {
                        price: item.finalPrice,
                        desc: item.description,
                        title: item.name,
                        thumb: this.featuredImage(item.images)
                    }
                })
            })
        }
    },
    data(){
        return {
            id: null,
            name: null,
            date: null,
            goods: [],
            status: null
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