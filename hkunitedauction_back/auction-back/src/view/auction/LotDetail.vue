<template>
    <Tabs value="name1">
        <TabPane label="拍品信息" name="name1">
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
                    <h3>竞买信息</h3>
                    <FormItem label="中标价">
                        <InputNumber disabled style="width:100%"
                            :max="1000000"
                            v-model="finalPrice"
                            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                            :parser="value => value.replace(/\$\s?|(,*)/g, '')"></InputNumber>
                    </FormItem>
                    <FormItem label="底价">
                        <InputNumber :disabled="status != 'DRAFT'" style="width:100%"
                            :max="1000000"
                            v-model="initPrice"
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
                    <FormItem label="开始时间">
                        <DatePicker :disabled="status != 'DRAFT'" v-model="openTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="结束时间">
                        <DatePicker :disabled="status != 'DRAFT'" v-model="deadline" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="中标人">
                        <Input disabled v-model="winnerName" />
                    </FormItem>
                    <FormItem label="联系方式">
                        <Input disabled v-model="winnerContact" />
                    </FormItem>
                    <FormItem label="微信">
                        <Input disabled v-model="winnerWechat"/>
                    </FormItem>
                    <FormItem label="地址">
                        <Input disabled v-model="winnerAddress"/>
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
                        <Button style="margin-right:5px;" to="/auction/lot">返回拍品列表</Button>
                        <Button type="primary" @click="save" :disabled="status != 'DRAFT'">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </TabPane>
        <TabPane label="出价记录" name="name2">

        </TabPane>
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
    </Tabs>
    
    
</template>
<script>
import { stringfy } from '../../util/querystring'
import { mapGetters, mapActions } from 'vuex'
import { toImageUrl } from '../../util/image'
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
                this.prdTotalCount = response.data.data.totalCount;
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
            axios.get(`/auction/lot?filter=${encodeURIComponent(`id=${this.id}`)}`).then((response) => {
                var data = response.data.list[0];

                this.id = data.id;
                this.name = data.name;
                this.description = data.description;
                this.storeSelectedImages(data.images);
                this.catalog = [data.l1, data.l2, data.l3];
                this.supplierName = data.supplierName;
                this.supplierContact = data.supplierContact;
                this.supplierWechat = data.supplierWechat;
                this.initPrice = data.initPrice;
                this.finalPrice = data.finalPrice;
                this.payments = data.payments;
                this.openTime = data.openTime == null ? null : new Date(data.openTime);
                this.deadline = data.deadline == null ? null :new Date(data.deadline);
                this.status = data.status;
                this.transportationCost = data.transportationCost;
                this.poundageRate = data.poundageRate;
                this.winnerName = data.winnerName;
                this.winnerContact = data.winnerContact;
                this.winnerWechat = data.winnerWechat;
                this.winnerAddress = data.winnerAddress;
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
                supplierName: this.supplierName,
                supplierContact: this.supplierContact,
                supplierWechat: this.supplierWechat,
                payments: this.payments,
                initPrice: this.initPrice,
                transportationCost: this.transportationCost,
                poundageRate: this.poundageRate,
                openTime: this.openTime,
                deadline: this.deadline
            };
            if(this.id == -1){
                axios.post('/auction/lot', saveData).then((response) => {
                    if(response.data.status == 0){
                        this.id = response.data.data;
                        this.$Message.success('保存成功');
                    }else{
                        this.$Message.error(response.data.des);
                    }
                });
            }else{
                axios.put(`/auction/lot/${this.id}`, saveData).then((response) => {
                    if(response.data.status == 0){
                        this.$Message.success('保存成功');
                    }else{
                        this.$Message.error(response.data.des);
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
            status: null,
            supplierName: null,
            supplierContact: null,
            supplierWechat: null,
            winnerName: null,
            winnerContact: null,
            winnerWechat: null,
            winnerAddress: null,
            payments: [],
            finalPrice: 0,
            initPrice: 0,
            transportationCost: 5,
            poundageRate: 0.1,
            openTime: null,
            deadline: null,
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