import EditTopicForm from "@/components/editTopicForm";
import TopicType from "@/app/types";


const showTopic = async (id: string) => {
    console.log('id', id);
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/${id}`, {
        cache: 'no-store'
    });
    console.log('res', res);
    if (!res.ok){
        console.log('error');
    }
    return res.json();
}

export default async function EditTopic({ params }: { params: { id: string }}) {
    const { id } = params;
    const { topic }: { topic: TopicType } = await showTopic(id);

    return (
        <EditTopicForm id={id} title={topic.title} description={topic.description}/>
    )
}