export default interface ButtonProps {
    title: string;
    color?: string;
    width?: number;
    height?: number;
    active?: boolean;
    onClickEvent: () => void;
};