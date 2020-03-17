import React, {useState, useEffect, useContext, useMemo, useCallback} from 'react';
import axios from 'axios';

import {api_server_url} from '../../../shared/utilities/globalVariables';
import {AuthContext} from '../../../shared/context/auth-context';
import ScrollToTop from '../../../shared/components/UI/ScrollToTop'
import EventResultItem from '../../../events/pages/EventResultItem';

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState();
    const accessToken = useContext(AuthContext).token;
    const headers = useMemo(
        () => ({
          Authorization: 'Bearer ' + accessToken
        }),
        [accessToken]
      );
    const getPastEvents = useCallback(async() => {
        const pastEvents = await axios.get(`${api_server_url}/api/user/past-events`,{
            headers
        });
        setPastEvents(pastEvents.data.data.pastEvents);
    },[headers]);  
    
    useEffect(() => {
        if (accessToken) {
          getPastEvents();
        }
      }, [accessToken, getPastEvents]);

    return(
        <>{console.log(pastEvents)}
            <ScrollToTop />
            <div className="my__container">
                <div className="past-evnts__top">
                    Tell us how was it going?
                </div>
                <div className="list__events-items">
                    {pastEvents  ?
                        pastEvents.map(event => 
                            <EventResultItem 
                                className="list__events-item past-event"
                                key={event.event.id}
                                id={event.event.id}
                                name={event.event.name}
                                description={event.event.description}
                                category={event.event.categories[0].category}
                                datetime={event.event.datetime}
                                location={event.event.location}
                                cover={event.event.cover}
                                price={event.event.price}
                                owner_id={event.user.id}
                                owner_first_name={event.user.first_name}
                            />
                        )
                    :<p>You haven't got past events or the lasted more then month ago</p>
                    }
                </div>
            </div>
        </>
    )
}

export default PastEvents;