<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" >
            <span style="color:white" slot="title">{{$route.params.catalog}}</span>
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
import { formatLink } from '../util/format'
import { featuredImage } from '../util/image'
import axios from 'axios'

export default {
    mounted(){
        this.reload()
    },
    methods: {
        formatLink,
        reload(){
            var catalog = this.$route.params.catalog
            var q = this.$route.params.q
            var type = this.$route.params.type;

            var proxy = null;
            switch(type){
                case 'mall':
                    proxy = axios.get(`/mall/good/search?q=${q}&catalog=${catalog}`)
                    break;
                case 'auction':
                    proxy = axios.get(`/auction/lot/search?q=${q}&catalog=${catalog}`)
                    break;
            }
            proxy.then((response) => {
                this.data = response.data.list.map((item) => {
                    return {
                        id: item.id,
                        price: item.finalPrice,
                        desc: item.description,
                        title: item.name,
                        thumb: featuredImage(item.images)
                    }
                })
            })
        }
    },
    data(){
        return {
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