import { Permission } from "appwrite";
import { db, questionCollection } from "../name";
import { databases } from "./config";



export default async function createQuestionCollection() {

    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read('any'),
        Permission.write("users"),
        Permission.read("users"),
        Permission.delete("users"),
        Permission.update("users")
    ])
    console.log("Question collection is created")

    // creating attributes & indexes

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
    ]);
    console.log("Attributes created")

    // create indexes
    // TODO: Trial check and do manually from cloud
    // databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ["asc"])
    // databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ["asc"])
}