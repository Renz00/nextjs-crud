// import { Button } from 'primereact/button';
"use client";

import { useRouter } from "next/navigation";

interface Props {
    id: string;
}

export default function RemoveBtn({ id }: Props) { // props recieved from TopicList

    const router = useRouter();
    const removeTopic = async () => {
        const confirmed: boolean = confirm('Are you sure?');
        if (confirmed) {
            try {
                const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/topics?id=${id}`, { // send id as search params
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (res.ok) {
                    router.refresh();
                }
                else {
                    throw new Error('Could not delete topic.');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    
    
    
    return (
        <button onClick={removeTopic} className="text-red-400">
            <i className="pi pi-trash" style={{ fontSize: '1rem' }}></i>
        </button>
    )
 };