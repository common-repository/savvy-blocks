import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

const Save = ( props ) => {
    const {
        attributes: {
            background,
            containerType,
            textColor,
        },
    } = props

    const blockProps = useBlockProps.save({
        className: [
            'savvy-container',
            ...( background?.color ? [ `bg-${ background?.color }` ] : [] ),
            ...( containerType ? [ containerType ] : [ 'container' ] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( background?.overlay ? ['has-overlay'] : [] )
        ].join(' '),
        style: {
            backgroundImage: background?.image?.url ? `url(${ background?.image?.url })` : null,
            backgroundRepeat: background?.backgroundProperties?.repeat || null,
            backgroundSize: background?.backgroundProperties?.size || null,
            backgroundPosition: background?.backgroundProperties?.position || null,
        }
    });


    const overlayClassName = [
        'savvy-background-overlay',
        ...( background?.overlay?.color ? [ `bg-${ background?.overlay?.color }` ] : [] ),
        ...( background?.overlay?.opacity !== undefined ? [ `opacity-${ background?.overlay?.opacity }` ] : [])
    ].join( ' ' );




    return (
        <div { ...blockProps }>
            {
                background?.overlay ? (
                    <span className={ overlayClassName } style = { { backgroundImage: background?.overlay?.gradient } } />
                ) : (
                    ''
                )
            }
            <InnerBlocks.Content />
        </div>
    )
}

export default Save
