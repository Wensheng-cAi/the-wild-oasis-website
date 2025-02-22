'use server';
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from './supabase';
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function updateGuest(formData) {
    // check if user is authenticated
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');
    // 永远假设数据是不安全的，所以要验证(这里通过使用regex验证nationalID的长度实现)
    if (/^[a-zA-Z0-9]{6-12}$/.test(nationalID)) throw new Error("Please provide a valid national ID");

    const updateData = { nationality, nationalID, countryFlag }


    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)

    if (error) throw new Error('Guest could not be updated');
    // 手动更新该route下的所有缓存
    revalidatePath('/account/profile')
}

export async function deleteBooking(bookingId) {
    // check if user is authenticated
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    // 只允许客人删除自己guestId下的bookingId (防止有人使用浏览器之外的手段删除其他用户的bookings)
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    if (!guestBookingIds.includes(bookingId))
        throw new Error("You are not allow to delete this booking");

    // 执行删除操作
    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
    if (error) throw new Error('Booking could not be deleted');

    // 手动更新该route下的所有缓存
    revalidatePath('/account/reservations')
}

export async function updateBooking(formData) {
    // check if user is authenticated
    const session = await auth();
    if (!session) throw new Error("You must be logged in");
    // 只允许客人修改自己guestId下的bookingId (防止有人使用浏览器之外的手段删除其他用户的bookings)
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);
    // formData将所有数据存储为str
    const bookingId = Number(formData.get('bookingId'))
    if (!guestBookingIds.includes(bookingId))
        throw new Error("You are not allow to update this booking");

    // 执行更新操作
    const numGuests = Number(formData.get('numGuests'))
    const observations = formData.get('observations').slice(0, 1000)
    const { error } = await supabase
        .from('bookings')
        .update({ numGuests, observations })
        .eq('id', bookingId)

    if (error)
        throw new Error('Booking could not be updated');

    revalidatePath('/account/reservations')
    revalidatePath(`/account/reservations/edit/${bookingId}`)
    redirect('/account/reservations')
}

// 如果需要使用bind携带额外数据，确保formData是最后一个被传入的参数
export async function createBooking(bookingData, formData) {
    // check if user is authenticated
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const newBooking = {
        ...bookingData,
        guestId: session.user.guestId,
        numGuests: Number(formData.get('numGuests')), observations: formData.get('observations').slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        hasBreakfast: false,
        isPaid: false,
        status: 'unconfirmed',
    }

    const { error } = await supabase
        .from('bookings')
        .insert([newBooking])
    if (error)
        throw new Error('Booking could not be created');

    // revalidatePath('/cabins')
    revalidatePath(`/cabins/${bookingData.cabinId}`)
    redirect('/cabins/thankyou')
}

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' })
}