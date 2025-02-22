'use client'
import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import Image from "next/image";
import SubmitButton from "@/app/_components/SubmitButton";

function UpdateProfilForm({ children, guest }) {
    const [count, setCount] = useState();
    const { fullName, email, nationalID, nationality, countryFlag } = guest;

    return (
        <form action={updateGuest} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    disabled
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    defaultValue={fullName}
                    name="fullName"
                />
            </div>

            <div className="space-y-2">
                <label>Email address</label>
                <input
                    disabled
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    defaultValue={email}
                    name="email"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <div className="h-5 w-7 relative">
                        <Image
                            src={countryFlag}
                            alt="Country flag"
                            fill
                            className="rounded-sm"
                        />
                    </div>
                </div>
                {children}
            </div>

            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    name="nationalID"
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    defaultValue={nationalID}
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <SubmitButton pendingLabel='Updating...' >Update profile</SubmitButton>
            </div>
        </form>
    )
}

export default UpdateProfilForm
