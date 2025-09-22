'use client';

import { createRef } from 'react';
import Img from '@components/commons/Img';

const Button: IButtonComponent<IButtonComponentProps> = (props) => {
    const {
        buttonText = '',
        className = '',
        onClick = () => {},
        onEndIconClick = () => {},
        disabled = false,
        fontSize = '18',
        background = '',
        textColor = 'white',
        endIcon,
        startIcon,
        borderColor = 'none',
        iconColor,
        textClassName = '',
        fontWeight = 'bold',
        iconSize = 17,
        contentMode = 'nowrap',
    } = props;
    const btn = createRef<HTMLButtonElement>();

    const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { pageX, pageY, currentTarget } = event;

        const rect = currentTarget.getBoundingClientRect();
        const left = pageX - (rect.left + window.scrollX);
        const top = pageY - (rect.top + window.scrollY);
        if (!disabled) {
            const ripples = document.createElement('span');
            ripples.style.left = left + 'px';
            ripples.style.top = top + 'px';
            ripples.classList.add('components__button-ripple');
            btn?.current?.appendChild(ripples);

            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                ripples.remove();
            }, 900);

            if (onClick) {
                onClick();
            }
        }
    };

    return (
        <button
            ref={btn}
            className={`bases__border--${borderColor} w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg bases__font--${fontSize} bases__background--${background} bases__text--${textColor} ${className} ${
                disabled ? 'components__button_disable' : ''
            } ${contentMode === 'wrap' ? 'components__button_content-wrap' : ''}`}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClickButton(event)}
            disabled={disabled}>
            {startIcon ? (
                <Img
                    width={iconSize}
                    height={iconSize}
                    className={`${buttonText ? 'components__button-icon--start' : ''} bases__filter--${iconColor ? iconColor : textColor}`}
                    src={startIcon}
                />
            ) : (
                <></>
            )}
            <div className={`${textClassName} bases__text--${fontWeight} components__button-text`}>{buttonText}</div>
            {endIcon ? (
                <Img
                    onClick={() => (onEndIconClick ? onEndIconClick() : {})}
                    width={iconSize}
                    className={`${buttonText ? 'components__button-icon--end' : ''} bases__filter--${iconColor ? iconColor : textColor}`}
                    src={endIcon}
                />
            ) : (
                <></>
            )}
        </button>
    );
};

export default Button;
