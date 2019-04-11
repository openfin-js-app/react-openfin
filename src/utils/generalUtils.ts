import { ShownField } from '../GlobalTypes';

export function shown<T extends {shown?:ShownField}>(one:T):boolean {
    if ('shown' in one){
        if (typeof one.shown === 'function'){
            return one.shown();
        }else{
            return one.shown;
        }
    }else{
        return true;
    }
}

export function getAllShownItems<T extends {shown?:ShownField}>(items:T[]):T[] {
    return items.filter(shown)

}