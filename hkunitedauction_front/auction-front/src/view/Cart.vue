<template>
    <div>
        <van-nav-bar left-arrow id="nav-bar" :border="false" @click-left="$router.back(-1)">
            <div style="color:white" slot="title">购物车</div>
            <div style="color:white" slot="right" @click="edit">{{editFlag ? '完成' : '编辑'}}</div>
        </van-nav-bar>
        <van-list>
            <van-row v-for="(item, index) in data" :key="index">
                <van-col span="2" class="cart-item-check-containter">
                    <van-checkbox v-model="item.checked" checked-color="#07c160"></van-checkbox>
                </van-col>
                <van-col span="22">
                    <van-card
                        :price="item.price"
                        :desc="item.desc"
                        :title="item.title"
                        :thumb="item.thumb">
                        <template #num>
                            <van-stepper v-model="item.num" min="1" :name="item.goodId" disable-input @change="change"/>
                        </template>
                    </van-card>
                </van-col>
            </van-row>
        </van-list>

        <van-submit-bar :price="total" :button-text="editFlag ? '删除' : '去结算'" @submit="submit">
            <van-checkbox v-model="checkAllFlag" @change="changeAll" checked-color="#07c160">全选</van-checkbox>
        </van-submit-bar>
    </div>    
</template>
<script>
import axios from 'axios'
import { featuredImage } from '../util/image'

export default {
    mounted(){
        this.load();
    },
    computed: {
        total(){
            var total = 0;
            this.data.filter(e => e.checked).map((item) => {
                total += item.price * item.num;
            });
            return total * 100;
        }
    },
    methods: {
        load(){
            axios.get(`/mall/cart`).then((response) => {
                if(response.data.items != null && Object.keys(response.data.items).length > 0){
                    var filter = "";
                    var cartMap = response.data.items;

                    Object.keys(cartMap).map((key) => {
                        if(filter == ""){
                            filter += `id=${key}`;
                        }else{
                            filter += `&id=${key}`;
                        }
                    });

                    axios.get(`/mall/good?filter=${encodeURIComponent(filter)}`).then((response) => {
                        this.data = response.data.list.map((item) => {
                            return {
                                goodId: item.id,
                                checked: false,
                                price: item.finalPrice,
                                desc: item.description,
                                title: item.name,
                                thumb: featuredImage(item.images),
                                num: cartMap[item.id]
                            }
                        });
                    });
                }else{
                    this.data = [];
                }
            }); 
        },
        edit(){
            this.editFlag = !this.editFlag;
        },
        change(value, detail){
            axios.put(`/mall/cart?goodId=${detail.name}&quantity=${value}`);
        },
        changeAll(checked){
            this.data.map((item) => {
                item.checked = checked
            })
        },
        submit(){
            var list = this.data.filter(e => e.checked);
            if(list.length == 0){
                this.$toast("您没有选择商品哟");
                return;
            }
            
            var filter = "";
            var detail = list.map((item) => {
                if(filter == ""){
                    filter += `ids=${item.goodId}`;
                }else{
                    filter += `&ids=${item.goodId}`;
                }
                return {
                    contextId: item.goodId,
                    quantity: item.num
                }
            })
            
            if(this.editFlag){
                axios.delete(`/mall/cart?${filter}`).then((response) => {
                    this.load();
                    this.editFlag = false;
                })
            }else{
                axios.post(`/order/order`, {
                    type: 'MALL', 
                    detail: detail
                }).then((response) => {
                    axios.delete(`/mall/cart?${filter}`).then((response) => {
                        this.load();
                        this.editFlag = false;
                        this.$router.push(`/order/detail/${response.data}`);
                    })
                })
            }
        }
    },
    data(){
        return {
            checkAllFlag: false,
            editFlag: false,
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
.cart-item-check-containter{
    display: flex;
    align-items: center;
    height: 5.5rem;
    justify-content: center;
}
</style>