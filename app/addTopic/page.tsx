'use client';
// all components are server components by default
// client component console logs into browser
// server component console logs into terminal

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [ title, setTitle ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');
    const router = useRouter();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault(); // prevent page refresh
        if (!title || !description){
            alert('All fields are required.');
            return;
        }
        
        try {
            const res: Response = await fetch(`${process.env.API_BASE_URL}/topics`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });
            if (res.ok) {
                router.push('/')
            }
            else {
                throw new Error('Failed to create topic.');
            }
        }
        catch (error){
            console.log(error)
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="border border-slate-500 px-8 py-2" placeholder="Topic Title"/>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="border border-slate-500 px-8 py-2" rows={3} placeholder="Topic Description"></textarea>
            <button type="submit" className="bg-green-600 font-bold text-white px-6 py-3">Add Topic</button>
        </form>
    )
}