export const getUserCountry = async (coordinates: {
  lat?: string;
  lng?: string;
}): Promise<{ country_code: string; country: string }> => {
  const url = new URL(`https://nominatim.openstreetmap.org/reverse`);
  const params = {
    format: 'json',
    'accept-language': 'en',
    lat: coordinates.lat,
    lon: coordinates.lng,
  };

  try {
    url.search = new URLSearchParams(params as any).toString();
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Nominatim Error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      country_code: data.address.country_code,
      country: data.address.country,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
