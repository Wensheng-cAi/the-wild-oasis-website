import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from '@/app/_components/Cabin'

// 动态生成metadata
export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId);
    return { title: `Cabin ${name}` }
}
// 使用generateStaticParams是动态渲染转换为静态渲染(多用于a finite set of values for a dynamic segment of URL)
export async function generateStaticParams() {
    const cabins = await getCabins();
    // 这里在对象外需要加一层括号({object})，确保这里的{}不被解释为代码块，而是解释为对象
    const ids = cabins.map(cabin => ({ cabinId: String(cabin.id) }))

    return ids;
}

export default async function Page({ params }) {
    const cabin = await getCabin(params.cabinId);

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
