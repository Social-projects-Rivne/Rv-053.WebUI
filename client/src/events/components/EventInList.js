import React, {Component} from 'react';
import './eventInList.css'

class EventInList extends Component{
    render(){ 
        const { eventInfo } = this.props;
        return( 
        <div className="cardish">
            <img src={eventInfo.imageSrc} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{eventInfo.name}</h5>
                <p className="card-text">{eventInfo.description}</p>
                <div className="divInline">
                    <p className="card-text">{eventInfo.price} грн </p>
                    <button type="button" className="btn btn-success">Приєднатись</button>
                    
                </div>
                
                <p className="card-text"><small className="text-muted">{eventInfo.location}</small></p>
            </div>
        </div>
                
        )}

};


export default EventInList;