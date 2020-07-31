<template>
    <div>
        <Form label-position="left" :label-width="100">
            <h3>订单信息</h3>
            <FormItem label="类别">
                <Input v-model="type" disabled />
            </FormItem>
            <FormItem label="状态">
                <Input v-model="status" disabled />
            </FormItem>
            <FormItem label="会员名">
                <Input v-model="name" disabled />
            </FormItem>
            <FormItem label="联系方式">
                <Input v-model="contact" disabled />
            </FormItem>
            <FormItem label="微信">
                <Input v-model="wechat" disabled />
            </FormItem>
            <FormItem label="订单日期">
                <DatePicker disabled v-model="orderDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem label="原价">
                <InputNumber disabled style="width:100%"
                    :max="1000000"
                    v-model="initAmount"
                    :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <FormItem label="折后价">
                <InputNumber disabled style="width:100%"
                    :max="1000000"
                    v-model="finalAmount"
                    :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <Divider />
            <h3>订单详细</h3>
            <div style="margin-top:1rem;">
                <Table border :columns="columns" :data="data" />
            </div>
            <FormItem style="margin-top:1rem;">
                <Button style="margin-right:5px;" to="/order/order">返回订单列表</Button>
                <Button type="primary" style="margin-right:5px;" @click="ship" :disabled="status != 'PAYED'">发货</Button>
                <Button type="primary" @click="close" :disabled="status == 'CLOSED'">关闭订单</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { stringfy } from '../../util/querystring'
import { mapGetters, mapActions } from 'vuex'
import { toImageUrl } from '../../util/image'
import axios from 'axios'

export default {
    computed: {
    },
    methods: {
        reload(){
            axios.get(`/order/order?filter=${encodeURIComponent(`id=${this.id}`)}`).then((response) => {
                var data = response.data.list[0];

                this.id = data.id;
                this.type = data.type;
                this.status = data.status;
                this.name = data.name;
                this.contact = data.contact;
                this.wechat = data.wechat;
                this.orderDate = data.orderDate == null ? null : new Date(data.orderDate);
                this.initAmount = data.initAmount;
                this.finalAmount = data.finalAmount;

                this.data = data.detail.map((item, index) => {
                    return {
                        num: index + 1,
                        name: item.name,
                        initPrice: item.initPrice,
                        quantity: item.quantity,
                        discount: item.discount,
                        finalPrice: item.finalPrice,
                        images: null
                    }
                });


            });
        },
        ship(){
            axios.post(`/order/order/${this.id}/ship?shipNo=${this.shipNo}`).then((response) => {
                this.reload();
            })
        },
        close(){
            axios.post(`/order/order/${this.id}/close`).then((response) => {
                this.reload();
            })
        },
    },
    data(){
        return {
            id: null,
            name: null,
            type: null,
            status: null,
            name: null,
            contact: null,
            wechat: null,
            orderDate: null,
            initAmount: null,
            finalAmount: null,
            detail: [],
            page: 1,
            pageSize: 16,
            totalCount: 0,
            shipNo: null,
            data: [],
            columns: [
                {
                    title: '序号',
                    key: 'num',
                    width: 80
                },
                {
                    title: '商品',
                    key: 'name'
                },
                {
                    title: '原价',
                    key: 'initPrice'
                },
                {
                    title: '数量',
                    key: 'quantity'
                },
                {
                    title: '折扣',
                    key: 'discount'
                },
                {
                    title: '折后价',
                    key: 'finalPrice'
                }
            ]
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        this.reload();
    }
}
</script>
<style scoped>
.ivu-cascader-menu{
    min-width: 200px !important;
}
h3{
    margin-bottom: 15px;
}
</style>