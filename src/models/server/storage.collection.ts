import { Permission } from "appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";


export default async function getOrCreateStorageBucket() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage connected")
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users")
            ], false, undefined, undefined, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'])
            console.log("Storage created")
        } catch (error) {
            console.log("Error creating storage", error)
        }
    }
}