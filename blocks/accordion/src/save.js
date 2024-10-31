import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import { gapClassGenerator } from '/components/editor';

const Save = (props) => {
    const {
        attributes: {
            expand,
            blockId,
            gap,
        }
    } = props;

    const blockProps = useBlockProps.save({
        className: [
            'accordion accordion-flush row w-100 m-0',
            expand === true ? 'expand' : 'push-down',
            ...( gap ? [ gapClassGenerator( gap ) ] : [] ),
        ].join(' '),
    });

    return (
        <div id={ `accordion${ blockId }` } className={ blockProps.className }>
            <InnerBlocks.Content />
        </div>
    )
}

export default Save;
