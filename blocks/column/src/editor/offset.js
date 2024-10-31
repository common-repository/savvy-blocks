import { useContext } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import { Settings } from '/components/context';
import { ShowClassList } from '/components/editor'

const Offset = (props) => {
    const OFFSETS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const {
        value: offset,
        onChange,
        maxSpace,
        tabName,
        nullable = true
    } = props;

    const { settings } = useContext( Settings)

       if ( !offset ) {
        const initOffset = settings?.breakpoints.reduce(
            (obj, item) => {
                obj[item] = nullable ? '' : '0';
                return obj;
            }, {
                '_': nullable ? '' : '0'
            }
        );
        onChange(initOffset);
    }

    return (
        <>
            <SelectControl
                value={ offset && offset[tabName] }
                options={
                    [
                        { label: '-', value: '' },
                        ...OFFSETS.map((offset) => {
                            return {label: `offset-${offset}`, value: offset}
                        })
                    ]
                }
                onChange={ (value) => onChange({ ...offset, [tabName]: value })}
            />
            <ShowClassList
                attr = { offset }
                classGenerator  = { offsetClassGenerator }
            />
        </>
    )
}

const offsetClassGenerator = (offset) => {
    const classList = [];
    for ( const breakpoint in offset ) {

        const offsetValue = offset[breakpoint];
        const breakpointCss = breakpoint !== '_' ? `${ breakpoint }-` : '';

        if(offsetValue){
            classList.push(`offset-${ breakpointCss }${ offsetValue }`);
        }
    }
    return classList.join(' ');
}

export {
    Offset as default,
    offsetClassGenerator
};

