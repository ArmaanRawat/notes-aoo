import databaseService from "./databaseService";
import {ID,Query} from "react-native-appwrite";

// Appwrite database and Collection ID
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
    // get notes;
    async getNotes(userId){
        if(!userId){
            console.error('Error: Missing User ID');
            return {
                data : [],error:'User Id is missing'
            };
        }
        try{
            const response = await databaseService.listDocuments(dbId,colId,[
                Query.equal('user_id',userId)
            ]);
            return response;
        }
        catch(error){
            console.log('Error Fetching Notes',error.message);
            return {data: [],error:error.message};
        }
    },

    //Add new note

    async addNote(user_id,text){
        if(!text){
            return {error:'Note text cannot be Empty!'};
        }

        const data = {
            text : text,
            createdAt: new Date().toISOString(),
            user_id: user_id,
        }
        const response = await databaseService.createDocument(
            dbId,
            colId,
            data,
            ID.unique()
        );
        if(response?.error){
            return {error:response};
        }

        return {data:response};
    },

    async updateNote(id,text){
        const response = await databaseService.updateDocument(dbId,colId,id,{
            text
        });

        if(response?.error){
            return {error:response};
        }
        
        return {data:response};

    },

    //delete notess

    async deleteNote(id) {
        const response = await databaseService.deleteDocument(dbId, colId, id);
        if (response?.error) {
          return { error: response.error };
        }
    
        return { success: true };
      },
}

export default noteService;