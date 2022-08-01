import Sidebar from "../../admin_components/Sidebar";
const adminDashboardPage = () =>{
    return(
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 mt-3 p-2">
            <div className="col-span-1">
                 <Sidebar/>
            </div>
            <div className="col-span-3">
                <h1>This is Dashboard</h1>
            </div>
        </div>
    )
} 
export default adminDashboardPage;