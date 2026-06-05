import EventItem from "../components/EventItem";
import { useRouteLoaderData, redirect } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventDetailPage(){
    const data = useRouteLoaderData('event-detail');
    return (
        <>
            <EventItem event={data.event} />
            <EventsList events={} />
        </>
    );
}

export default EventDetailPage;

export async function loader({ params }) {
    const id = params.eventId;
    const response =  await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Failed to fetch event'}), {status: 500});
    }else{
        return response;
    }
}

export async function action({params, request}){
    const eventId = params.eventId; 
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    });
    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not delete event'}), {status: 500});
    }else{
        return redirect('/events');
    }
}