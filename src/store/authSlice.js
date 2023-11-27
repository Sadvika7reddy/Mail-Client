import { createSlice } from "@reduxjs/toolkit";

const initialAuthstate={
    isAuthenticated:false,
    token:"",
    userId:""
}
const authSlice=createSlice({
    name:"authentication",
    initialState:initialAuthstate,
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.token=action.playload;
            localStorage.setItem("token",action.playload)
        },
        logout(state){
            state.isAuthenticated=false;
            state.token="";
            localStorage.removeItem("token")
            localStorage.removeItem("email")
        },
        setUserId(state,action){
            localStorage.setItem("email",action.playload)
            state.userId = action.payload.replace(/[@,.]/g, "");
        },
        setIsAuth(state){
            if(localStorage.getItem("token")){
                state.isAuthenticated=true;
                state.token=localStorage.getItem("token")
                const UID = localStorage.getItem("email");
                state.userId = UID.replace(/[@,.]/g, "");
            }
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;