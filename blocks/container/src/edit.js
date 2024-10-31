import { __ } from '@wordpress/i18n'
import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import Inspector from './inspector';

const Edit = ( props ) => {
    const {
        attributes: {
            background,
            containerType,
            textColor,
        },
    } = props;

    const blockProps = useBlockProps({
        className: [
            'savvy-container',
            ...( background?.color ? [ `bg-${ background?.color }` ] : [] ),
            ...( containerType ? [ containerType ] : [ 'container' ] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( background?.overlay ? ['has-overlay'] : [] )
        ].join(' '),
        style: {
            backgroundImage: background?.image?.url ? `url(${ background?.image?.url })` : null,
            backgroundSize: background?.backgroundProperties?.size || null,
            backgroundRepeat: background?.backgroundProperties?.repeat || null,
            backgroundPosition: background?.backgroundProperties?.position || null,
        }
    });

    const overlayClassName = [
        'savvy-background-overlay',
        ...( background?.overlay?.color ? [ `bg-${ background?.overlay?.color }` ] : [] ),
        ...( background?.overlay?.opacity !== undefined ? [ `opacity-${ background?.overlay?.opacity }` ] : [])
    ].join( ' ' );


    return (
        <>
            <Inspector { ...props }/>
            <div { ...blockProps }>
                {
                    background?.overlay ? (
                        <span className={ overlayClassName } style = { { backgroundImage: background?.overlay?.gradient } } />
                    ) : (
                        ''
                    )
                }
                <InnerBlocks
                    templateInsertUpdatesSelection={ true }
                />
            </div>
        </>
    )
}

export default Edit
