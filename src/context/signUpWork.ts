import {atom, selector} from 'recoil'
import SignUpWorkerType from './interfaces/SignUpWorkType'


export const SignUpWorkerState = atom<SignUpWorkerType>({
    key : 'SignUpWorker',
    default : {
        id : '',
        password : '',
        address : '',
        distance : 0
    }
})
