import conf from "../conf/conf";
import { ID, Client, Storage, Databases, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    //____DATABASE_SERVICES____

    async createPost(slug, { title, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userID }
            );
        } catch (error) {
            console.log(
                "Appwrite Database service :: createPost :: error ",
                error
            );
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            console.log(
                "Appwrite Database service :: updatePost :: error ",
                error
            );
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log(
                "Appwrite Database service :: deletePost :: error ",
                error
            );
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log(
                "Appwrite Database service :: getPost :: error ",
                error
            );
            return false;
        }
    }

    async getPosts(queries = [Query.equals("status", ["active"])]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log(
                "Appwrite Database service :: getPosts :: error ",
                error
            );
            return false;
        }
    }

    //____FILE_SERVICES____

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite File service :: uploadFile :: error ", error);
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID
            );
            return true;
        } catch (error) {
            console.log("Appwrite File service :: deleteFile :: error ", error);
            return false;
        }
    }

    async getFilePreview(fileID) {
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileID
            );
        } catch (error) {
            console.log(
                "Appwrite File service :: getFilePreview :: error ",
                error
            );
            return false
        }
    }
}

const service = new Service();

export default service;
