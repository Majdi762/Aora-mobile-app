import { Platform } from "react-native";
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1' ,
    Platform: 'com.jsm.aora',
    projectId: '672e187700129c2b2f42',
    databaseId: '672e1cb5000aba2e190e',
    userCollectionId: '672e1d11002e0ac264b1',
    videoCollectionId: '672e1d950000808674c3',
    srorageId: '672e38ea001b41782718'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.Platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

 export const createUser = async ( email, password, username) =>
{
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) {
            throw new Error;
        }

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password)  => {
    try {
        // this function do the authentication by providing correct email and password
        const session = await account.createSession(email, password)
        return session;
    } catch (error) {
        console.log(error);
    }
    
}


// resume de la fct asyn 
    // la fct async sert à s'éxecuter en arriere plan sans bloquer le code qui le suit 
    //  Avant await, le code s'exécute immédiatement, sans attendre l'achèvement des opérations asynchrones
    //  Avec await, le programme attend que l'opération asynchrone se termine avant de continuer.
    //  Les opérations asynchrones peuvent s'exécuter en parallèle si elles ne sont pas précédées de await.

export const getCurrentUser = async () => {
    try {
        const currentAccount = account.get()

        if (!currentAccount) {
            throw Error;
        }
        // get the user from the database if the account exists

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
            
        )

        
        if (!currentUser) {
            throw Error;
        }
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        
    }
}