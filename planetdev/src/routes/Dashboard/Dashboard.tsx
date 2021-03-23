import { useRequiresAuthentication } from "../../utils/authService";

export const DASHBOARD_PATH = '/dashboard';

const Dashboard = () => {
    const { loggedIn } = useRequiresAuthentication();
    if(!loggedIn)
        return null;

    return (
        <div>
            <h1>Dashboard!</h1>
        </div>
    );
};

export default Dashboard;