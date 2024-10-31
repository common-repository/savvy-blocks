import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import ImageSelector from "./image-selector";

const Cursor = (props) => {
    const {
        value: cursor,
        onChange,
    } = props;

    return (
        <>
            <SelectControl
                value={cursor?.value}
                options={
                    [
                        { label: '-', value: '' },
                        { label: 'custom', value: 'custom' },
                        { label: 'alias', value: 'alias' },
                        { label: 'auto', value: 'auto' },
                        { label: 'cell', value: 'cell' },
                        { label: 'col-resize', value: 'col-resize' },
                        { label: 'context-menu', value: 'context-menu' },
                        { label: 'copy', value: 'copy' },
                        { label: 'crosshair', value: 'crosshair' },
                        { label: 'default', value: 'default' },
                        { label: 'e-resize', value: 'e-resize' },
                        { label: 'ew-resize', value: 'ew-resize' },
                        { label: 'grab', value: 'grab' },
                        { label: 'grabbing', value: 'grabbing' },
                        { label: 'help', value: 'help' },
                        { label: 'move', value: 'move' },
                        { label: 'n-resize', value: 'n-resize' },
                        { label: 'ne-resize', value: 'ne-resize' },
                        { label: 'nesw-resize', value: 'nesw-resize' },
                        { label: 'ns-resize', value: 'ns-resize' },
                        { label: 'nw-resize', value: 'nw-resize' },
                        { label: 'nwse-resize', value: 'nwse-resize' },
                        { label: 'no-drop', value: 'no-drop' },
                        { label: 'none', value: 'none' },
                        { label: 'not-allowed', value: 'not-allowed' },
                        { label: 'pointer', value: 'pointer' },
                        { label: 'row-resize', value: 'row-resize' },
                        { label: 's-resize', value: 's-resize' },
                        { label: 'se-resize', value: 'se-resize' },
                        { label: 'sw-resize', value: 'sw-resize' },
                        { label: 'text', value: 'text' },
                        { label: 'w-resize', value: 'w-resize' },
                        { label: 'wait', value: 'wait' },
                        { label: 'zoom-in', value: 'zoom-in' },
                        { label: 'zoom-out', value: 'zoom-out' },
                    ]
                }
                onChange={(value) => {
                    onChange({
                        cursor: {
                            value,
                            image: {
                                id: cursor?.imageId || null,
                                url: cursor?.imageUrl || null,
                            },
                        },
                    });
                }}
            />

            {cursor?.value === 'custom' &&
                <>
                <ImageSelector
                    image={{ id: cursor?.image?.id, url: cursor?.image?.url }}
                    onSelectImage={(media) => {
                        onChange({
                            cursor: {
                                value: 'custom',
                                image: {
                                    id: media?.id,
                                    url: media?.url,
                                },
                            },
                        });
                    }}
                />
                <p style={{color:'red',margin:'20px 0 0'}}>Make sure image is less than 120 px</p>
                </>
            }
        </>
    )
}

export {
    Cursor as default,
};
