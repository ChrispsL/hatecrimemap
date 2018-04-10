import ghFilters from './ghFilters';
import { arrToObject } from './utilities';

const filteringOptions = arrToObject(ghFilters);
const currentLayers = new Set();
const storedLayers = {};

// function printUnique(mapdata) {
//   const gh = mapdata.map(group => group.groupharassedcleaned);
//   const ghDelimited = gh
//     .map(group => group.split(','))
//     .reduce((acc, val) => acc.concat(val), []);
//   const noDupes = Array.from(new Set(ghDelimited));
// }

export function storeMapData(name, mapdata) {
  if (!storedLayers[name]) {
    storedLayers[name] = mapdata;
  }
}

function updateCurrentLayers(layerName) {
  if (currentLayers.has(layerName)) {
    currentLayers.delete(layerName);
  } else {
    currentLayers.add(layerName);
  }
}

export function getMapData(layerName) {
  updateCurrentLayers(layerName);
  if (currentLayers.size === 0) {
    return storedLayers.allpoints;
  }
  let mapdata = storedLayers.allpoints;
  currentLayers.forEach((layer) => {
    const { customFilter, color } = filteringOptions[layer];
    let filteredData = mapdata.filter(point => customFilter(point));
    filteredData = (currentLayers.size < 2)
      ? filteredData.map(point => Object.assign({ color }, point))
      : filteredData.map(point => Object.assign({ color: '#000000' }, point));
    mapdata = filteredData;
  });
  return mapdata;
}

export function splitGroupsHarassed(mapdata) {
  mapdata.forEach(point => point.groupharassedsplit = point.groupharassedcleaned.split(','));
}
