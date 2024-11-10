"use client";

import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type, fullWidth, children, onClick, secondary, danger, disabled
}) => {
    return (
        <button 
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
                disabled && 'opacity-50 cursor-not-allowed',
                fullWidth && 'w-full',
                secondary ? 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50' : 'bg-violet-600 text-white hover:bg-violet-500',
                danger && 'bg-red-600 hover:bg-red-500 focus-visible:outline-rose-500',
                !secondary && !danger && 'bg-violet-600 hover:bg-violet-500 focus-visible:outline-violet-600'
            )}>
                {children}
        </button>
    );
}

export default Button;