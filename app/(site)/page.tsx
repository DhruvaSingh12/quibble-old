import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
      <div className="
            flex 
            min-h-full 
            flex-col 
            justify-center 
            py-12 
            sm:px-6 
            lg:px-8 
            bg-purple-500
        ">
        <Image 
           alt="Logo"
           height="60"
           width="60"
           className="mx-auto w-auto"
           src="/images/logo.png"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Log in to your account or create a new one. 
        </h2>
        <AuthForm />
      </div>
      
    )
  }
  