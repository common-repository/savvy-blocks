import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { gapClassGenerator } from './editor/gap';

// Version 0.7.4 of savvy-blocks | changes: add Bullet & gap
const v1 = {
    attributes:{
        blockType : {
            type : "string",
            default: "custom"
        },
        listType: {
            type: "string",
            default: "ul"
        },
    },
    supports: {
        html: false,
        anchor: true
    },
    save( props ) {
        const {
            attributes: {
                listType,
            }
        } = props;
    
        const blockProps = useBlockProps.save();
    
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
    
        return (
            <ListTag { ...blockProps }>
                <InnerBlocks.Content />
            </ListTag>
        )
    }
}

const v2 = {
    attributes:{
        blockType : {
            type : "string",
            default: "custom"
        },
        listType: {
            type: "string",
            default: "ul"
        },
        gap: {
            type: "object"
        },
        bullet: {
            type: "object"
        }
    },
    supports: {
        html: false,
        anchor: true
    },
    save( props ) {
        const {
            attributes: {
                listType,
                bullet,
                gap
            }
        } = props;
    
        const blockProps = useBlockProps.save({
            className: [
                'savvy-list',
                ...( listType ? [ `savvy-list-${ listType }` ] : [] ),
                ...( bullet ? [ `savvy-list-styled` ] : [] ),
                ...( bullet?.bgColor ? [ `bullet-${ bullet?.bgColor }` ] : [] ),
                ...( bullet?.color ? [ `bullet-text-${ bullet?.color }` ] : [] ),
                ...( gap ? [ gapClassGenerator( gap ) ] : [] ),
            ].join( ' ' ),
            style: {
                '--list-borderRadius': bullet?.radius || null,
                '--list-size': bullet?.size ? bullet?.size + "px" : null,
                '--font-size': bullet?.fontSize  || null
            }
        });
    
        const ListTag = listType === 'ol' ? 'ol' : 'ul';
    
        return (
            <ListTag { ...blockProps }>
                <InnerBlocks.Content />
            </ListTag>
        )
    }
}
export default [ v2, v1 ];

