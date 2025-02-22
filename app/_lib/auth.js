import NextAuth from "next-auth";
import Google from 'next-auth/providers/google'
import { getGuest, createGuest } from "./data-service";


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [Google],
    callbacks: {
        // true: 当前用户被授权进入受保护的路由
        // false: 当前用户不被授权进入受保护的路由
        authorized({ auth, request }) {
            return !!auth?.user     //将!auth.user的结果转化为相反的布尔值
        },
        // 连接用户注册数据与后端数据库
        async signIn({ user, account, profile }) {
            try {
                const existingGuest = await getGuest(user.email)

                if (!existingGuest) await createGuest({ email: user.email, fullName: user.name });

                return true;
            } catch {
                return false;
            }
        },
        // 将guestId添加到session对象中，方便调用
        async session({ session }) {
            const guest = await getGuest(session.user.email);
            session.user.guestId = guest.id;
            return session;
        },
    },
    pages: {
        signIn: '/login',
    }
})