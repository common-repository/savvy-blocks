import { __ } from '@wordpress/i18n';
import {
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import { useOnEnter } from '/hooks/use-inter';
import { useDefault } from '/utils/settings';
import {
    effectClassGenerator,
    effectStyleGenerator,
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator
} from '/components/editor';

import Inspector from './inspector';

const name = 'savvy-blocks/paragraph';

const Edit = ( props ) => {
    const {
        attributes: {
            effects,
            margin,
            padding,
            text,
            textAlign,
            textColor
        },
        attributes,
        onReplace,
        onRemove,
        setAttributes,
        clientId
    } = props;

    useDefault(clientId, setAttributes)
    const blockProps = useBlockProps({
        ref: useOnEnter( { clientId, content: text } ),
        className: [
            'savvy-paragraph',
            ...( effects? [ effectClassGenerator( effects ) ] : [] ),
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
            ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] )
        ].join(' '),
        style: {
            ...(effects && effectStyleGenerator(effects))
        }
    });

    return (
        <>
            <Inspector { ...props } />
            <div { ...blockProps }>
                <RichText
                    tagName='p'
                    value={ text }
                    onChange={ ( newContent ) =>
                        setAttributes({ text: newContent })
                    }
                    onSplit={ ( value, isOriginal ) => {
                        let newAttributes;

                        if ( isOriginal || value ) {
                            newAttributes = {
                                ...attributes,
                                text: value,
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
    );
}

export default Edit;
