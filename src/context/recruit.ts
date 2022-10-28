import {atom} from 'recoil'
import RecruitType from './interfaces/RecruitType'


export const RecruitState = atom<RecruitType>({
    key : 'Recruit',
    default : {
        userName :'',
        address: '',
        phone :'',
        category :'',    
        description : '',
        wage : 0,
        startDate : '',
        endDate :'',
        startTime : '',
        endTime :'',
    }
})
