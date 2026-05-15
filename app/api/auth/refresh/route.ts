import { getSupabaseServer } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
    const supabase = await getSupabaseServer();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error, session: null }, { status: error.status });
    }

    return NextResponse.json({ session: data.user });
}