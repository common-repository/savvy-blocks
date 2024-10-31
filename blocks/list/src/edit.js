import {
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { useDefault } from '/utils/settings';

import {
    marginClassGenerator,
    paddingClassGenerator,
} from '/components/editor';

import { gapClassGenerator } from './editor/gap';
import { bulletTopStyleGenerator } from './editor';
import Inspector from './inspector';
import './list-item';


const Edit = (props) => {

    const {
        attributes: {
            bullet,
            listType,
            listStyle,
            icon,
            isAdvanced,
            gap,
            margin,
            padding,
            top
        },
        setAttributes,
        clientId
    } = props;
    
    const { wasBlockJustInserted } = useSelect('core/block-editor');

    useEffect(() => {
        wasBlockJustInserted(clientId) && (function(){
            //set default values for objective attributes
            setAttributes({ bullet: { ...bullet, size: 8 } })
        })()
    },[])

    useDefault(clientId, setAttributes)

    const blockProps = useBlockProps({
        className: [
            'savvy-list',
            ...( listType ? [ `savvy-list-${ listType }` ] : [] ),
            ...( bullet ? [ `savvy-list-styled` ] : [] ),
            ...( bullet?.bgColor ? [ `bullet-${ bullet?.bgColor }` ] : [] ),
            ...( bullet?.color ? [ `bullet-text-${ bullet?.color }` ] : [] ),
            ...( gap ? [ gapClassGenerator( gap ) ] : [] ),
            ...( !isAdvanced ? [ 'savvy-list-default' ] : [] ),
            ...( margin ? [ marginClassGenerator( margin ) ] : [] ),
            ...( padding ? [ paddingClassGenerator( padding ) ] : [] ),
        ].join( ' ' ),
        style: {
            '--list-borderRadius': bullet?.radius || null,
            '--list-size': bullet?.size ? bullet?.size + 'px' : null,
            '--font-size': bullet?.fontSize  || null,
            '--list-style-type': (listStyle?.type === 'custom-icon' ? 'none' : listStyle ?.type) || null,
            '--list-style-position': listStyle ?.position  || null,
            '--list-style-image': icon?.url ? `url('${icon?.url}')`: null,
            '--list-style-color': listStyle ?.color  || null,
            '--list-style-font-size': listStyle ?.fontSize  || null,
            ...(top && bulletTopStyleGenerator(top))
        }
    });

    const innerBlocksProps = useInnerBlocksProps({
        allowedBlocks: ['savvy-blocks/list-item'],
        template: [ ['savvy-blocks/list-item'] ],
        templateLock: false,
        templateInsertUpdatesSelection: true,
    } );

    const ListTag = listType === 'ol' ? 'ol' : 'ul';

    return (
        <>
            <Inspector { ...props }/>
            <ListTag { ...blockProps }>
                <InnerBlocks { ...innerBlocksProps } />
            </ListTag>
        </>
    )
}

export default Edit
