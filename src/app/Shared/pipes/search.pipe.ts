import { Pipe, PipeTransform } from '@angular/core';
import { Users } from '../interface/users';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(userlist:Users[],searchTerm:string): Users[] {
    if(!userlist) return [];
    if(!searchTerm) return userlist;
    searchTerm=searchTerm.toLowerCase();
    return userlist.filter(user=>user.firstName.toLowerCase().includes(searchTerm));
  }

}
