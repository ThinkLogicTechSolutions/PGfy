import { apiConnector } from "../apiconnector";
import {  tenantEndpoints } from "../apis";

const {PROFILE_API,GET_PG_DETAILS} = tenantEndpoints


export function createProfile(name,contactNumber,gender,dateOfBirth,emergencyContact,address,profession,bloodGroup,navigate){
    return async()=>{
        try{

            console.log("creating profile")
            const responce = await apiConnector("POST",PROFILE_API,{name,contactNumber,gender,dateOfBirth,emergencyContact,address,profession,bloodGroup})
            console.log("received responce",responce)
            if(!responce.data.success){
                throw new Error(responce.data.message)
            }

            console.log("created successfully")
            navigate("KYCverify")
        }
        catch(error){

        }
    }
}


// export function PGFetch(id) { 
//     return async()=>{
//         try{

//             const responce = await apiConnector("GET",GET_PG_DETAILS,{id});
//             if(!responce.data.success){
//                 throw new Error(responce.data.message)
//             }


        
//         }catch(error){

//         }
//     }
// }