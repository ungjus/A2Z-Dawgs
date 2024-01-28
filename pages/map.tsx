'use client'
import React, { useEffect, useState } from 'react';
import InfoMarker from '../components/InfoMarker';
import Switch from 'react-switch'
React.useLayoutEffect = React.useEffect 

import {APIProvider, Map, useApiIsLoaded} from '@vis.gl/react-google-maps';
import { MovingMarker } from '../components/MovingMarker';

const MapPage = (): JSX.Element => {
    const [isMounted, setIsMounted] = useState(false);
    const [showMovingMarker, setShowMovingMarker] = useState(true);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    const handleToggleSwitch = () => {
        setShowMovingMarker((prev) => !prev);
    };

    const markers = [
        { id: "A", position: { lat: 47.617140, lng: -122.202020 }, name: "Auntie Anne's" },
        { id: "B", position: { lat: 47.624699, lng: -122.201714 }, name: "Boiling Point" },
        { id: "C", position: { lat: 47.536910, lng: -122.036020 }, name: "Coconut Thai" },
        { id: "D", position: { lat: 47.637107, lng: -121.832770 }, name: "Test" },
    ];

    const mapCenter = () => { 
        // Calculate average latitude and longitude
        const avgLat = markers.reduce((sum, marker) => sum + marker.position.lat, 0) / markers.length;
        const avgLng = markers.reduce((sum, marker) => sum + marker.position.lng, 0) / markers.length;
        return { lat: avgLat, lng: avgLng };
    };


    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className="flex items-center justify-center mt-8">
                {isMounted ?(
                    <div>
                        <div className="mb-4">
                            <label className='flex flex-row'>
                                <span className='text-center mr-2'>Show Moving Marker: </span>
                                <Switch 
                                    onChange={handleToggleSwitch} 
                                    checked={showMovingMarker}
                                    onColor="#86d3ff" 
                                    onHandleColor="#2693e6" 
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={20}
                                    width={48}/>
                            </label>
                        </div>
                        <Map
                            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
                            center={mapCenter()}
                            zoom={10}
                            className="w-96 h-96"
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                        >
                        {markers.map(({ id, name, position }) => (
                            <InfoMarker key={id} id={id} name={name} position={position} />
                        ))}
                        {showMovingMarker && <MovingMarker markers={markers}/>}
                        </Map>
                    </div>
                ) : (
                <div>Loading...</div>
                )}
            </div>
        </APIProvider>
    );
}
export default MapPage;

// const MapPage = (): JSX.Element => {

//     const { isLoaded } = useLoadScript({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     });

//     if (!isLoaded) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div className="flex justify-center align-center">
//             <Map/>
//         </div>
//     );
//     };

// export default MapPage;

// const Map = (): JSX.Element => {
//     const [activeMarker, setActiveMarker] = useState(null);

//     const handleActiveMarker = (marker) => {
//         if (marker === activeMarker) {
//           return;
//         }
//         setActiveMarker(marker);
//     };

//     const handleOnLoad = (map) => {
//         const bounds = new google.maps.LatLngBounds();
//         markers.forEach(({ position }) => bounds.extend(position));
//         map.fitBounds(bounds);
//     };

//     const mapCenter = useMemo(
//         () => ({ lat: 47.573982, lng: -122.180412 }),
//         []
//     );
    
//     const mapOptions = useMemo<google.maps.MapOptions>(
//         () => ({
//             disableDefaultUI: false,
//             clickableIcons: true,
//             scrollwheel: true,
//         }),
//         []
//     );

//     const customMarkerIcon = {
//         url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=A|FF0000|000000`,
//         labelOrigin: new window.google.maps.Point(16, 10),
//         scaledSize: new window.google.maps.Size(32, 32),
//       };

//     const markers = [
//         { id: 1, position: { lat: 47.617140, lng: -122.202020 }, name: "Auntie Anne's" },
//         { id: 2, position: { lat: 47.624699, lng: -122.201714 }, name: "Boiling Point" },
//         { id: 3, position: { lat: 47.536910, lng: -122.036020 }, name: "Coconut Thai" },
//         // Add more markers as needed
//     ];
    
//     return (
//         <GoogleMap
//             options={mapOptions}
            
//             // center={mapCenter}
//             onLoad={handleOnLoad}
//             onClick={() => setActiveMarker(null)}
//             mapContainerStyle={{ width: '500px', height: '500px' }}>
//            {markers.map(({ id, name, position }) => (
//                 <Marker
//                 key={id}
//                 position={position}
//                 onClick={() => handleActiveMarker(id)}
//                 title={name}
//                 //icon={customMarkerIcon}
//                 >
//                 {activeMarker === id ? (
//                     <InfoWindow onCloseClick={() => setActiveMarker(null)}>
//                     <div>{name}</div>
//                     </InfoWindow>
//                 ) : null}
//                 </Marker>
//             ))}
//         </GoogleMap>
//       );

//   }