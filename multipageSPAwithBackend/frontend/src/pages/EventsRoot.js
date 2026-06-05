import { Outlet } from "react-router-dom";
import EventNavigation from "../components/EventsNavigation";
function  EventsRootLayout(){
return <>
    <h1>Events Root Layout</h1>
    <main>
        <EventNavigation />
        <Outlet />
    </main>
</>
    
}

export default EventsRootLayout;