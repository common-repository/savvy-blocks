import { DisplayTypeTabs } from '/components/editor';
import { Col } from '../editor';

function GeneralSetting ( props ) {
    const { 
        col,
        setAttributes,
    } = props;

    return (
        <>
            <DisplayTypeTabs>
                <Col
                    value={ col }
                    onChange={ ( value ) => { setAttributes( { col: value } ) } }
                />
            </DisplayTypeTabs>
        </>
    )
}

export default GeneralSetting;