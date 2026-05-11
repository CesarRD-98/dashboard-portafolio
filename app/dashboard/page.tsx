import { ProfileService } from "../modules/profile/profile.service";
import { DashboardView } from "./ui/dashboard.view";

export const metadata = {
    title: 'Dashboard'
}

export default async function DashboardPage() {
    const data = await ProfileService.overview();
    return <DashboardView data={data} />
}