import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface WorkerSign{
    id : number;
    name : string;
    email : string;
    location : string;
    range    : number;
}

export const sign = createSlice({
    name : "sign",
    initialState : {
        id : 1, 
        name : '',
        email : '',
        location : '',
        range : 0
    },
    reducers : {
        onSign(state, action){
            const a = action.payload
            console.log(a)
            return {...state, a}
        }
    }
})

export const {onSign} = sign.actions;
export default sign.reducer;