"use client";
import { useState } from "react"

function Counter({ users }) {
    const [num, setNum] = useState(0)

    return <>
        <p>There are {users.length} users.</p>
        <button onClick={() => setNum(s => s + 1)}>{num}</button>
    </>
}

export default Counter
