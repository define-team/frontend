import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const LayoutPage = lazy(() => import("./layout"));
const NotFound = lazy(() => import("./not-found"));
const Users = lazy(() => import("./users"));
const Keys = lazy(() => import("./keys"));
const NFC = lazy(() => import("./nfc"));
const Settings = lazy(() => import("./settings"));
const Events = lazy(() => import("./events"));

export const Routing = () => {
    return (
        <Routes>
            <Route index path="/" Component={LayoutPage} />
            <Route index path="/users" Component={Users} />
            <Route index path="/keys" Component={Keys} />
            <Route index path="/nfc" Component={NFC} />
            <Route index path="/settings" Component={Settings} />
            <Route index path="/events" Component={Events} />
            <Route index path="*" Component={NotFound} />
            {/* <Route exact path="/:taskId" component={TaskDetailsPage} /> */}
            
        </Routes>
    );
};