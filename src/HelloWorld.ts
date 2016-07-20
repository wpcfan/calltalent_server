import { SocialNetwork } from './social_networks';
import * as _ from 'lodash';
import * as Rx from "rxjs";

/**
 * Hello
 */
class Hello implements SocialNetwork {
    title = "Doctor";
    getUsers(){
        const array_ = 
        Rx.Observable.from([1,2,3,4,5,6,7,8,9,10])
            .filter(x=>x%2==0)
            .subscribe(x=>console.log(x));
        return [{name:"Peng"}];
    }
}

console.log(_.isArray(new Hello().getUsers()));