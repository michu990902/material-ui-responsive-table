export const splitData = (arr, splitSize) => {
    let ss = splitSize+1;
    let tmp = [];
    for(let i = 0; i < arr.length; i++) {
        if(ss > 1){
            let pos = tmp.length-1;
            if (pos < 0) pos = 0;
            tmp[pos] = [...(tmp[pos]||[]), arr[i]];
            ss--;
        }else{
            tmp.push([arr[i]])
            ss = splitSize;
        }
    }
    return tmp;
};