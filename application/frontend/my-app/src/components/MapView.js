import React from 'react';
import { GoogleMap, LoadScript, Marker, KmlLayer, Data } from '@react-google-maps/api';
import mapData from '../CAcounties.json';
import mapTheme from './mapTheme.json';
 
const containerStyle = {
    width: '100%',
    height: '100%',
    float: 'right',
};

const center = {
    lat: 37.7749,
    lng: -122.4194
};

const countyStyle = {
    strokeWeight: 1,
    fillOpacity: 0,
    strokeColor: '#7a7a7a'
}

const hoverStyle = {
    strokeWeight: 2,
    fillOpacity: 0.1,
    strokeColor: '#00FF55',
    fillColor: '#00FF55',
    zIndex: 2
}
   
const MapView = ({mapsSecret, filterFunction, m, setSelected}) => {
    const [map, setMap] = React.useState(null);
 
const onLoad = React.useCallback(function callback(map) {
    //const bounds = new window.google.maps.LatLngBounds();
    //map.fitBounds(bounds);
    setMap(map)
}, [])
   
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    const onMapLoad = (map) => {
        console.log('map.data: ', map.data)
        map.data.addGeoJson(mapData);
        map.data.setStyle(countyStyle);

        map.data.addListener('mouseover', (event) => {
            map.data.revertStyle();
            // Adds Style when hovered over
            map.data.overrideStyle(event.feature, hoverStyle);
            // Name is logged when hovered over
            console.log(event.feature.j.NAME)
        });
        map.data.addListener('mouseout', (event) => {
            // reverts style
            map.data.revertStyle();
        });
        map.data.addListener('click', (event) => {
            // On Click
            setSelected(event.feature.j.NAME);
        });
        
        //setMap(map)
    }
    
    const onDataLoad = data => {
        console.log('data: ', data)
    }

    const dataOptions = {
        featureFactory: (geometry) => {
            console.log('geometry: ', geometry)
        },
        zIndex: 2
    }

    return(
        
        <LoadScript
            googleMapsApiKey={mapsSecret}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                options={
                    {
                        styles: mapTheme
                    }
                }
                onLoad={onMapLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <Data
                onLoad={onDataLoad}
                options={dataOptions}
                />
                <></>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapView;

//mapContainerStyle={containerStyle}