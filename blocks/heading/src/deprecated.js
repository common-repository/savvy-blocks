import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';
import {
    animationClassGenerator,
    animationStyleGenerator,
    effectClassGenerator,
    effectStyleGenerator,
    marginClassGenerator,
    paddingClassGenerator,
    textAlignClassGenerator,
} from '/components/editor';

// Version 0.7.4 of savvy-blocks | changes: add cursor-image
const v1 = {
    attributes:{
        blockType : {
            type : "string",
            default: "custom"
        },
        headingText: {
            type: "string",
            default: ""
        },
        headingType: {
            type: "string",
            default: "h2"
        },
        padding: {
            type: "object"
        },
        margin: {
            type: "object"
        },
        textAlign: {
            type: "object"
        },
        textColor: {
            type: "string"
        }
    },
    save( props ) {
        const {
            attributes: {
                headingText,
                headingType,
                margin,
                padding,
                textAlign,
                textColor,
            },
        } = props

        const blockProps = useBlockProps.save( {
            className: [
                `savvy-heading`,
                ...( headingType ? [ `savvy-heading-${ headingType }` ] : [] ),
                ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
                ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
                ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] ),
                ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ].join(' '),
        } );

        const HeadingTag = headingType;
        return (
            <HeadingTag { ...blockProps }>
                <RichText.Content value={ headingText } />
            </HeadingTag>
        )
    }
}

const v2 = {
    attributes:{
        blockType : {
            type : "string",
            default: "custom"
        },
        headingText: {
            type: "string",
            default: ""
        },
        headingType: {
            type: "string",
            default: "h2"
        },
        padding: {
            type: "object"
        },
        margin: {
            type: "object"
        },
        cursor: {
            type: "object",
            default: {
                value: "default",
                image: {
                    id : 0,
                    url : ""
                }
            }
        },
        textAlign: {
            type: "object"
        },
        textColor: {
            type: "string"
        }
    },
    save( props ) {
        const {
            attributes: {
                cursor,
                headingText,
                headingType,
                margin,
                padding,
                textAlign,
                textColor,
            },
        } = props

        const blockProps = useBlockProps.save( {
            className: [
                `savvy-heading`,
                ...( headingType ? [ `savvy-heading-${ headingType }` ] : [] ),
                ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
                ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
                ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] ),
                ...( textColor ? [ `text-${ textColor }` ] : [] ),
            ].join(' '),
            style: cursor?.image.url !== null
            ? {
                  '--cursor-image': `url('undefined'), auto`,
              }
            : {},
        } );

        const HeadingTag = headingType;
        return (
            <HeadingTag { ...blockProps }>
                <RichText.Content value={ headingText } />
            </HeadingTag>
        )
    }
}

const v3 = {
    attributes:{
        animation: {
            type: "object"
        },
        blockType : {
            type : "string",
            default: "custom"
        },
        effects: {
            type: "object"
        },
        headingText: {
            type: "string",
            default: ""
        },
        headingType: {
            type: "string",
            default: "h2"
        },
        padding: {
            type: "object"
        },
        margin: {
            type: "object"
        },
        cursor: {
            type: "object",
            default: {
                value: "default",
                image: {
                    id : 0,
                    url : ""
                }
            }
        },
        textAlign: {
            type: "object"
        },
        textColor: {
            type: "string"
        }
    },
    save( props ) {
        const {
            attributes: {
                animation,
                cursor,
                effects,
                headingText,
                headingType,
                margin,
                padding,
                textAlign,
                textColor,
            },
        } = props

        const blockProps = useBlockProps.save( {
            className: [
                `savvy-heading`,
                ...( headingType ? [ `savvy-heading-${ headingType }` ] : [] ),
                ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
                ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
                ...( textAlign ? [ textAlignClassGenerator( textAlign ) ] : [] ),
                ...( textColor ? [ `text-${ textColor }` ] : [] ),
                ...(animation ? [animationClassGenerator(animation)] : []),
                ...( effects? [ effectClassGenerator( effects ) ] : [] )
            ].join(' '),
            style:{
                ...(animation && animationStyleGenerator(animation)),
                ...cursor?.image.url !== null ? { '--cursor-image': `url('${cursor?.image?.url}'), auto`, } : {},
                ...(effects && effectStyleGenerator(effects))
            }
        } );

        const HeadingTag = headingType;
        return (
            <Heading
                { ...blockProps }
                headingType={ headingType }
                headingText={ headingText }
            />
        )
    }
}

export default [ v2, v1 ];
// export default [ v3 ,v2, v1 ];
