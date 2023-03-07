type Unit = "mile" | "km";

export function humanize(
  from: Coordinates,
  to: Coordinates,
  unit: Unit = "mile"
) {
  const distance = calculate(from, to, unit);
  if (distance == 0) {
    return `less than 1 ${unit}`;
  } else if (distance == 1) {
    return `1 ${unit}`;
  }
  return `${distance} ${unit}s`;
}

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

const EARTH_RADIUS = 6371e3;

const degToRad = (deg: number): number => deg * (Math.PI / 180);

const calculateDistance = (from: Coordinates, to: Coordinates): number => {
  if (from.lat === to.lat && from.long === to.long) {
    return 0;
  }

  const a =
    Math.pow(Math.sin(degToRad(to.lat - from.lat) / 2), 2) +
    Math.cos(degToRad(from.lat)) *
      Math.cos(degToRad(to.lat)) *
      Math.pow(Math.sin(degToRad(to.long - from.long) / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c;
};

export function calculate(
  from: Coordinates,
  to: Coordinates,
  unit: Unit = "mile"
): number {
  const distance = calculateDistance(from, to);
  switch (unit) {
    case "mile":
      return Math.round(distance * 0.000621371192);
    case "km":
      return Math.round(distance * 0.001);
  }
}
