export type OptionType ={
    id : string;
    name : string
}
export default interface InputSelectProps {
    label :string;
    _key : string;
    _value : string;
    setValue : (key : string, value : string) => void;
    options : any[]
}