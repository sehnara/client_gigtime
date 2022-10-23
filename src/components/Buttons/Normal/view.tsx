import ButtonProps from './interface';

const Button = 
({ active, title, color, width, height, onClickEvent }: ButtonProps) => 
{
    return (
        <button
            disabled={active && active}
            onClick={() => {
                onClickEvent();
            }}
            className={`text-base text-white bg-cyan-500 rounded-lg font-extrabold h-12 mt-3
            w-${width}  
            h-${height}`}
        >
            {title}
        </button>
    );
};

Button.defaultProps = {
    width: 'full',
    height: 100,
};

export default Button;
