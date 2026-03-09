import cloudinary from "./cloudinary.js";

const subirImagenCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.unsigned_upload_stream({ folder: 'menu'}, (error, result)=>{
            if(result){
                resolve(result)
            }else{
                reject(error)
            }
        })
        stream.end(buffer)
    })
};

export default subirImagenCloudinary;