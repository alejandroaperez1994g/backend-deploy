import {Request, Response} from 'express';
import fs from "fs-extra";
import {uploadImage} from "../utils/cloudinary";

export const publicRequest = async (req: Request, res: Response) => {
    res.send({message: "Public Request"})
}


export const protectedRequest = async (req: Request, res: Response) => {
    res.send({message: "Protected Request"})
}

export const uploadRequest = async (req: Request, res: Response) => {
    const image = req.files?.image
    let imageUploaded = null

    if (image) {
        if ("tempFilePath" in image) {
            imageUploaded = await uploadImage(image.tempFilePath)
            await fs.unlink(image.tempFilePath)
        }
    }


    res.send({message: "Upload Request Success", data: imageUploaded})
}
