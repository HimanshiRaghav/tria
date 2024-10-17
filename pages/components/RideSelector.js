import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import { carList } from '../../data/carList';

function RideSelector({ pickupCoordinates, dropoffCoordinates }) {
    const [rideDuration, setRideDuration] = useState(0);

    useEffect(() => {
        // Ensure coordinates are available before calculating duration
        if (pickupCoordinates && dropoffCoordinates) {
            // Here you could calculate a mock duration based on distance, for example
            const distance = calculateDistance(pickupCoordinates, dropoffCoordinates);
            const estimatedDuration = distance / 50; // Assuming an average speed of 50 km/h
            setRideDuration(estimatedDuration); // Setting duration in hours
        }
    }, [pickupCoordinates, dropoffCoordinates]);

    const calculateDistance = (coords1, coords2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (coords2[1] - coords1[1]) * (Math.PI / 180);
        const dLon = (coords2[0] - coords1[0]) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coords1[1] * (Math.PI / 180)) * Math.cos(coords2[1] * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    return (
        <Wrapper>
            <Title>Choose a ride, or swipe up for more</Title>
            <CarList>
                {carList.map((car, index) => (
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <CarDetails>
                            <Service>{car.service}</Service>
                            <Time>{rideDuration ? `${Math.ceil(rideDuration)} min away` : 'Calculating...'}</Time>
                        </CarDetails>
                        <Price>${(rideDuration * car.multiplier).toFixed(2)}</Price>
                    </Car>
                ))}
            </CarList>
        </Wrapper>
    );
};

export default RideSelector;

const Wrapper = tw.div`
    flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
    text-gray-500 text-center text-xs py-2 border-b
`;

const CarList = tw.div`
    overflow-y-scroll
`;

const Car = tw.div`
    flex p-4 items-center
`;

const CarImage = tw.img`
    h-14 mr-4
`;

const CarDetails = tw.div`
    flex-1
`;

const Service = tw.div`
    font-medium
`;

const Time = tw.div`
    text-xs text-blue-500
`;

const Price = tw.div`
    text-sm
`;
