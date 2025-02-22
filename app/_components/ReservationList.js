'use client'
import { useOptimistic } from "react"
import ReservationCard from "./ReservationCard"

function ReservationList({ bookings }) {
    // useOptimistic能使数据仍在加载的时候更新UI
    // const x = useOptimistic();

    return (
        <ul className="space-y-6">
            {bookings.map((booking) => (
                <ReservationCard booking={booking} key={booking.id} />
            ))}
        </ul>
    )
}

export default ReservationList
