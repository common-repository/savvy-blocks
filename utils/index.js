
export function checkEmpty(obj) {

    for(let key in obj) {

        if( obj[key] instanceof Object === true ) { //if the value is 'object'

            if( checkEmpty(obj[key]) === false ) return false;
        } else { //if value is string/number

            if( obj[key].length !== 0 ) return false; //if array or string have length is not 0.
        }
    }
    return true;
}

export const mergeArrOfObj = (...arrays) => {
    const merged = {};
    
    arrays.forEach(data =>
        data.forEach(o => Object.assign(merged[o.name] ??= {}, o))
    );
    
    return Object.values(merged);
}
