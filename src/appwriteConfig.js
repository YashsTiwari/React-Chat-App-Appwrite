// eslint-disable-next-line no-unused-vars
import { Client, Databases } from "appwrite";
import { PROJECT_ID } from "./globalVariable";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

export const databases = new Databases(client);
export default client;
