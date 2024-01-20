import React, { useState } from 'react';
import {
    AdvancedMarker,
    InfoWindow,
    Pin,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';

interface MarkerProps {
    id?: string;
    name?: string;
    position?: {
        lat: number;
        lng: number;
    };

}

const InfoMarker = ({ id, name, position }: MarkerProps) => {
    const [infowindowOpen, setInfowindowOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                onClick={() => setInfowindowOpen(!infowindowOpen)}
                position={position}
                title={name}
            >
            <Pin scale={1.2}>
                {id}
            </Pin>
            {infowindowOpen && (
                <InfoWindow
                    anchor={marker}
                    maxWidth={200}
                    onCloseClick={() => setInfowindowOpen(false)}>
                    {name}
                </InfoWindow>
            )}
            </AdvancedMarker>
        </>
    );
};

export default InfoMarker;