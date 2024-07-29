import { Permission } from "appwrite";
import { answersCollection, db } from "../name";
import { databases } from "./config";
import { IndexType } from "node-appwrite";

export default async function createAnswerCollection() {
    await databases.createCollection(db, answersCollection, answersCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);

    console.log("Answers collection created")
    // create attributes
    await Promise.all([
        databases.createStringAttribute(db, answersCollection, "content", 10000, true),
        databases.createStringAttribute(db, answersCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answersCollection, "authorId", 50, true),
    ]);

    console.log("Answer collection created")

    // create indexes
    databases.createIndex(db, answersCollection, "content", IndexType.Fulltext, ["content"], ["asc"]),
        databases.createIndex(db, answersCollection, "questionId", IndexType.Unique, ["questionId"], ["asc"]),
        databases.createIndex(db, answersCollection, "authorId", IndexType.Unique, ["authorId"], ["asc"])
}