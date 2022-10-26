export default interface RecruitFormsProps {
    label? : string;
    placeholder? : string;
    mode : string;
    value : string;
    setValue : (e:string) => void;
}