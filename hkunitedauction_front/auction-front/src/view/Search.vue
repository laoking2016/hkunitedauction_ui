<template>
    <div>
        <van-search placeholder="请输入搜索关键词" v-model="query" background="black" @search="search"/>
        <van-tabs>
            <van-tab title="竞买">
                <van-cell-group>
                    <van-cell v-for="(item, index) in auctionResult" :key="index" :title="catalogs[index]" :value="`${item}项`"  is-link :to="`/search/result/auction/${catalogs[index]}/${q}`"/>
                </van-cell-group>
            </van-tab>
            <van-tab title="商城">
                <van-cell-group>
                    <van-cell v-for="(item, index) in mallResult" :key="index" :title="catalogs[index]" :value="`${item}项`"  is-link :to="`/search/result/mall/${catalogs[index]}/${q}`"/>
                </van-cell-group>
            </van-tab>
        </van-tabs>
        
        <main-menu selectedItem="search" />
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
    mounted(){
        if(this.q != null){
            this.query = this.q
        }
    },
    methods: {
        ...mapActions({
            storeCatalogs: 'search/storeCatalogs',
            storeQ: 'search/storeQ',
            storeMallResult: 'search/storeMallResult',
            storeAuctionResult: 'search/storeAuctionResult'
        }),
        search(){
            var q = this.query;
            this.storeQ(q);

            axios.get(`/main-data/catalog`).then((response) => {
                this.storeCatalogs(
                    response.data.children.map((catalog) => {
                        return catalog.name
                    })
                )
                var searchMall = response.data.children.map((catalog) => {
                    return axios.get(`/mall/good/search/count?q=${q}&catalog=${catalog.name}`)
                })
                var searchAuction = response.data.children.map((catalog) => {
                    return axios.get(`/auction/lot/search/count?q=${q}&catalog=${catalog.name}`)
                })
                Promise.all(searchMall).then((results) => {
                    this.storeMallResult(
                        results.map((result) => {
                            return result.data
                        })
                    )
                })
                Promise.all(searchAuction).then((results) => {
                    this.storeAuctionResult(
                        results.map((result) => {
                            return result.data
                        })
                    )
                })
            })
        }
    },
    computed: {
        ...mapGetters({
            catalogs: 'search/catalogs',
            q: 'search/q',
            mallResult: 'search/mallResult',
            auctionResult: 'search/auctionResult'
        })
    },
    data(){
        return {
            query: null
        }
    }
}
</script>
<style scoped>
</style>