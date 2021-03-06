import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';

import { getSourceLI } from '../../utils/utilities';
import './MapWrapper.css';

const MapWrapper = ({ mapdata, zoom }) => {
  const mapCenter = [38, -95];
  const markerItems = mapdata.map((markerItemData) => {
    const {
      lat,
      lon,
      id,
      reporttype,
      groupsharassed,
      locationname,
      sourceurl,
      validsourceurl,
      waybackurl,
      validwaybackurl,
    } = markerItemData;
    const markerCenter = [Number(lat), Number(lon)];
    const color = markerItemData.color || 'blue';
    const source = getSourceLI(sourceurl, validsourceurl, waybackurl, validwaybackurl);

    return (
      <CircleMarker color={color} key={id} center={markerCenter} radius={2}>
        <Popup>
          <div>
            <h3>{reporttype}</h3>
            <ul>
              <li>{groupsharassed}</li>
              <li>{locationname}</li>
              {source}
            </ul>
          </div>
        </Popup>
      </CircleMarker>
    );
  });

  return (
    <Map id="MapWrapper" center={mapCenter} zoom={zoom}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      {markerItems}
    </Map>
  );
};

MapWrapper.propTypes = {
  mapdata: PropTypes.arrayOf(PropTypes.object).isRequired,
  zoom: PropTypes.number.isRequired,
};

export default MapWrapper;
