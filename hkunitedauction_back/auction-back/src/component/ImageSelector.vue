<template>
    <div>
        <h4>已选图片</h4>
        <Row style="min-height:181px;">
            <Col span="3" v-for="(item, index) in selectedImages" :key="index">
                <Card style="100%;margin:5px;">
                    <div style="text-align:center">
                        <div class="img-item" :style="{backgroundImage: `url(${toImageUrl(item.iconVpath, item.iconName)})`}"></div>
                        <div style="margin-top:5px;">
                            <Button type="primary" style="margin-right:5px;" @click="previewSelectedImage(index)">预览</Button>
                            <Button @click="remove(index)" :disabled="readonly">移除</Button>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        <h4 v-show="!readonly">可选图片</h4>
        <Row class="section-content" v-show="!readonly">
            <Col span="3" v-for="(item, index) in images" :key="index">
                <Card style="100%;margin:5px;">
                    <div style="text-align:center">
                        <div class="img-item" :style="{backgroundImage: `url(${toImageUrl(item.iconVpath, item.iconName)})`}"></div>
                        <div style="margin-top:5px;">
                            <Button type="primary" style="margin-right:5px;" @click="previewImage(index)">预览</Button>
                            <Button @click="choose(index)">选择</Button>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
        <div v-show="!readonly">
            <Page :total="totalCount" :pageSize="pageSize" show-total @on-change="changePage"/>
        </div>
        <Row style="margin-top:15px;" v-show="!readonly">
            <Col>
                <Upload name="file" ref="upload"
                    :action="`${API_BASEURL}/main-data/image`" :on-success="uploadFinish">
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                </Upload>
            </Col>
        </Row>
        <Modal title="预览" v-model="visible">
            <img :src="this.toImageUrl(previewVpath, previewName)" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { toImageUrl } from '../util/image'
import { API_BASEURL } from '../util/const'
import axios from 'axios'

export default {
    name: 'ImageSelector',
    props: ['readonly'],
    computed: {
        ...mapGetters({
            images: 'image/images',
            selectedImages: 'image/selectedImages'
        })
    },
    methods: {
        ...mapActions({
            addImage: 'image/addImage',
            removeImage: 'image/removeImage',
            storeImages: 'image/storeImages'
        }),
        toImageUrl: toImageUrl,
        reloadImages(){
            axios.get(`/main-data/image?page=${this.page}&pagesize=${this.pageSize}&sort=${encodeURIComponent('createdTime=desc')}`).then((response) => {
                var list = response.data.list.map((item) => {
                    return {
                        id: item.id,
                        vpath: item.vpath,
                        name: item.name,
                        iconVpath: item.iconVpath,
                        iconName: item.iconName,
                        url: item.url,
                        iconUrl: item.iconUrl
                    }
                });
                this.storeImages(list);
                this.totalCount = response.data.totalCount;
            });
        },
        changePage(pageIndex) {
            this.page = pageIndex;
            this.reloadImages();
        },
        previewSelectedImage(index) {
            this.previewVpath = this.selectedImages[index].vpath;
            this.previewName = this.selectedImages[index].name;
            this.visible = true;
        },
        previewImage(index){
            this.previewVpath = this.images[index].vpath;
            this.previewName = this.images[index].name;
            this.visible = true;
        },
        choose(index){
            this.addImage(index);
        },
        remove(index) {
            this.removeImage(index);
        },
        uploadFinish(res, file) {
            this.page = 1;
            this.reloadImages();
            this.$refs.upload.clearFiles();
        }
    },
    data(){
        return {
            page: 1,
            pageSize: 16,
            totalCount: 0,
            visible: false,
            previewVpath: null,
            previewName: null,
            API_BASEURL: API_BASEURL
        }
    },
    mounted() {
        this.reloadImages();
    }
}
</script>
<style scoped>
.img-item{
    width: 100%;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 100% auto;
}
.section-content{
    min-height: 181px;
}
</style>