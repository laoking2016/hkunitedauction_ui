<template>
    <div>
        <van-nav-bar left-arrow fixed id="nav-bar" :border="false" @click-left="$router.back(-1)" @click-right="openMenu">
            <van-icon name="share" slot="right" size="1.2rem" color="white"/>
        </van-nav-bar>
        <van-swipe>
            <van-swipe-item v-for="(item, index) in images" :key="index" @click="previewImages">
                <img :src="toImageUrl(item.vpath, item.name)" :style="{height: '20rem', width: '100%'}" />
            </van-swipe-item>
        </van-swipe>
        <van-cell-group>
            <van-cell :border="false" :label="`(含${poundageRate * 100}%手续费不含邮费，邮费${transportationCost}元)`">
                <span slot="title">&yen; {{finalPrice}}元</span>
                <van-icon name="like-o" slot="right-icon" style="font-size:20px;color:white" />
            </van-cell>
            <van-cell :border="false" :title="name" :label="description"></van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell :border="false" title="支付方式" :value="payments.join(',')">
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="博彦收藏" value="在售商品"></van-cell>
        </van-cell-group>
        <div style="position:fixed;bottom:0px;width:100%;" v-show="status == 'PUBLISHED'">
            <div style="font-size:14px;background-color:white;width:100%;height:30px;line-height:30px;padding-left:10px;">成交 {{finalPrice}}(手续费{{poundageRate * 100}}%)</div>
            <van-row type="flex" style="border:1px solid #ebedf0;">
                <van-col span="12">
                    <van-button type="warning" style="width:100%" @click="addToCart">加入购物车</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="danger" style="width:100%" @click="submitToOrder">立即购买</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import { ImagePreview, Toast } from 'vant'
import axios from 'axios'
import { toImageUrl } from '../util/image'
import { calcRemainDate } from '../util/date'

export default{
    computed: {
        finalPrice(){
            return Math.round(this.initPrice * this.discount * (1 + this.poundageRate));
        }
    },
    mounted(){
        
        this.id = this.$route.params.id;
        this.reload();
    },
    methods: {
        toImageUrl: toImageUrl,
        submit(){
            axios.post(`/auction/bid`, {
                parentId: this.id,
                bidPrice: this.priceInput
            }).then((response) => {
                Toast.success('出价成功');
                this.reload();
            });
        },
        getInc(price){
            var inc = 0;
            price = parseFloat(price);
            if(price < 100){
                inc = 5;
            }else if(price >= 100 && price < 1000){
                inc = 10;
            }else{
                inc = 20;
            }
            return inc;
        },
        up(){
            var inc = this.getInc(this.priceInput);
            this.priceInput = parseFloat(this.priceInput) + inc;
        },
        down(){
            if(this.priceInput <= this.nextBid){
                return;
            }
            var inc = this.getInc(this.priceInput);
            this.priceInput = parseFloat(this.priceInput) - inc;
        },
        reload(){
            axios.get(`/mall/good?filter=${encodeURIComponent(`id=${this.id}`)}`).then((response) => {
                var data = response.data.list[0];
                this.status = data.status;
                this.id = data.id;
                this.name = data.name;
                this.images = data.images;
                this.initPrice = data.initPrice;
                this.discount = data.discount;
                this.description = data.description;
                this.payments = data.payments;
                this.transportationCost = data.transportationCost;
                this.poundageRate = data.poundageRate;
            });
        },
        addToCart(){
            axios.post(`/mall/cart?goodId=${this.id}`).then((response) => {
                Toast.success('成功加入购物车');
            });
        },
        submitToOrder(){

        },
        previewImages(){
            var images = this.images.map((item) => {
                return toImageUrl(item.vpath, item.name);
            });
            ImagePreview(images);
        }
    },
    data(){
        return {
            id: null,
            showMenu: false,
            images: [],
            payments: ["微信", "支付宝", "店取", "内地银行转账"],
            initPrice: 0,
            transportationCost: 0,
            poundageRate: 0
        }
    }
}
</script>
<style scoped>
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #1989fa;
}
#nav-bar{
    background-color:transparent;
}
</style>