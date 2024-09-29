import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topics";
import TopicType from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description });

    return NextResponse.json({ message: 'Topic created.' }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const topics: Array<TopicType> = await Topic.find();

    return NextResponse.json({ topics: topics }, { status: 200 });
}

export async function DELETE(request: any) {
    const id: number = request.nextUrl.searchParams.get("id"); // url params
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Topic Deleted' }, { status: 200 });
}