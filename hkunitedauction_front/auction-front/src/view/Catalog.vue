<template>
    <div>
        <van-nav-bar fixed id="nav-bar" :border="false">
            <span style="color:white" slot="title">分类</span>
        </van-nav-bar>
        <van-row style="margin-top:46px;">
            <van-col span="6">
                <van-sidebar v-model="activeKey">
                    <van-sidebar-item :title="item.name" v-for="(item, index) in this.data" :key="index" />
                </van-sidebar>
            </van-col>
            <van-col span="18">
                <router-link style="color:black;" :to="`/catalog/count/${name}/-1/-1`"><h2>{{`${name} >`}}</h2></router-link>
                <div v-for="(item, index) in children" :key="index">
                    <router-link style="color:black;" :to="`/catalog/count/${name}/${item.name}/-1`"><h3>{{`${item.name} >`}}</h3></router-link>
                    <van-row>
                        <van-col span="12" v-for="(subItem, subIndex) in item.children" :key="subIndex">
                            <router-link style="color:black;" :to="`/catalog/count/${name}/${item.name}/${subItem.name}`"><div style="height:3rem;display:flex;justify-content:center;align-items:center;border:1px solid gray;margin:0.3rem;">{{subItem.name}}</div></router-link>
                        </van-col>
                    </van-row>
                </div>
            </van-col>
        </van-row>
        
        <main-menu selectedItem="catalog" />
    </div>
</template>
<script>
import axios from 'axios'

export default {
    computed: {
        name(){
            return this.data[this.activeKey].name
        },
        children(){
            return this.data[this.activeKey].children
        }
    },
    methods: {
        reload(){
            axios.get(`/main-data/catalog`).then((response) => {
                this.data = response.data.children
            })
        }
    },
    mounted(){
        this.reload()
    },
    data() {
        return {
            activeKey: 0,
            data: []
        }
    }
}
</script>
<style scoped>
#nav-bar{
    background-color:black;
}
</style>