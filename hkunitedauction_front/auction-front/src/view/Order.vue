<template>
    <div>
        <van-nav-bar left-arrow id="nav-bar" :border="false" @click-left="$router.back(-1)">
            <div style="color:white" slot="title">待支付</div>
        </van-nav-bar>
        <van-list>
            <div style="background-color:white;padding:0.5rem;margin-top:0.5rem;" v-for="(item, index) in data" :key="index">
                <div>
                    <div style="display:flex;justify-content:space-between;">
                        <span>{{item.title}}</span>
                        <van-icon name="delete" />
                    </div>
                    <van-row style="margin-top:0.5rem;" @click="viewDetail(item.id)">
                        <van-col span="20" style="display:flex;overflow-x: auto;">
                            <van-image style="flex:none;" fit="cover" :key="subIndex" v-for="(thumb, subIndex) in item.thumbs" width="100" height="100" :src="thumb" />
                        </van-col>
                        <van-col span="4" style="display:flex;align-items:center;height:100px;padding:0.5rem;">
                            <div>
                                <div>{{item.price}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </div>                
            </div>
        </van-list>
    </div>    
</template>
<script>

import axios from 'axios';
import { featuredImage } from '../util/image'

export default {
    methods: {
        featuredImage,
        viewDetail(id){
            this.$router.push(`/order/detail/${id}`);
        },
        reload(){
            axios.get(`/order/order`).then((response) => {
                this.data = response.data.list.map((item) => {
                    var thumbs = item.detail.map((subItem) => {
                        console.log(subItem)
                        return this.featuredImage(subItem.images)
                    })
                    var title = '香港联合拍卖';
                    if(item.detail.length > 0){
                        title = item.detail[0].name
                    }
                    return {
                        id: item.id,
                        num: item.quantity,
                        price: item.finalAmount,
                        desc: null,
                        title: title,
                        thumbs: thumbs
                    }
                })
            })
        }
    },
    mounted(){
        this.reload();
    },
    data(){
        return {
            data: []
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