"use client";

import clsx from 'clsx';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({label, id, required, register, errors, type, disabled}) => {
    return (
        <div>
            <label htmlFor={id} 
                className="block text-m font-medium text-gray-900 leading-6">
                    {label}
            </label>
            <div className='mt-2'>
                <input 
                    className={clsx(`
                        form-input block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
                        errors[id] && 'ring-red-500 focus:ring-red-500',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    id={id} type={type} autoComplete={id} {...register(id,{required})} disabled={disabled}
                
                />
            </div>
            
        </div>
    );
}

export default Input;