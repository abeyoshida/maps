/// <reference types="@types/google.maps" />
declare global {
  interface Window {
    initMap: () => void;
  }
}
export{};

import { User } from './User';
import { Company } from './Company';
import { CustomMap } from './CustomMap';

const user = new User();
const company = new Company();
const customMap = new CustomMap('map');
// customMap.addMarker(user);

console.log(user);
console.log(company);



