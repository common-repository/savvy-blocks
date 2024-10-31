import {
    InnerBlocks,
    useBlockProps
} from '@wordpress/block-editor';

import { Column } from '/components/ui'

import {
    alignSelfClassGenerator,
    colClassGenerator,
    offsetClassGenerator
} from './editor';

const Save = (props) => {
    const {
        attributes: {
            alignSelf,
            col,
            offset,
        }
    } = props;

    const blockProps = useBlockProps.save({

        className: [
            'col savvy-column',
            ...( alignSelf ? [ alignSelfClassGenerator( alignSelf ) ] : [] ),
            ...( col ? [ colClassGenerator( col ) ] : [] ),
            ...( offset ? [ offsetClassGenerator( offset ) ] : [] )
        ].join(' '),
    });

    return (
        <Column id={ blockProps.id } className={ blockProps.className }>
            <InnerBlocks.Content />
        </Column>
    )
}

export default Save;
