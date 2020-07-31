<template>
    <div>
        <h1>订单列表</h1>
        <div style="margin-top:1rem;">
            <Table border :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" :to="`/order/order/${data[index].id}`">
                        查看
                    </Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
            </Table>
            <div style="margin-top:1rem;">
                <Page :total="totalCount" :pageSize="pageSize" show-total @on-change="changePage"/>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data () {
            return {
                columns: [
                    {
                        title: '序号',
                        key: 'num',
                        width: 80
                    },
                    {
                        title: '编号',
                        key: 'id',
                        width: '200'
                    },
                    {
                        title: '分类',
                        key: 'type'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '金额',
                        key: 'finalAmount'
                    },
                    {
                        title: '',
                        slot: 'action',
                        width: 180,
                        align: 'center'
                    }
                ],
                data: [],
                index: null,
                id: null,
                name: null,
                description: null,
                l1: null,
                l2: null,
                l3: null,
                pageSize: 20,
                totalCount: 0
            }
        },
        computed: {
            ...mapGetters({
                page: 'order/page'
            })
        },
        methods: {
            ...mapActions({
                storePage: 'order/storePage'
            }),
            changePage(pageIndex){
                this.storePage(pageIndex);
                this.reload();
            },
            remove (index) {
                var id = this.data[index].id;
                this.$Modal.confirm({
                    title: '删除确认',
                    content: '确定要删除该记录？',
                    onOk: () => {
                        axios.delete(`/order/order/${id}`).then(() => {
                            this.storePage(1);
                            this.reload();
                        });
                    }
                });
                
            },
            reload(){
                axios.get(`/order/order?page=${this.page}&pagesize=${this.pageSize}`).then((response) => {
                    var i = 0;
                    this.data = response.data.list.map((item) => {
                        i++;
                        return {
                            num: (this.page - 1) * this.pageSize + i,
                            id: item.id,
                            name: item.name,
                            status: item.status,
                            type: item.type,
                            finalAmount: item.finalAmount
                        }
                    });
                    this.totalCount = response.data.data.totalCount;
                });
            }
        },
        mounted() {
            this.storePage(1);
            this.reload();
        }
    }
</script>