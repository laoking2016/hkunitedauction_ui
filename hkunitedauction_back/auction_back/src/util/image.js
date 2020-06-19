import { FILE_BASEURL } from './const'

export function toImageUrl(vpath, name){
    return `${FILE_BASEURL}/upload_dir/${vpath}/${name}`;
}