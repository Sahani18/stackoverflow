import { Permission } from "appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";


export default async function createQuestionCollection() {

    const response = await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read('any'),
        Permission.write("users"),
        Permission.read("users"),
        Permission.delete("users"),
        Permission.update("users")
    ])
    if (!response) {
        return "Cannot create question"
    }
    return "Question created successfully"
}