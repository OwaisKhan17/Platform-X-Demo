import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RequestTableClient from "@/components/pageComponents/requests";
 
export default function AuthorizeRequests() {
    return (
            <div>
                <PageBreadcrumb pageTitle="Authorize Requests" />
                <RequestTableClient />
            </div>
    );
}