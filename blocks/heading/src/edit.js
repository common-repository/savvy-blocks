import { __ } from '@wordpress/i18n'
import {
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';

import { createBlock } from '@wordpress/blocks';

import { useOnEnter } from '/hooks/use-inter';
import { useDefault } from '/utils/settings';
import {
    animationClassGenerator,
    animationStyleGenerator,
    Controls,
    effectClassGenerator,
    effectStyleGenerator,
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator,
} from '/components/editor';

import Inspector from './inspector';

const name = 'savvy-blocks/heading';

const Edit = ( props ) => {
    const {
        attributes: {
            animation,
            effects,
            blockType,
            headingText,
            headingType,
            margin,
            padding,
            textAlign,
            textColor,
        },
        attributes,
        onReplace,
        onRemove,
        setAttributes,
        clientId
    } = props;

    useDefault(clientId, setAttributes)

    const blockProps = useBlockProps({
        ref: useOnEnter( { clientId, content: headingText } ),
        className: [
            'savvy-heading',
            ...( headingType ? [ `savvy-heading-${ headingType }` ] : [] ),
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
            ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( animation? [ animationClassGenerator( animation ) ] : [] ),
            ...( effects? [ effectClassGenerator( effects ) ] : [] )
        ].join(' '),
        style: {
            ...(animation && animationStyleGenerator(animation)),
            ...(effects && effectStyleGenerator(effects))
        }
    });

    return (
        <>
            <Inspector { ...props } />
            <Controls  name = {props.name} setAttributes={ setAttributes } attributes={(({headingText, headingType, blockType, ...others}) => ({...others}))(attributes)} />
            <div { ...blockProps }>
                <RichText
                    className='heading-text'
                    tagName={ headingType ? headingType : 'h2' }
                    value={ headingText }
                    onChange={ ( headingText ) => setAttributes( { headingText } ) }
                    placeholder={ __( 'Type...' ) }
                    onSplit={ ( value, isOriginal ) => {
                        let newAttributes;

                        if ( isOriginal || value ) {
                            newAttributes = {
                                ...attributes,
                                headingText: value,
                            };
                        }

                        const block = createBlock( name, newAttributes );

                        if ( isOriginal ) {
                            block.clientId = clientId;
                        }

                        return block;
                    }}
                    onReplace={ onReplace }
                    onRemove={ onRemove }
                />
            </div>
        </>
    )
}

export default Edit;
