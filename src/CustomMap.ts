/// <reference types="@types/google.maps" />
declare global {
  interface Window {
    initMap: () => void;
  }
}
export{};

import { User } from './User';
import { Company } from './Company';

/**
 * Any class that wants to add a marker to any google map
 * must satisfy the Mappable interface.  Any argument to 
 * addMarker() must contain the properties that are defined in Mappable.
 */
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  color: string;
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;
  divId: string;
  user: User;
  company: Company;

  constructor(divId: string) {
    this.divId = divId;
    this.user = new User();
    this.company = new Company();
    window.initMap = this.initMap;
  }

  /**
   * Bind initMap() to class with arrow function.
   */
  initMap = () => {
    this.googleMap = new google.maps.Map(document.getElementById(this.divId) as HTMLElement, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
    // this.addUserMarker(this.user);
    // this.addCompanyMarker(this.company);
    this.addMarker(this.user);
    this.addMarker(this.company);
  }

  addMarker = (mappable: Mappable) => {
    // this.googleMarker = new google.maps.Marker({
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });
  }

  // addUserMarker = (user: User): void => {
  //   this.googleMarker = new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: this.user.location.lat,
  //       lng: this.user.location.lng

  //     }
  //   });
  // }

  // addCompanyMarker(company: Company): void {
  //   this.googleMarker = new google.maps.Marker({
  //     map: this.googleMap,
  //     position: {
  //       lat: this.company.location.lat,
  //       lng: this.company.location.lng
  //     }
  //   });
  // }
}