"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGoogle} from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant= "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session.status === "authenticated"){
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant === "LOGIN"){
            setVariant("REGISTER");
        }else{
            setVariant("LOGIN");
        }
    }, [variant]);

    const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if(variant === "LOGIN")
        {
            signIn('credentials', {...data, redirect:false})
            .then((callback) => {
                if (callback?.error){
                    toast.error("Invalid credentials")
                }
                
                if (callback?.ok && !callback?.error){
                    toast.success("Logged In Successfully!")
                    router.push('/users');
                }

            })
            .finally(() => setIsLoading(false));
        }
        if(variant === "REGISTER")
        {
            axios.post('/api/register', data)
            .then(() => {
                toast.success("Account created.")
                toggleVariant();
            })
            .then(() => signIn('credentials',data))
            .catch(() => toast.error("Something isn't right."))
            .finally(() => setIsLoading(false));
        }
        else 
        {

        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, {redirect: false})  
        .then((callback) => {
            if (callback?.error){
                toast.error("Invalid credentials")
            }
            if (callback?.ok && !callback?.error){
                toast.success("Logged In Successfully!")
            }
        })
        .finally(() => setIsLoading(false));
    }


    return (
        <div className="mt-8 sm:mx-auto sm:w-full px-4 sm:max-w-md">
            <div className="bg-white py-8 px-4 rounded-lg shadow sm:rounded-lg sm:px-10">
                <form 
                   className="space-y-4"
                   onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "REGISTER" && (                 
                    <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading}/>
                    )}
                    <Input id="email" label="Email address" type="email" register={register} errors={errors} disabled={isLoading}/>
                    <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading}/>
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant==='LOGIN' ? 'Login' : 'Sign up'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-violet-500" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-black">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 flex space-x-2">
                        <AuthSocialButton 
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                </div>
            </div>
            <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        {variant === "LOGIN" ? "New to Quibble?" : "Already have an account?"}
                        <span
                            onClick={toggleVariant}
                            className="ml-1 font-medium text-blue-600 hover:underline cursor-pointer"
                        >
                            {variant === "LOGIN" ? "Create an account" : "Login"}
                        </span>
                    </p>
                </div>
            </div>
        </div>  
    );
}
export default AuthForm;