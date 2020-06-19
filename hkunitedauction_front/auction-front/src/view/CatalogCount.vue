<template>
    <div>
        <van-nav-bar fixed id="nav-bar" left-arrow :border="false" @click-left="$router.back(-1)" >
            <span style="color:white" slot="title">{{name}}</span>
        </van-nav-bar>
        <div style="margin-top:46px;">
            <van-cell-group>
                <van-cell title="竞买" :value="`${auctionCount}项`" is-link :to="`/catalog/result/auction/${this.l1}/${this.l2}/${this.l3}`"/>
                <van-cell title="商城" :value="`${mallCount}项`" is-link :to="`/catalog/result/mall/${this.l1}/${this.l2}/${this.l3}`"/>
            </van-cell-group>
        </div>
        <main-menu selectedItem="catalog" />
    </div>
</template>
<script>
import axios from 'axios'

export default {
    mounted(){
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
        Promise.all([
            axios.get(`/mall/good/count?filter=${encodeURIComponent(filter)}`), 
            axios.get(`/auction/lot/count?filter=${encodeURIComponent(filter)}`)
            ]).then((results) => {
                this.mallCount = results[0].data;
                this.auctionCount = results[1].data;
        })
    },
    data(){
        return {
            l1: null,
            l2: null,
            l3: null,
            name: null,
            auctionCount: 0,
            mallCount: 0
        }
    }
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>