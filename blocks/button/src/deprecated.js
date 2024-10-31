import { Icon } from '/components/ui'
import { useBlockProps } from '@wordpress/block-editor';

import { getBlockProps } from './utils';

// Version 0.7.4 of savvy-blocks | changes: add role button
const v1 = {
    attributes:{
        text: {
            type: "string",
            default: "Button Text"
        },
        url: {
            type: "string"
        },
        target: {
            type: "string",
            default: "_self"
        },
        icons : {
            type : "object",
            default: {
            right: "",
            left: ""
            }
        },
        border : {
            type: "object",
            default: {
            width: 0,
            radius: 50,
            color : ""
            }
        },
        blockType : {
            type : "string",
            default: "primary"
        },
        effects: {
            type: "object"
        },
        padding: {
            type: "object",
            default : {
            _:{"top":"16","right":"16","bottom":"16","left":"16"}
            }
        },
        margin: {
            type: "object"
        },
        gap: {
            type: "object"
        },
        textColor: {
            type: "string"
        },
        backgroundColor: {
            type: "string"
        },
        elementStates: {
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
                backgroundColor,
                border,
                blockType,
                effects,
                elementStates,
                gap,
                icons,
                margin,
                padding,
                target,
                text,
                textColor,
                url,
            }
        } = props;

        const blockProps = useBlockProps.save(
            getBlockProps({
                backgroundColor,
                border,
                blockType,
                effects,
                elementStates,
                gap,
                margin,
                padding,
                textColor,
            })
        );

        return (
            <a
                id={ blockProps.id }
                href={ url }
                target={ target }
                rel="noopener"
                className={ blockProps.className }
                style={ blockProps.style }
            >
                <span className='savvy-button-overlay' />

                {
                    icons && icons?.left && (
                        <span className='savvy-btn-icon icon-left'>
                            <Icon icon={ {name: icons.left, type: 'font'} }/>
                        </span>
                    )
                }
                {
                    text && (
                        <span className='savvy-btn-text'>{ text }</span>
                    )

                }

                {   icons && icons?.right && (
                        <span className='savvy-btn-icon icon-right'>
                            <Icon icon={ {name: icons.right, type: 'font'} }/>
                        </span>
                    )
                }
            </a>
        )
    }
}

export default [ v1 ];

