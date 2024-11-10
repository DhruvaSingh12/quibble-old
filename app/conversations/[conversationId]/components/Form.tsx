"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {CldUploadButton, CloudinaryUploadWidgetResults} from "next-cloudinary";


const Form = () => {
    const { conversationId } = useConversation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });

        axios.post('api/messages', {
            ...data,
            conversationId: conversationId
        })
        .then((response) => {
            console.log("Message sent successfully:", response.data);
        })
        .catch((error) => {
            console.error("Error sending message:", error.response?.data || error.message);
        });
        };
        const handleUpload = (result: any) => {
            axios.post('/api/messages', {
                image: result?.info?.secure_url,
                conversationId: conversationId
            });
    }

    return (
        <div className="mr-2 ml-2 mb-2 py-4 px-4 bg-purple-300 flex items-center gap-2 lg:gap-4 rounded-xl">
            <CldUploadButton 
                options={{ maxFiles: 1 }}
                onUploadAdded={handleUpload}
                uploadPreset="o0xsfvyi"
            >
                <HiPhoto size={30} className="text-purple-800" />
            </CldUploadButton>
          
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center gap-2 lg:gap-4">
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Message"
                />
                <button type="submit" className="bg-purple-500 hover:bg-purple-600 transition py-2 px-2 cursor-pointer rounded-full">
                    <HiPaperAirplane className="text-purple-100" size={25} />
                </button>
            </form>
        </div>
    );
};

export default Form;
