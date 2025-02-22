/* import { NextResponse } from "next/server"

// 默认的middleware在所有route下执行（往往造成无限请求）
export function middleware(request) {
    console.log(request)

    return NextResponse.redirect(new URL('/about', request.url))
} */

import { auth } from '@/app/_lib/auth'
// 将auth的值赋给middleware然后导出
export const middleware = auth;

// 设置matcher， 只有在该数组包含的路由中执行middleware
export const config = {
    matcher: ['/account']
}