import {Request, Response} from 'express';
import fs from "fs-extra";
import {uploadImage, uploadImageBase64} from "../utils/cloudinary";

export const publicRequest = async (req: Request, res: Response) => {
    res.send({message: "Public Request"})
}


export const protectedRequest = async (req: Request, res: Response) => {
    res.send({message: "Protected Request"})
}

export const uploadRequest = async (req: Request, res: Response) => {
    const image = req.files?.image
    let imageUploaded = null
    try {
        if (image) {
            if ("tempFilePath" in image) {
                imageUploaded = await uploadImage(image.tempFilePath)
                await fs.unlink(image.tempFilePath)
            }
        }


        res.send({message: "Upload Request Success Form Data", data: imageUploaded})
    }catch (e) {
        res.status(500).json(e)
    }

}

export async function uploadImageWithBase64 (req:Request, res:Response) {
    const { image } = req.body

    try{
        if(image){
             const imageUploaded = await  uploadImageBase64(image)


            res.send({message: "Upload Request Success Image Base 64", data: imageUploaded})
        }

    }catch (e) {
        res.status(500).json(e)
    }
}
