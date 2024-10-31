import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';

const Flex = (props) => {
    const DIRECTION = ['row', 'column', 'row-reverse', 'column-reverse'];
    const ALIGN_ITEMS = ['start', 'end', 'center', 'baseline', 'stretch'];
    const JUSTIFY_CONTENT = ['start', 'end', 'center', 'between', 'around', 'evenly'];

    const {
        value: flex,
        onChange,
        flexSettings
    } = props;

    const flexItems = [
        ...(flexSettings.includes('direction') ? [{ label: __( 'Direction' ), flexItem: 'direction', values: DIRECTION }] : []),
        ...(flexSettings.includes('align-items') ? [{ label: __( 'Align Items' ), flexItem: 'align-items', values: ALIGN_ITEMS }] : []),
        ...(flexSettings.includes('justify-content') ? [{ label: __( 'Justify Content' ), flexItem: 'justify-content', values: JUSTIFY_CONTENT }] : []),
    ];

    return (
        <>
            {
                flexItems.map(({ label, flexItem, values }) => {
                    return(
                        <SelectControl
                            label={ label }
                            value={ flex && flex[flexItem] }
                            options={
                                [
                                    { label: '-', value: '' },
                                    ...values.map((space) => {
                                        return { label: `${ space }`, value: space }
                                    })
                                ]
                            }
                            onChange={ ( value ) => { onChange({ [flexItem]: value }) } }
                        />
                    )
                })
            }
        </>
    )
}

export default Flex;