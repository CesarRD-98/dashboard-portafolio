import { ProfileService } from "@/app/modules/profile/profile.service";
import { ProfileView } from "./ui/profile.view";

export const metadata = {
    title: 'Inicio | Perfil'
}

export default async function ProfilePage() {
    const data = await ProfileService.getOne()

    return <ProfileView profile={data} />
}