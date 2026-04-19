import cloudinary from "./cloudinary.js";

const subirImagenCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { 
                folder: 'menu',
                resource_type: 'auto'
            }, 
            (error, result) => {
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        
        stream.on('error', (err) => reject(err));
        stream.end(buffer);
    });
};

export default subirImagenCloudinary;