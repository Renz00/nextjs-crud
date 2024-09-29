import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topics";
import TopicType from "@/app/types";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }:{ params: { id: number } }) {
   const { id } = params; // url params
   const { newTitle: title, newDescription: description } = await request.json();
   await connectMongoDB();
   await Topic.findByIdAndUpdate(
    id, 
    {
        title,
        description
    });
    

    return NextResponse.json({ message: 'Topic updated' }, { status: 200 });
}

export async function GET(request: Request | null, { params }: { params: { id: number } }) {
    const { id } = params; // url params
    await connectMongoDB();
    
    const topic: TopicType | null = await Topic.findOne({ _id: id });

    if (topic == null){
        return NextResponse.json({ message: 'Topic does not exist.' }, { status: 404 });
    }
    
    return NextResponse.json({ topic: topic }, { status: 200 });
 }