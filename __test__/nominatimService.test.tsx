import { getUserCountry } from '../src/infrastructure/services/NominatimService';

import { mockedNominatimResponse } from '../__mocks__';

describe('getCountryFromNominativeService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return country code and country', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockedNominatimResponse),
    });

    global.fetch = mockFetch;

    const result = await getUserCountry({
      lat: '45',
      lng: '45',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://nominatim.openstreetmap.org/reverse?format=json&accept-language=en&lat=45&lon=45',
    );

    expect(result).toEqual({ country: 'Russia', country_code: 'ru' });
  });
});
