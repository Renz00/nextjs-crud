"use client";

import { useState } from "react";

interface Props {
    id: string;
    title: string;
    description: string;
}

export default function EditTopicForm({ id, title, description }: Props) {
    const [ editTitle, setEditTitle ] = useState<string>(title);
    const [ editDescription, setEditDescription ] = useState<string>(description);
    const editId: string = id;

    return (
        <form className="flex flex-col gap-3">
            <input onChange={(e) => setEditTitle(e.target.value)} value={editTitle} type="text" className="border border-slate-500 px-8 py-2" placeholder="Topic Title"/>
            <textarea onChange={(e) => setEditDescription(e.target.value)} value={editDescription} className="border border-slate-500 px-8 py-2" rows={3} placeholder="Topic Description"></textarea>
            <button className="bg-green-600 font-bold text-white px-6 py-3">Update Topic</button>
        </form>
    )
}