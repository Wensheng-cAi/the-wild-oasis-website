'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";


function Filter() {
    // 访问当前 URL 中的查询参数
    const searchParams = useSearchParams();
    // 获取路由对象，其中的replace方法可以不重新加载页面地更新URL
    const router = useRouter();
    // 获取当前的路径名（不含query parameter）
    const pathname = usePathname();
    const activeFilter = searchParams.get('capacity') ?? 'all'

    function handleFilter(filter) {
        // 不能直接修改searchParams，所以要为当前的查询参数创建一个可修改的副本
        const params = new URLSearchParams(searchParams);
        // 设置查询参数并更新到当前URL
        params.set('capacity', filter)
        // navigate to this URL
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="border border-primary-800 flex">
            <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter} >All cabins</Button>
            <Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter} >1&mdash;3 guests</Button>
            <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter} >4&mdash;7 guests</Button>
            <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter} >8+ guests</Button>
        </div>)
}

function Button({ filter, handleFilter, activeFilter, children }) {
    return (
        <button className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter && 'bg-primary-700 text-primary-50'}`} onClick={() => handleFilter(filter)}>{children}</button>)
}

export default Filter
