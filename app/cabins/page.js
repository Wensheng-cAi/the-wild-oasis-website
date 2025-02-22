import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// by exporting 'metadata', we can manuelly set the title
export const metadata = {
    title: 'Cabins',
}
// 设定重新获取数据的时间（更新缓存）
// export const revalidate = 3600;

// 一旦使用page.js自带的searchParams属性，那么页面讲变为动态加载,所有的cache失效(searchParams将URL中的查询参数以对象的形式返回)
export default function Page({ searchParams }) {
    const filter = searchParams?.capacity ?? 'all';

    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the Italian
                Dolomites. Imagine waking up to beautiful mountain views, spending your
                days exploring the dark forests around, or just relaxing in your private
                hot tub under the stars. Enjoy nature&apos;s beauty in your own little home
                away from home. The perfect spot for a peaceful, calm vacation. Welcome
                to paradise.
            </p>

            <div className="flex justify-end mb-8">
                <Filter />
            </div>
            {/* 将需要data fetch的内容单独放到一个组件里，这样加载时，其他内容就可以先呈现 */}
            {/* 给suspense一个unique key，这样当key改变时，fallback就会重新显示 */}
            <Suspense fallback={<Spinner />} key={filter} >
                <CabinList filter={filter} />
                <ReservationReminder />
            </Suspense>
        </div>
    );
}
