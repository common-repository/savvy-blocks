import { __ } from '@wordpress/i18n'
import { useContext } from '@wordpress/element';
import { TabPanel } from '@wordpress/components';

import { Settings } from '/components/context';

const DisplayTypeTabs = (props) => {   
    
    const { children } = props;

    const attr  = children?.props.value;

    const { settings } = useContext( Settings )

    const bks = settings?.breakpoints.reduce(
        (obj, item) => {
            obj[item] = attr && attr[item] && isModified( attr?.[item])
            return obj;
        }, {
            '_': attr && attr['_'] && isModified( attr?.['_'])
        }
    );

    const tabs = [
        { name: '_', title: 'None', className:`${ bks?.['_'] ? 'is-modified' : '' }` },
        ...( settings ? settings?.breakpoints.map(( breakpoint ) => {
            return {
                name: breakpoint, 
                title: breakpoint, 
                className:`${ bks?.[ breakpoint ] ? 'is-modified' : '' }`}
        }) : [])
    ];
    
    return (
        <TabPanel
            className='display-type-tabs'
            activeClass="active-tab"
            initialTabName="_"
            tabs={ tabs }
        >
        { ( tab ) => (
            <>
            {(() => {
                    return (
                    <div >
                    { React.Children.map(props.children, child => {
                        return React.cloneElement( child, { tabName : tab.name }, null )
                    }) }
                    </div>
                )
            })()}
            </>
        )}
    </TabPanel>
    )
}

export default DisplayTypeTabs;

function isModified(object) {
    return !Object.values(object).every(el => el === '')
}