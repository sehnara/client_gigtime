type CategoryType = {
    id : string;
    name : string;
}

export default interface SignDataType {
    id : string;
    password : string;
    name : string;
    phone : string;
    address : string;
    category : CategoryType[];
    description : string;
    profile : any;
    background : any;
    pay : number|null;
}