import { ANGEL_STATE } from "../../context/types/AngelState";

type mode = 'WORKER' | 'OWNER'

export default interface NavBarProps {
    mode?: mode;
    angelUseState?: any;
    isAngel?: ANGEL_STATE;
  };