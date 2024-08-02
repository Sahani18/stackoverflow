// first time when this app starts if there is no tables available we'll create all the tables first
// also known as seeding of DB or initialising of DB

import { db } from "../name";
import createCommentCollection from "./comment.collection";
import createAnswerCollection from "./answer.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";


export default async function getOrConnectDB() {
    try {
        await databases.get(db);
        console.log("Database Connected")
    } catch (error) {
        try {
            await databases.create(db, db)
            console.log("Database Created")
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),

            ]);
            console.log("Collection  created")
            console.log("Database Connected")
        } catch (error) {
            console.log("Error creating DB", error)
        }
    }
    return databases
} 
