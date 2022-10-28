export default interface InputTextProps {
    label : string;
    _key : string
    _value : string|number;
    setValue : (key:string, value:string) => void
}