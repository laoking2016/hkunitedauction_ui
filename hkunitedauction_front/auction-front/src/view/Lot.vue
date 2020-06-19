<template>
    <div>
        <van-nav-bar left-arrow fixed id="nav-bar" :border="false" @click-left="$router.back(-1)" @click-right="openMenu">
            <van-icon name="share" slot="right" size="1.2rem" color="white"/>
        </van-nav-bar>
        <van-swipe>
            <van-swipe-item v-for="(item, index) in images" :key="index" @click="previewImages">
                <img :src="toImageUrl(item.vpath, item.name)" :style="{height: '20rem', width: '100%'}" />
            </van-swipe-item>
            <div slot="indicator" style="position:absolute;bottom:0px;padding:0.6rem;width:100%">
                <van-row type="flex" justify="space-between">
                    <van-col span="20">
                        <van-tag type="warning">{{ status == 'PUBLISHED' ? '预展' : '竞价中'}}</van-tag>
                        <van-count-down style="margin-left:0.5rem;">
                            <template>
                                <span style="font-size:0.75rem;color:white;margin-right:0.3rem;">{{ status == 'PUBLISHED' ? '距开始' : '距结标' }}</span>
                                <span class="item" v-show="days > 0">{{this.days}}</span>
                                <span class="item">{{this.hours}}</span>
                                <span class="item">{{this.minutes}}</span>
                                <span class="item">{{this.seconds}}</span>
                            </template>
                        </van-count-down>
                    </van-col>
                </van-row>
            </div>
        </van-swipe>
        <van-cell-group>
            <van-cell :border="false" :label="`(含${poundageRate * 100}%手续费不含邮费，邮费${transportationCost}元)`">
                <span slot="title">&yen; {{Math.round(nextBid * (1 + poundageRate))}}元</span>
                <van-icon name="orders-o" slot="icon" style="line-height:24px;margin-right:5px;font-size:20px;" @click="viewQuote(1)"/>
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
        <div style="position:fixed;bottom:0px;width:100%;" v-show="status == 'ONSALE'">
            <div style="font-size:14px;background-color:white;width:100%;height:30px;line-height:30px;padding-left:10px;">成交 {{totalPrice}}(手续费{{poundageRate * 100}}%)</div>
            <van-row type="flex" style="border:1px solid #ebedf0;">
                <van-col span="3">
                    <van-button icon="arrow-down" style="width:100%" @click="down" />
                </van-col>
                <van-col span="11">
                    <van-field type="number" label-width="0px;" input-align="center" v-model="priceInput" />
                </van-col>
                <van-col span="3">
                    <van-button icon="arrow-up"  style="width:100%" @click="up" />
                </van-col>
                <van-col span="7">
                    <van-button type="danger" style="width:100%" @click="submit">出价</van-button>
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
        totalPrice(){
            return Math.round(this.priceInput * (1 + this.poundageRate));
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
            axios.get(`/auction/lot?filter=${encodeURIComponent(`id=${this.id}`)}`).then((response) => {
                var data = response.data.list[0];
                this.status = data.status;
                this.id = data.id;
                this.name = data.name;
                this.images = data.images;
                this.nextBid = data.nextBid;
                this.priceInput = data.nextBid;
                this.openTime = data.openTime;
                this.deadline = data.deadline;
                this.poundageRate = data.poundageRate;
                this.transportationCost = data.transportationCost;
                this.description = data.description;

                var endDate = this.status == 'PUBLISHED' ? this.openTime : this.deadline;

                setInterval(() => {
                    var data = calcRemainDate(new Date(), new Date(endDate));
                    this.days = data.days;
                    this.hours = data.hours;
                    this.minutes = data.minutes;
                    this.seconds = data.seconds;
                }, 1000);
            });
        },
        viewQuote(id){
            this.$router.push(`/quote/${id}`);
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
            selectedPayment: '',
            priceInput: 20,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            openTime: new Date(),
            deadline: new Date(),
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