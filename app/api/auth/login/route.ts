import { getSupabaseServer } from "@/app/lib/supabase/server";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { loginSchema } from "@/app/modules/auth/auth.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body: unknown = await req.json().catch(() => null);
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: { message: parsed.error.issues[0]?.message ?? "Datos de acceso inválidos" } },
            { status: 400 }
        );
    }

    try {
        const supabase = await getSupabaseServer();
        const { error } = await supabase.auth.signInWithPassword(parsed.data);

        if (error) {
            const mappedError = mapSupabaseError(error);
            return NextResponse.json(
                { error: { message: mappedError.message } },
                { status: error.status ?? 401 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error inesperado durante el inicio de sesión", error);
        return NextResponse.json(
            { error: { message: "No fue posible iniciar sesión. Inténtalo de nuevo." } },
            { status: 500 }
        );
    }
}
