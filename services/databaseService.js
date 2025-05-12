import { database } from "./appwrite";

const databaseService = {
    // List Documents
    async listDocuments(dbId,colId,queries = []){
        try{
            const response = await database.listDocuments(dbId,colId,queries);
            return {data: response.documents || [],error:null};
        }
        catch(error){
            console.error('Error Fetching Documents',error.message);
            return { error: error.message }
        }
    },

    // Creating Document

    async createDocument(dbId,colId,data,id = null){
        try{
            return await database.createDocument(dbId,colId,id || undefined, data);
        }
        catch(error){
            console.error('Error creating Document', error.message);
            return {
                error: error.message,
            };
        }
    },
    // Updaditing the document

    async updateDocument(dbId,colId,id,data){
        try{
            return await database.updateDocument(dbId,colId,id,data);
        }
        catch(error){
            console.error('Error Updating Document', error.message);
            return {
                error: error.message,
            };
        }
    },

    // Deleteing the document 
    async deleteDocument(dbId, colId, id) {
        try {
          await database.deleteDocument(dbId, colId, id);
          return { success: true };
        } catch (error) {
          console.error('Error deleting document', error.message);
          return {
            error: error.message,
          };
        }
      },
}   

export default databaseService;