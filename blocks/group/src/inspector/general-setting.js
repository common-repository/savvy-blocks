import { DisplayTypeTabs } from '/components/editor';

import { Display } from '../editor/index'

function GeneralSetting ( props ) {
    const { 
        display,
        setAttributes,
    } = props;

    return (
        <>
            <DisplayTypeTabs>
                <Display
                    value={ display }
                    onChange={ setAttributes }
                />
            </DisplayTypeTabs>
        </>
    )
}

export default GeneralSetting;