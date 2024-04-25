import { db } from "@/db"
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/isAdmin";
import { NextResponse } from "next/server";

export const GET = async () => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await db.query.challenges.findMany();

    return NextResponse.json(data);
}

export const POST = async (req: Request) => {
    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json();

    const data = await db.insert(challenges).values({
        ...body
    }).returning();

    return NextResponse.json(data[0]);
}