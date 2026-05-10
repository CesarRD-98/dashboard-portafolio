import { getSupabaseServer } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await getSupabaseServer({ readwrite: true });
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error }, { status: error.status });
    }

    return NextResponse.json({ session: data.user });
}