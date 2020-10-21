import React from 'react';
import { GoogleMap, LoadScript, Marker, KmlLayer } from '@react-google-maps/api';
import Logo from '../SFSU_Logo.svg';
 
const containerStyle = {
    width: '100%',
    height: '200px'
};

const center = {
    lat: 37.7749,
    lng: -122.4194
};
   
const MapView = ({mapsSecret}) => {
    const [map, setMap] = React.useState(null)
 
    const onLoad = React.useCallback(function callback(map) {
      //const bounds = new window.google.maps.LatLngBounds();
      //map.fitBounds(bounds);
      setMap(map)
    }, [])
   
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    return(
        
        <LoadScript
            googleMapsApiKey={mapsSecret}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <Marker
                    position={{lat: 37.724146, lng: -122.479947}}
                    icon={Logo}
                />
                <KmlLayer url="https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml" />
                <></>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapView;