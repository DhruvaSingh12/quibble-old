import React from 'react';
import {IconType} from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="inline-flex w-full justify-center rounded-md bg-violet-200 px-4 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-violet-200 hover:bg-blue-300 focus:outline-offset-0">
        <Icon className="h-5 w-5" />
    </button>
  );
}

export default AuthSocialButton;