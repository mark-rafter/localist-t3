/*
MIT License

Copyright (c) 2020 diamentowybazant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

interface Coordinates {
  lat: number;
  long: number;
}

/**
 * List of all supported units.
 *
 * m - metre
 * M - mile
 * km - kilometre
 * ft - foot
 */
const SUPPORTED_UNIT = {
  m: "m",
  M: "M",
  km: "km",
  ft: "ft",
};

/**
 * Earth radius = 6 371 km.
 */
const R = 6371e3;

/**
 * Degrees to radians.
 */
const degToRad = (deg: number): number => deg * (Math.PI / 180);

/**
 * Calculate the distance between two coordinates to metres.
 */
const calculateDistance = (
  coordinates1: Coordinates,
  coordinates2: Coordinates
): number => {
  if (
    coordinates1.lat === coordinates2.lat &&
    coordinates1.long === coordinates2.long
  ) {
    return 0;
  }

  const a =
    Math.pow(Math.sin(degToRad(coordinates2.lat - coordinates1.lat) / 2), 2) +
    Math.cos(degToRad(coordinates1.lat)) *
      Math.cos(degToRad(coordinates2.lat)) *
      Math.pow(
        Math.sin(degToRad(coordinates2.long - coordinates1.long) / 2),
        2
      );
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Calculate the distance between two coordinates to the given unit.
 * Default unit is mile.
 */
export const calculate = (
  coordinates1: Coordinates,
  coordinates2: Coordinates,
  unit: string = SUPPORTED_UNIT.M
): number => {
  const m = calculateDistance(coordinates1, coordinates2);
  switch (unit) {
    case SUPPORTED_UNIT.km:
      return Math.round(m * 0.001);
    case SUPPORTED_UNIT.M:
      return Math.round(m * 0.000621371192);
    case SUPPORTED_UNIT.ft:
      return Math.round(m * 3.2808399);
    default:
      return Math.round(m);
  }
};
