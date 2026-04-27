import { getSupabaseServer } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = await getSupabaseServer();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return NextResponse.json({ error }, { status: error.status });
    }

    return NextResponse.json({ status: 200 });
}