import {
    useEffect,
    useState
} from '@wordpress/element';
import {
    useBlockProps,
    InnerBlocks
} from '@wordpress/block-editor';
import {
    useSelect,
    dispatch
} from '@wordpress/data';

import Inspector from './inspector';
import { reverseClassGenerator } from './inspector/';

import './../sub-block/column-content'

const Edit = ( props ) => {
    const {
        attributes: {
            colsLayout,
            reverse,
        }
    } = props;

    const [ isHiddenLayout, setIsHiddenLayout ] = useState( colsLayout !== undefined );

    const col1 = { ...colsLayout };
    const col2 = Object.keys(col1).reduce((colSettings, breakpoint) => {
        return {
            ...colSettings,
            [breakpoint]: col1[breakpoint] === 12 ? 12 : 12 - col1[breakpoint]
        }
    }, {});

    const INNER_TEMPLATE = [
        [ 'savvy-blocks/column-content', { col : col1 } ],
        [ 'savvy-blocks/column-content', { col : col2 } ]
    ];

    const { innerBlocks } = useSelect( ( select ) => {
        return {
            innerBlocks: select( 'core/block-editor' ).getBlocksByClientId( props.clientId )[0].innerBlocks,
        };
    } );

    const blockProps = useBlockProps({
        className: [
            `savvy-two-part-section row row-cols-1 row-cols-lg-2`,
            ...( reverse && colsLayout ? [ reverseClassGenerator(reverse, colsLayout) ] : [] ),
        ].join(' '),
    });

    useEffect(() => {
        if (innerBlocks[0] && JSON.stringify(innerBlocks[0].attributes.col) !== JSON.stringify(col1)) {
            dispatch('core/block-editor').updateBlockAttributes( innerBlocks[0]?.clientId, { col: col1, offset: undefined })
            dispatch('core/block-editor').updateBlockAttributes( innerBlocks[1]?.clientId, { col: col2, offset: undefined })
        }
    }, [colsLayout])

    return (
        <>
            <Inspector
                { ...props }
                isHiddenLayout = { isHiddenLayout }
                setIsHiddenLayout = { setIsHiddenLayout }
            />

            { isHiddenLayout &&
                <div { ...blockProps }>
                    <InnerBlocks
                        allowedBlocks={ ['savvy-blocks/column-content'] }
                        template={ INNER_TEMPLATE }
                    />
                </div>
            }
        </>
    )
}

export default Edit
