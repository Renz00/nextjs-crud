import Link from "next/link"
import RemoveBtn from "@/components/RemoveBtn";
import TopicType from "@/app/types";

const getTopics = async () => {
    try {
        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store' 
        });
        if (!res.ok) {
            throw new Error('Failed to fetch topics.');
        }

        return res.json();
    }
    catch (error) {
        console.log('Error loading topics: ', error);
    }
}

export default async function TopicsList() {

    const { topics }: { topics: Array<TopicType> } = await getTopics();

    return (
        <>
            {topics.map((v: TopicType, i: number) => (
                <div className="p-4 border border-slate-300 my-3 flex justify-between items-start" key={i}>
                    <div>
                        <h2 className="font-bold text-2xl">{v.title}</h2>
                        <div>{v.description}</div>
                    </div>
                    <div className="flex gap-2">
                        {/* Passing props */}
                        <RemoveBtn id={v._id} />
                        <Link href={`/editTopic/${v._id}`}>
                            <i className="pi pi-pencil"></i>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}