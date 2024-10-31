import { __ } from '@wordpress/i18n';
import {
    ToggleControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

import { DisplayTypeTabs } from '/components/editor';
import { ColumnsLayout } from '../editor';

export const COLUMNS_OPTIONS = [
    { label: '12/12', value: 12, svg : <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule="evenodd" clipRule="evenodd" d="M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 14 V23 H9 V14 H39 M39 25 V34 H9 V25 Z" /></svg> },
    { label: '1/11', value: 1, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H14 V34 H39 Z M18 34 H9 V14 H12 V34 Z'/></svg> },
    { label: '2/10', value: 2, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H16 V34 H39 Z M18 34 H9 V14 H14 V34 Z'/></svg> },
    { label: '3/9', value: 3, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H18 V34 H39 Z M18 34 H9 V14 H16 V34 Z'/></svg> },
    { label: '4/8', value: 4, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H20 V34 H39 Z M18 34 H9 V14 H18 V34 Z'/></svg> },
    { label: '5/7', value: 5, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H22 V34 H39 Z M18 34 H9 V14 H20 V34 Z'/></svg> },
    { label: '6/6', value: 6, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H25 V34 H39 Z M23 34 H9 V14 H23 V34 Z'/></svg>},
    { label: '7/5', value: 7, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H28 V34 H39 Z M18 34 H9 V14 H26 V34 Z'/></svg> },
    { label: '8/4', value: 8, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H30 V34 H39 Z M28 34 H9 V14 H28 V34 Z'/></svg>},
    { label: '9/3', value: 9, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H32 V34 H39 Z M18 34 H9 V14 H30 V34 Z'/></svg> },
    { label: '10/2', value: 10, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H34 V34 H39 Z M18 34 H9 V14 H32 V34 Z'/></svg> },
    { label: '11/1', value: 11, svg: <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M39 12 C40 12 41 13 41 14 V34 C41 35 40 36 39 36 H9 C8 36 7 35 7 34 V14 C7 13 8 12 9 12 H39 Z M39 34 V14 H36 V34 H39 Z M18 34 H9 V14 H34 V34 Z'/></svg> },
];

function GeneralSetting ( props ) {
    const {
        colsLayout,
        reverse,
        setAttributes,
    } = props;

    return (
        <>
            <DisplayTypeTabs>
                <ColumnsLayout
                    columnsLayout={ colsLayout }
                    onChange={ ( value ) => { setAttributes( { colsLayout: value } ) } }
                />
            </DisplayTypeTabs>
            <Divider />
            <ToggleControl
                label={ __( 'Reverse', 'savvy-blocks' ) }
                checked={ reverse }
                onChange={ () => setAttributes({ reverse: !reverse })}
            />
        </>
    )
}


const reverseClassGenerator = (reverse, cols) => {
    const classList = [];

    for (const breakpoint in cols) {
        const breakpointCss = breakpoint !== '_' ? `${breakpoint}-` : ''

        if (cols[breakpoint] === 12) {
            classList.push(`flex-${breakpointCss}column${reverse ? '-reverse' : ''}`)
        } else {
            classList.push(`flex-${breakpointCss}row`)
        }
    }

    return classList.join(' ');
}


export {
    GeneralSetting as default,
    reverseClassGenerator
};

