<template>
    <div>
        <Form label-position="left" :label-width="100">
            <h3>产品</h3>
            <FormItem label="名称">
                <Input v-model="name" :disabled="status != 'DRAFT'">
                    <Button slot="append" icon="ios-search" :disabled="status != 'DRAFT'" @click="openSearch"></Button>
                </Input>
            </FormItem>
            <FormItem label="描述">
                <Input v-model="description" :disabled="status != 'DRAFT'" />
            </FormItem>
            <FormItem label="状态">
                <Input v-model="status" disabled/>
            </FormItem>
            <FormItem label="类目">
                <Cascader v-model="catalog" :data="catalogData" :disabled="status != 'DRAFT'" />
            </FormItem>
            <Divider />
            <h3>图片</h3>
            <ImageSelector :readonly="status != 'DRAFT'" />
            <Divider />
            <h3>商品信息</h3>
            <FormItem label="原价">
                <InputNumber :disabled="status != 'DRAFT'" style="width:100%"
                    :max="1000000"
                    v-model="initPrice"
                    :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <FormItem label="折扣">
                <InputNumber :disabled="status != 'DRAFT'" style="width:100%"
                    :max="1000000"
                    v-model="discount"
                    :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <FormItem label="折后价">
                <InputNumber disabled style="width:100%"
                    :max="1000000"
                    v-model="finalPrice"
                    :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <FormItem label="管理费率">
                <InputNumber :disabled="status != 'DRAFT'" style="width:100%"
                    :max="1000000"
                    v-model="poundageRate"
                    :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <FormItem label="运费">
                <InputNumber :disabled="status != 'DRAFT'" style="width:100%"
                    :max="1000000"
                    v-model="transportationCost"
                    :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                    :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
            </FormItem>
            <FormItem>
                <CheckboxGroup v-model="payments">
                    <Checkbox label="微信"></Checkbox>
                    <Checkbox label="支付宝"></Checkbox>
                    <Checkbox label="店取"></Checkbox>
                    <Checkbox label="内地银行转账"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="数量">
                <Input disabled v-model="quantity" />
            </FormItem>
             <Divider />
                    <h3>卖方信息</h3>
                    <FormItem label="名称">
                        <Input v-model="supplierName" :disabled="status != 'DRAFT'"/>
                    </FormItem>
                    <FormItem label="联系方式">
                        <Input v-model="supplierContact" :disabled="status != 'DRAFT'"/>
                    </FormItem>
                    <FormItem label="微信">
                        <Input v-model="supplierWechat" :disabled="status != 'DRAFT'"/>
                    </FormItem>
            <FormItem>
                <Button style="margin-right:5px;" to="/mall/good">返回商品列表</Button>
                <Button type="primary" @click="save" :disabled="status != 'DRAFT'">保存</Button>
            </FormItem>
        </Form>
        <Modal title="选择产品" v-model="visible" width="50%">
            <div><Input search placeholder="产品名称" v-model="searchText" @on-search="search" /></div>
            <div style="margin-top:1rem;">
                <Table border :columns="prdCols" :data="prdData">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" @click="chooseProduct(index)">选择</Button>
                    </template>
                </Table>
                <div style="margin-top:1rem;">
                    <Page :total="prdTotalCount" :pageSize="prdPageSize" show-total @on-change="changePrdPage"/>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { stringfy } from '../../util/querystring'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    computed: {
        ...mapGetters({
            images: 'image/images',
            selectedImages: 'image/selectedImages'
        }),
        l1(){
            return this.catalog.length > 0 ? this.catalog[0] : null;
        },
        l2(){
            return this.catalog.length > 1 ? this.catalog[1] : null;
        },
        l3(){
            return this.catalog.length > 2 ? this.catalog[2] : null;
        },
        finalPrice(){
            return this.initPrice * this.discount;
        }
    },
    methods: {
        ...mapActions({
            storeSelectedImages: 'image/storeSelectedImages'
        }),
        chooseProduct(index){
            var prd = this.prdData[index];
            this.name = prd.name;
            this.description = prd.description;
            this.storeSelectedImages(prd.images);
            this.catalog = [prd.l1, prd.l2, prd.l3];
            this.visible = false;
        },
        changePrdPage(pageIndex){
            this.prdPage = pageIndex;
            this.reloadProduct();
        },
        reloadProduct(){
            var searchData = {
                page: this.prdPage,
                pagesize: this.prdPageSize,
                order: 'asc',
                sortby: 'name'
            };
            if(this.searchText != null && this.searchText != ""){
                searchData.name = this.searchText;
            }
            axios.get(`/main-data/product?${stringfy(searchData)}`).then((response) => {
                var i = 0;
                this.prdData = response.data.list.map((item) => {
                    i++;
                    return {
                        num: (this.prdPage - 1) * this.prdPageSize + i,
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        l1: item.l1,
                        l2: item.l2,
                        l3: item.l3,
                        images: item.images
                    }
                });
                this.prdTotalCount = response.data.totalCount;
            });
        },
        openSearch(){
            this.visible = true;
        },
        search(){
            this.prdPage = 1;
            this.reloadProduct();
        },
        reload(){
            axios.get(`/mall/good?id=${this.id}`).then((response) => {
                var data = response.data.list[0];

                this.id = data.id;
                this.name = data.name;
                this.description = data.description;
                this.storeSelectedImages(data.images);
                this.catalog = [data.l1, data.l2, data.l3];
                this.initPrice = data.initPrice;
                this.status = data.status;
                this.quantity = data.quantity;
                this.discount = data.discount;
                this.transportationCost = data.transportationCost;
                this.payments = data.payments;
                this.poundageRate = data.poundageRate;
                this.supplierName = data.supplierName;
                this.supplierContact = data.supplierContact;
                this.supplierWechat = data.supplierWechat;
            });
        },
        save(){
            var saveData = {
                id: this.id,
                name: this.name,
                description: this.description,
                images: this.selectedImages,
                l1: this.l1,
                l2: this.l2,
                l3: this.l3,
                initPrice: this.initPrice,
                discount: this.discount,
                finalPrice: this.finalPrice,
                quantity: this.quantity,
                payments: this.payments,
                transportationCost: this.transportationCost,
                poundageRate: this.poundageRate,
                supplierName: this.supplierName,
                supplierContact: this.supplierContact,
                supplierWechat: this.supplierWechat,
            };
            if(this.id == -1){
                axios.post('/mall/good', saveData).then((response) => {
                    this.id = response.data;
                    this.$Message.success('保存成功');
                });
            }else{
                axios.put(`/mall/good/${this.id}`, saveData).then((response) => {
                    if(response.data == ""){
                        this.$Message.success('保存成功');
                    }else{
                        this.$Message.error(response.data.message);
                    }
                });
            }
        },
        reloadCatalog(){
            axios.get('/main-data/catalog').then((response) => {
                this.catalogData = 
                    response.data.children == null ? [] :
                        response.data.children.map((item) => {
                            return {
                                value: item.name,
                                label: item.name,
                                children: item.children == null ? [] : 
                                    item.children.map((subItem) => {
                                        return {
                                            value: subItem.name,
                                            label: subItem.name,
                                            children: subItem.children == null ? [] : 
                                                subItem.children.map((ssubItem) => {
                                                    return {
                                                        value: ssubItem.name,
                                                        label: ssubItem.name
                                                    }
                                                })
                                        }
                                    })
                            }
                        });
            });
        }
    },
    data(){
        return {
            id: null,
            name: null,
            description: null,
            supplierName: null,
            supplierContact: null,
            supplierWechat: null,
            status: null,
            initPrice: 0,
            quantity: 1,
            discount: 1,
            page: 1,
            pageSize: 16,
            totalCount: 0,
            catalog: [],
            catalogData: [],
            visible: false,
            searchText: null,
            prdCols: [
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
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'description'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 90,
                    align: 'center'
                }
            ],
            prdData: [],
            prdPage: 1,
            prdPageSize: 10,
            prdTotalCount: 0
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        if(this.id == -1){
            this.status = 'DRAFT';
            this.storeSelectedImages([]);
        }else{
            this.reload();
        }
        this.reloadCatalog();
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