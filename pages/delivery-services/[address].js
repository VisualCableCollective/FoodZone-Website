import {MainLayout} from "../../layouts/MainLayout";
import {useRouter} from "next/router";

export default function DeliveryServicesListPage() {
    const router = useRouter();
    const urlAddress = router.query.address;

    return (
        <MainLayout>
            Your address is: {urlAddress}
        </MainLayout>
    )
}