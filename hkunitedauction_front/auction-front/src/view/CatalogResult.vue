<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" >
            <span style="color:white" slot="title">{{name}}</span>
        </van-nav-bar>
        <van-list style="margin-top:46px;">
            <router-link :to="formatLink(item)" :key="index" v-for="(item, index) in data">
                <van-card
                    :num="item.num"
                    :price="item.price"
                    :desc="item.desc"
                    :title="item.title"
                    :thumb="item.thumb">
                </van-card>
            </router-link>
        </van-list>
    </div>
</template>
<script>
import { featuredImage } from '../util/image'
import axios from 'axios'

export default {
    methods: {
        formatLink(item){
            if(item.type == "mall"){
                return `/good/${item.id}`
            }
            return `/lot/${item.id}`
        },
        reload(){
            this.type = this.$route.params.type
            this.l1 = this.$route.params.l1
            this.l2 = this.$route.params.l2
            this.l3 = this.$route.params.l3
            this.name = this.l1
            var filter = "";
            if(this.l3 != -1){
                this.name = this.l3
                filter += `l3=${this.l3}`
            }
            if(this.l2 != -1){
                this.name = this.l2
                filter += `l2=${this.l2}`
            }
            if(this.l1 != null){
                filter += `l1=${this.l1}`
            }
            filter += '&status=20';
            var proxy = null;
            switch(this.type){
                case 'mall':
                    proxy = axios.get(`/mall/good?filter=${encodeURIComponent(filter)}`)
                    break;
                case 'auction':
                    proxy = axios.get(`/auction/lot?filter=${encodeURIComponent(filter)}`)
                    break;
            }
            proxy.then((response) => {
                this.data = response.data.list.map((item) => {
                    return {
                        id: item.id,
                        price: item.finalPrice,
                        desc: item.description,
                        title: item.name,
                        thumb: featuredImage(item.images),
                        type: this.type
                    }
                })
            })
        }
    },
    mounted(){
        this.reload()
    },
    data(){
        return {
            type: null,
            l1: null,
            l2: null,
            l3: null,
            name: null,
            data: []
        }
    }
}
</script>
<style>
#nav-bar{
    background-color:black;
}
</style>