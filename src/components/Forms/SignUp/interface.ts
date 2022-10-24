import { RecoilState } from "recoil";

export default interface SignUpProps {
    title : string;
    placeholder? : string;
    mode : string;
    state : RecoilState<any>
} 