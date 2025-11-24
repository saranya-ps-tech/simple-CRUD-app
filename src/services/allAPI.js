import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

export const addEmployeeAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/employee-add`,reqBody)
}
export const getAllEmployeeAPI = async ()=>{
    return await commonAPI("GET",`${serverURL}/employees`,{})
}
export const getSingleEmployeeAPI = async (id)=>{
    return await commonAPI("GET",`${serverURL}/employee/${id}/view`,{})
}

export const updateEmployeeAPI = async (id,reqBody)=>{
    return await commonAPI("PUT",`${serverURL}/employee/${id}/edit`,reqBody)
}

export const deleteEmployeeAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/employee/${id}/remove`,{})
}