import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
    useEffect
} from '@wordpress/element';
import { 
    itemWidthClassGenerator, 
    borderWidthClassGenerator,
    borderWidthHoverClassGenerator,
    borderStyleClassGenerator, 
    borderRadiusClassGenerator,
    borderColorClassGenerator
} from "./inspector/";

import {
    paddingClassGenerator,
} from '/components/editor';
import Inspector from './inspector';

const Edit = (props) => {
    const {
        attributes: {
            source,
            url,
            poster,
            icon,
            iconSettings,
            modal,
            media,
            overlay,
            opacity,
            rotation,
            size,
            border,
            padding,
            elementStates,
        },
        clientId,
        setAttributes
    } = props;

    const { wasBlockJustInserted } = useSelect("core/block-editor");

    useEffect( () => { 
        wasBlockJustInserted(clientId) && setAttributes( { blockId: clientId } )
    }, [] );
    
    const SourceType = source;
    
    const blockProps = useBlockProps({
        className: [
            `savvy-media savvy-source-${source}`,
            ...overlay ? ['has-overlay'] : []
        ].join(' '),
    });

    const iconFontSize = [
        ...(size ? [itemWidthClassGenerator(size, false)] : []),
    ].join(' ');

    const borderWidth = [
        ...(border ? [borderWidthClassGenerator(border, false)] : []),
    ].join(' ');

    const borderWidthHover = [
        ...(elementStates ? [borderWidthHoverClassGenerator(elementStates, false)] : []),
    ].join(' ');

    const borderStyle = [
        ...(border ? [borderStyleClassGenerator(border, false)] : []),
    ].join(' ');

    const borderRadius = [
        ...(border ? [borderRadiusClassGenerator(border, false)] : []),
    ].join(' ');
    
    const borderColor = [
        ...(border ? [borderColorClassGenerator(border)] : []),
    ].join(' ');

    const paddingIcon = [
        ...(padding ? [paddingClassGenerator(padding)] : []),
    ].join(' ');

    const customStyles = {
        opacity: opacity ? opacity / 100 : 1,
        transform: rotation ? `rotate(${rotation}deg)` : 'none',
        '--width': iconFontSize ? iconFontSize : 48 + 'px'
    };

    const borderStyles = {
        '--border-width': borderWidth,
        '--border-width-hover': borderWidthHover,
        '--border-style': borderStyle,
        '--border-radius': borderRadius,
    };

    return (
        <>
            <Inspector {...props} />
            <div { ...blockProps }>

                { (source === 'video' || source === 'youtube' || source === 'vimeo') && 
                    <div className='button-overlay-image-video'>
                        <>
                            { icon &&
                                <button class="savvy-modal-icon savvy-media-icons">
                                    <div class={ `savvy-icon-parent ${ paddingIcon } ${ iconSettings?.icosvackground?.color ? 'bg-' + iconSettings?.icosvackground?.color : '' } ${ borderWidth ? 'savvy-responsive-border-width' : '' } ${ borderRadius ? 'savvy-responsive-border-radius' : '' } ${ borderStyle ? 'savvy-responsive-border-style' : '' } ${ borderColor }` } style={{ ...borderStyles }} >
                                        <span class="savvy-icon ">
                                            <img src={ icon?.url } class={ `d-inline-block ${ iconFontSize ? 'savvy-responsive-width' : '' }` } style={{...customStyles}} />
                                        </span>
                                    </div>
                                </button>
                            }
                            <div className='overlay-image-video'>
                                <>
                                    { overlay && 
                                        <>
                                            <span className={`savvy-background-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }`} style={{backgroundImage: overlay?.gradient, zIndex: '99'}}></span>
                                        </>
                                    }
                                    <div className='image-video'>
                                        <>
                                            { poster?.url && 
                                                <img className='' src={ poster?.url } />
                                            }
                                            <div className='video'>
                                                { source === 'video' && 
                                                    <video className='w-100' poster={ poster?.url } controls><source src={ media?.url } type="video/mp4"></source></video>
                                                }
                                                { source === 'youtube' && 
                                                    <div className="bg-youtube"><iframe width="100%" height="100%" src={ `https://www.youtube.com/embed/${ url }` }></iframe></div>
                                                }
                                                { source === 'vimeo' && 
                                                    <div className="bg-vimeo"><iframe width="100%" height="100%" src={ `https://player.vimeo.com/video/${ url }` }></iframe></div>
                                                }
                                            </div>
                                        </>
                                    </div>
                                </>
                            </div>
                        </>
                    </div>
                }

                { source === 'audio' && 
                <audio controls>
                        <source src={ media?.url } type="audio/mpeg" />
                    </audio>             
                }

            </div>
        </>
    );
};

export default Edit;
