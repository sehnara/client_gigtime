type MODE = "WORKER" | "OWNER";

export default interface ListProps {
  date: string;
  type: string;
  datas: any[];
  mode: MODE;
  store?: string;
  address?: string;
  price?: string;
};