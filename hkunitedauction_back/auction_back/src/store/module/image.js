const state = {
    images: [],
    selectedImages: []
}

const getters = {
    images: (state, getters) => {
        return state.images
    },
    selectedImages: (state, getters) => {
        return state.selectedImages
    }
}

const actions = {
    storeImages({commit, state}, images){
        commit('storeImages', images)
    },
    storeSelectedImages({commit, state}, selectedImages){
        commit('storeSelectedImages', selectedImages)
    },
    addImage({commit, state}, index){
        commit('addImage', index)
    },
    removeImage({commit, state}, index){
        commit('removeImage', index)
    }
}

const mutations = {
    storeImages(state, images){
        state.images = images
    },
    storeSelectedImages(state, selectedImages){
        state.selectedImages = selectedImages
    },
    addImage(state, index){
        var id = state.images[index].id;
        if(state.selectedImages == null){
            state.selectedImages = [];
        }
        if(state.selectedImages.filter(e => e.id == id).length > 0){
            return;
        }
        state.selectedImages.push(state.images[index])
    },
    removeImage(state, index){
        state.selectedImages.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}