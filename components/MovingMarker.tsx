import React, { useEffect, useState } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import Image from 'next/image'

interface Marker {
    id?: string;
    name?: string;
    position: {
        lat: number;
        lng: number;
    };

}

interface MovingProps {
    markers: Marker[]
}

export const MovingMarker = ({markers}:MovingProps) => {

    const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
    const [position, setPosition] = useState<google.maps.LatLngLiteral>(markers[0].position);
    const [rotationAngle, setRotationAngle] = useState(0);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentMarker = markers[currentMarkerIndex];
            const nextMarkerIndex = (currentMarkerIndex + 1) % markers.length;
            const nextMarker = markers[nextMarkerIndex];
      
            const distance = Math.sqrt(
              Math.pow(nextMarker.position.lat - position.lat, 2) +
              Math.pow(nextMarker.position.lng - position.lng, 2)
            );
      
            const step = 0.01; // Adjust the step size for smoother/faster movement
            const progress = step / distance;
      
            const lat = position.lat + (nextMarker.position.lat - position.lat) * progress;
            const lng = position.lng + (nextMarker.position.lng - position.lng) * progress;
      
            setPosition({ lat, lng });
      
            if (progress >= 1) {
              // Move to the next marker once progress is equal to or greater than 1
              setCurrentMarkerIndex(nextMarkerIndex);
            }

            // Calculate rotation angle
            const angleRad = Math.atan2(nextMarker.position.lng - currentMarker.position.lng, 
                                        nextMarker.position.lat - currentMarker.position.lat);
            let angleDeg = ((angleRad * 180) / Math.PI) + 90;

            // Determine whether to flip based on the angle
            const shouldFlip = angleDeg > 90 || angleDeg < -90;
            setFlip(shouldFlip);

            // Offset by 90 degrees to make the front of the car point towards the next location
            const roundedAngle = Math.round(angleDeg);
            setRotationAngle(roundedAngle);
          }, 200);

        return () => clearInterval(interval);
    }, [currentMarkerIndex, markers, position]);

    return (
        <AdvancedMarker
            position={position}
            title={"Route"}>
                <div className="relative" 
                    style={{
                        transform: `rotate(${rotationAngle}deg)${flip ? ' scaleY(-1)' : ''}`,
                    }}>
                    <Image 
                        src="/car.png" 
                        width="50"
                        height="50"
                        alt="car-chan"
                        className={`w-auto h-auto`}
                    />
                </div>

        </AdvancedMarker>
    );
};