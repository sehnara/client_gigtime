export default interface ProcessType {
    speed?: number;
    result?: {};
    setIsOpen?: (e: boolean) => void;
    isOpen?: boolean;
    visits: any[];
    moneys: number[];
  };