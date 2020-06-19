import { FILE_BASEURL } from './const'

export function featuredImage(images){
    if(images == null){
        return null;
    }
    var image = null;
    if(images.length > 0){
        image = images[0];
    }
    
    return toImageUrl(image.vpath, image.name);
}

export function toImageUrl(vpath, name){
    return `${FILE_BASEURL}/upload_dir/${vpath}/${name}`;
}