export const backgroundImageChangedHandler = (
    event:any, 
    ) => {
    let imageFile = event.target.files[0];
    if(['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'].includes(imageFile.type)){
        if(imageFile.size < 1024 * 1024 * 10){
            return imageFile
        }
        else{
            alert("10MB보다 큰 이미지는 올릴 수 없습니다.");
        }
    }else{
        alert("지원하지 않는 파일 형식입니다. 이미지를 올려주세요.");
    }
};

// encodeFileToBase64(imageFile, setImage);
// setBackground(imageFile);}

export const  encodeFileToBase64 = (fileBlob:any, setState : (e:string | ArrayBuffer | null)=>void) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
        reader.onload = () => {
            setState(reader.result)
            resolve(reader.result)
        };
    });
};