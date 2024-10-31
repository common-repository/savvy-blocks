import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import {
    marginClassGenerator,
    paddingClassGenerator,
} from '/components/editor';

import { gapClassGenerator } from './editor/gap';
import { bulletTopStyleGenerator } from './editor';

const Save = (props) => {
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

    const ListTag = listType === 'ol' ? 'ol' : 'ul';

    return (
        <ListTag { ...blockProps }>
            <InnerBlocks.Content />
        </ListTag>
    )
}

export default Save
