import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

/** 
 * By convention Typescript does not use a default export. 
 * Importing then by this convention will always use curly braces.
 * By defining User as an implementation of Mappable we get help from
 * Typescript if this is not implemented correctly.
*/
export class User implements Mappable {
  name: string;
  location: {
    lat: number,
    lng: number
  };
  color: string = 'red';
/**
 * The location property of User defines an object that holds an object with 
 * lat and lng properties. When initializing location we need to explicitly 
 * assign an object and initialize the properties within it. We also need to
 * convert the type from faker since it returns strings for latitude and longitude.
 */
  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}