import Link from "next/link"
import { auth } from "../_lib/auth"

// by exporting 'metadata', we can manuelly set the title
export const metadata = {
    title: 'Guest area',
}

export default async function Page() {
    const session = await auth();
    const firstname = session.user.name.split(' ').at(0)

    return (
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
            Welcome, {firstname}
        </h2>)
}
