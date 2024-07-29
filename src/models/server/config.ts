import env from "@/app/env";
import { Avatars, Databases, Storage, Client, Users } from "node-appwrite"

let client = new Client()
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId)
    .setKey(env.appwrite.apiKey);

const databases = new Databases(client);
const users = new Users(client)
const avatars = new Avatars(client);
const storage = new Storage(client);

export { databases, users, storage, avatars }