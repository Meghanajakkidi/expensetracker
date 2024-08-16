const API_URL="http://localhost:7000";
export const apiService = {
    getUserProfile:async function(email){
    const API_ENDPOINT=API_URL+"/auth/profile/"+email;
       let res =  await fetch(API_ENDPOINT,{headers:{'Authorization':'123'}})
       let data = await res.json()
       return data;
    },
    profileUpload:async function(data,email){
        const API_ENDPOINT=API_URL+"/auth/profileupload/"+email;
        let res = await fetch(API_ENDPOINT, { method: "POST", body: data })
        let result = await res.json();
        return result;
    }
}