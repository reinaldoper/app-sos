interface maps {
  latitude: number,
  longitude: number
}

export const mapsLink = ({ latitude, longitude }: maps) => {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  return mapsLink;

}