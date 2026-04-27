import { getSupabaseServer } from "@/app/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const supabase = await getSupabaseServer();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return NextResponse.json({ error }, { status: error.status });
    }

    return NextResponse.json({ status: 200 });
}