import { __ } from '@wordpress/i18n'
import { TabPanel } from '@wordpress/components';
import { checkEmpty } from '../../utils';

const StateTabs = (props) => {   
    
    const { children } = props;
    const attr  = children?.props.value;

    const STATES = ['hover']

    const states = STATES.reduce(
        (obj, item) => {
            obj[item] = attr && attr[item] && isModified( attr?.[item])
            return obj;
        }, {
            '_': attr && attr['_'] && isModified( attr?.['_'])
        }
    );

    const tabs = [
        { name: '_', title: 'Default', className:`${ states?.['_'] && checkEmpty(states?.['_']) ? 'is-modified' : '' }` },
        ...( STATES ? STATES.map(( st ) => {
            return {
                name: st, 
                title: st, 
                className:`${ states?.[ st ] && checkEmpty(states?.[st]) ? 'is-modified' : '' }`}
        }) : [])
    ];
    
    return (
        <TabPanel
            className='editor-tabs'
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
                        return React.cloneElement( child, { tabStateName : tab.name }, null )
                    }) }
                    </div>
                )
            })()}
            </>
        )}
    </TabPanel>
    )
}

export default StateTabs;

function isModified(object) {
    return !Object.values(object).every(el => el === '')
}