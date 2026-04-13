import { ProfileService } from "@/app/modules/profile/profile.service";
import { ProfileView } from "./ui/profile.view";

export const metadata = {
    title: 'Inicio | Perfil'
}

export default async function ProfilePage() {
    const data = await ProfileService.getProfile()

    return <ProfileView profile={data} />
}