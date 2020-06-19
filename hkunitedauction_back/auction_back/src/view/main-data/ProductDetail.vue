<template>
    <div>
        <Form label-position="left" :label-width="100">
            <h3>{{id == -1 ? '创建产品' : '修改产品'}}</h3>
            <FormItem label="名称">
                <Input v-model="name" />
            </FormItem>
            <FormItem label="描述">
                <Input v-model="description" />
            </FormItem>
            <FormItem label="类目">
                <Cascader v-model="catalog" :data="catalogData" />
            </FormItem>
            <Divider />
            <h3>图片</h3>
            <ImageSelector />
            <FormItem>
                <Button style="margin-right:5px;" to="/main-data/product">返回产品列表</Button>
                <Button type="primary" @click="save">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex'

export default {
    mounted(){
        this.id = this.$route.params.id;
        if(this.id == -1){
            this.storeSelectedImages([]);
        }else{
            this.reload();
        }
        this.reloadCatalog();
    },
    data(){
        return {
            id: null,
            name: null,
            description: null,
            catalog: [],
            catalogData: []
        }
    },
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
        reload(){
            this.id = this.$route.params.id;
            axios.get(`/main-data/product?id=${this.id}`).then((response) => {
                var data = response.data.list[0];

                this.id = data.id;
                this.name = data.name;
                this.description = data.description;
                this.catalog = [data.l1, data.l2, data.l3];
                this.storeSelectedImages(data.images);
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
                l3: this.l3
            };
            if(this.id == -1){
                axios.post('/main-data/product', saveData).then((response) => {
                    this.id = response.data.data;
                    this.$Message.success('保存成功');
                });
            }else{
                axios.put(`/main-data/product/${this.id}`, saveData).then((response) => {
                    this.$Message.success('保存成功');
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
    }
}
</script>
<style scoped>
h3{
    margin-bottom: 15px;
}
</style>