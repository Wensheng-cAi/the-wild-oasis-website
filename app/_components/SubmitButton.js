'use client'
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
    // useFormState不是react hook, 而是react-dom hook 
    // const { pending } = useFormStatus();: 获取表单的提交状态
    const { pending } = useFormStatus();

    return <button disabled={pending} className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
        {pending ? pendingLabel : children}
    </button>
}