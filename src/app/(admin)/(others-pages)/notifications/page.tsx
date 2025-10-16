import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NotificationTableClient from "@/components/pageComponents/notifications";

export default function Notifications() {
    return (
        <>
            <div>
                <PageBreadcrumb pageTitle="Notifications" />
                <NotificationTableClient />
            </div>
        </>
    );
}
