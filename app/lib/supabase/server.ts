import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

type SupabaseServerOptions = {
    readonly?: boolean;
    readwrite?: boolean;
}

export async function getSupabaseServer({ readonly = false, readwrite = false }: SupabaseServerOptions) {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            cookies: {
                getAll: () => {
                    return readonly || readwrite ? cookieStore.getAll() : null;
                },
                setAll: (cookies) => {
                    if (readwrite) {
                        cookies.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    }
                }
            }
        }
    );
}
