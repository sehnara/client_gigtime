import {atom} from 'recoil'
import SignDataType from './interfaces/SignUpType'


export const SignUpState = atom<SignDataType>({
    key : 'SignUp',
    default : {
        id : '',
        password : '',
        name : "",
        phone : "",
        address : "",
        category : [],
        description : "",
        background : "",
        profile : "",
        pay : null
    }
})
