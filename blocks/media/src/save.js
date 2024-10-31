import { useBlockProps } from '@wordpress/block-editor';
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

const Save = (props) => {
    const {
        attributes: {
            source,
            videoSize,
            url,
            poster,
            mediaSettings,
            icon,
            iconSettings,
            modal,
            media,
            overlay,
            opacity,
            rotation,
            color,
            size,
            border,
            padding,
            elementStates,
            blockId
        }
    } = props;

    const mediaAttributes = {
        width: videoSize?.width || '100%',
        height: videoSize?.height || '250px',
        allowfullscreen : mediaSettings?.fullScreen,
    };

    const blockProps = useBlockProps.save({
        className: [
            `savvy-media position-relative savvy-source-${source}`,
            ...( (!modal && overlay) ? ['has-overlay'] : [] )
        ].join(' '),
        style:{
            width: videoSize?.width || '100%',
            height: 
            ((source === 'youtube' || source === 'vimeo') ? videoSize?.height || '250px' : '100%')
            // + ((!modal && !mediaSettings?.fluid && source === 'video') ? '250px' : '100%'),
        }
    });

    const overlayClassName = [
        !modal ? 'savvy-background-overlay' : '',
        ...( (!modal && overlay?.color) ? [ `bg-${ overlay?.color }` ] : [] ),
        ...( (!modal && overlay?.opacity) !== undefined ? [ `opacity-${ overlay?.opacity }` ] : [])
    ].join(' ');

    const iconFontSize = [
        ...(size ? [itemWidthClassGenerator(size)] : []),
    ].join(' ');

    const borderWidth = [
        ...(border ? [borderWidthClassGenerator(border)] : []),
    ].join(' ');

    const borderStyle = [
        ...(border ? [borderStyleClassGenerator(border)] : []),
    ].join(' ');

    const borderWidthHover = [
        ...(elementStates ? [borderWidthHoverClassGenerator(elementStates)] : []),
    ].join(' ');

    const borderRadius = [
        ...(border ? [borderRadiusClassGenerator(border)] : []),
    ].join(' ');
    
    const borderColor = [
        ...(border ? [borderColorClassGenerator(border)] : []),
    ].join(' ');

    const paddingIcon = [
        ...(padding ? [paddingClassGenerator(padding)] : []),
    ].join(' ');

    const videoElement = (
        <>            
            <video
                data-play={ mediaSettings?.play }
                data-volume={ mediaSettings?.volume }
                data-progress={ mediaSettings?.progress }
                data-remainingTime={ mediaSettings?.remainingTime }
                data-fullScreen={ mediaSettings?.fullScreen }
                data-autoplay={ mediaSettings?.autoplay }
                data-fluid={ mediaSettings?.fluid }
                data-muted={ mediaSettings?.muted }
                data-loop={ mediaSettings?.loop }
                data-icon={ icon?.url }
                data-icon-size={ iconFontSize }
                data-icon-color={ color }
                data-icon-opacity={ opacity }
                data-icon-rotation={ rotation }
                data-icon-background-color={ iconSettings?.icosvackground?.color }
                data-icon-background-radius={ borderRadius }
                data-icon-background-padding={ paddingIcon }
                data-icon-background-outlineWidth={ borderWidth }
                data-icon-background-outlineHoverWidth={ borderWidthHover }
                data-icon-background-outlineStyle={ borderStyle }
                data-icon-background-outlineColor={ borderColor }
                data-modal={ modal }
                width={ (!modal || !mediaSettings?.fluid) && videoSize?.width }
                height={ (!modal || !mediaSettings?.fluid) && videoSize?.height }
                data-overlay-class={ !modal && overlayClassName }
                data-overlay-style={ !modal && overlay?.gradient }
                id={ `my-${blockId}` }
                data-idSelector={ `video${blockId}` }
                className={ 
                    `video-js 
                    ${ mediaSettings?.play || mediaSettings?.volume || mediaSettings?.progress || mediaSettings?.remainingTime || mediaSettings?.fullScreen ? '' : 'active' }
                    ${ videoSize?.width ? '' : 'w-100' }`
                }
                poster={ !modal && poster?.url }
                style={{
                    width: (!modal || !mediaSettings?.fluid) && videoSize?.width || '100%',
                    height: (!modal || !mediaSettings?.fluid) && videoSize?.height || '100%',
                }}
                data-setup='{}'
            >
                <source src={ media?.url } type="video/mp4"></source>
                <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank" rel='noopener'>supports HTML5 video</a></p>
            </video>
        </>
    );

    const youtubeElement = (
        <>
            { !modal 
            ?
                <>
                    <div
                        id={ `savvy-media-poster-${ blockId }` }
                        className='savvy-media-poster'
                        data-icon-id={ `id-${ blockId }` } 
                        data-overlay={ `overlay-${ blockId }` } 
                        data-video-id={ url } 
                        data-idSelector={ `video${ blockId }` } 
                        style={{
                            width: videoSize?.width || '100%',
                            height: videoSize?.height || '250px',
                        }}
                    >
                        { overlay && 
                            <>
                                <span 
                                    className={ `savvy-background-overlay iframe-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }` }
                                    style={{ backgroundImage: overlay?.gradient, zIndex: '2' }} 
                                    id={ `overlay-${ blockId }` } 
                                />
                            </>
                        }
                        { poster?.url 
                            ?
                                <img 
                                    { ...mediaAttributes } 
                                    src={ poster?.url } 
                                />
                            :
                                <div 
                                    className="bg-youtube"
                                >
                                    <iframe 
                                        { ...mediaAttributes }
                                        src={ `https://www.youtube.com/embed/${ url }` }
                                    />
                                </div>
                        } 
                        <button 
                            className="savvy-modal-icon savvy-media-icons"
                            id={ `id-${ blockId }` } 
                            type="button" 
                            title="Play" 
                            aria-disabled="false"
                        >
                            <div 
                                className={ `savvy-icon-parent ${ paddingIcon } ${ iconSettings?.icosvackground?.color ? 'bg-' + iconSettings?.icosvackground?.color : '' } ${ borderWidth ? 'savvy-responsive-border-width' : '' } ${ borderRadius ? 'savvy-responsive-border-radius' : '' } ${ borderStyle ? 'savvy-responsive-border-style' : '' } ${ borderColor }` }
                                style={ `${ borderWidth && borderWidth + ';' } ${ borderWidthHover && borderWidthHover + ';' } ${ borderRadius && borderRadius + ';' } ${ borderStyle && borderStyle + ';' }` }
                            >
                                <span className="savvy-icon ">
                                    <img 
                                        src={ icon?.url } 
                                        className={ `d-inline-block ${ iconFontSize ? 'savvy-responsive-width' : '' }` }
                                        style={ `${ opacity ? 'opacity:' + opacity/100 + ';' : '' } ${ rotation ? 'transform: rotate(' + rotation + 'deg);' : '' } ${ iconFontSize }` } 
                                    />
                                </span>
                            </div>
                        </button>
                    </div>
                </>
            :
                <div 
                    id="savvy-media-poster"
                    className='savvy-media-poster'
                    { ...mediaAttributes } 
                    src={ poster?.url } 
                    data-video-id={ url } 
                />
            }
        </>
    );

    const vimeoElement = (
        <>
            { !modal
            ?
                <>
                    <div 
                        id={ `vimeo-player-${ blockId }` } 
                        className='savvy-media-vimeo-poster'
                        style={{
                            width: videoSize?.width || '100%',
                            height: videoSize?.height || '250px',
                        }}
                    >
                        { overlay && 
                            <>
                                <span 
                                    className={ `savvy-background-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }` }
                                    style={{
                                        backgroundImage: overlay?.gradient, 
                                        zIndex: '2'
                                    }}
                                />
                            </>
                        }
                        { poster?.url
                            ?
                                <img
                                    className='savvy-media-vimeo-poster'
                                    src={ poster?.url }
                                    style={{
                                        width: videoSize?.width || '100%',
                                        height: videoSize?.height || '250px',
                                    }}
                                />
                            :
                                <div 
                                    style={{ 
                                        backgroundColor: '#efefef',
                                        height: '100%'
                                    }}
                                />
                        }
                        <button 
                            className="savvy-modal-icon savvy-media-icons"
                            type="button" 
                            title="Play" 
                            aria-disabled="false"
                        >
                            <div 
                                className={ 
                                    `savvy-icon-parent ${ paddingIcon } 
                                    ${ iconSettings?.icosvackground?.color ? 'bg-' + iconSettings?.icosvackground?.color : '' } 
                                    ${ borderWidth ? 'savvy-responsive-border-width' : '' } 
                                    ${ borderRadius ? 'savvy-responsive-border-radius' : '' } 
                                    ${ borderStyle ? 'savvy-responsive-border-style' : '' } 
                                    ${ borderColor }` 
                                } 
                                style={ 
                                    `${ borderWidth && borderWidth + ';' } 
                                     ${ borderWidthHover && borderWidthHover + ';' } 
                                     ${ borderRadius && borderRadius + ';' } 
                                     ${ borderStyle && borderStyle + ';' }` 
                                    }
                            >
                                <span className="savvy-icon">
                                    <img 
                                        src={ icon?.url } 
                                        className={
                                            `d-inline-block 
                                            ${ iconFontSize ? 'savvy-responsive-width' : '' }`
                                        } 
                                        style={ 
                                            `${ opacity ? 'opacity:' + opacity/100 + ';' : '' } 
                                             ${ rotation ? 'transform: rotate(' + rotation + 'deg);' : '' } 
                                             ${ iconFontSize }` 
                                        }
                                    />
                                </span>
                            </div>
                        </button>
                    </div>
                    <div 
                        id={ `vimeo-player` } 
                        className='vimeo-player' 
                        { ...mediaAttributes } 
                        data-video-id={ url } 
                        data-id={ `vimeo-player-${ blockId }` }  
                        data-icon-id={ `id-${ blockId }` } 
                        data-overlay={ `overlay-${ blockId }` } 
                        data-idSelector={ `video${ blockId }` }
                        style={{
                            width: videoSize?.width || '100%',
                            height: videoSize?.height || '250px',
                        }}
                    />
                </>
            :
                <>
                    { overlay && 
                        <>
                            <span 
                                className={ `savvy-background-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }` }
                                style={{
                                    backgroundImage: overlay?.gradient, 
                                    zIndex: '2', 
                                    position: 'absolute', 
                                    inset: '0'
                                }}
                            />
                        </>
                    }
                    <div 
                        id={ `vimeo-player` } 
                        className='vimeo-player' 
                        { ...mediaAttributes } 
                        data-video-id={ url } 
                        data-id={ `vimeo-player-${ blockId }` }  
                        data-icon-id={ `id-${ blockId }` } 
                        data-overlay={ `overlay-${ blockId }` } 
                        data-idSelector={ `video${ blockId }` }
                        style={{
                            width: videoSize?.width || '100%',
                            height: videoSize?.height || '250px',
                        }}
                    />
                </>
            }
        </>
    );

    return (
        <div { ...blockProps }>
            { source === 'video' && (
                modal ? 
                    (
                        <>
                            <div 
                                className='modal-click' 
                                data-bs-toggle='modal' 
                                data-bs-target={ `#video${ blockId }` }
                                style={{
                                    width: videoSize?.width || '100%',
                                    height: videoSize?.height || '250px',
                                }}
                            >
                                { overlay && 
                                    <>
                                        <span 
                                            className={ `savvy-background-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }` }
                                            style={{ backgroundImage: overlay?.gradient }}
                                        />
                                    </>
                                }
                                { poster?.url && 
                                    <img 
                                        className='img-fluid' 
                                        src={ poster?.url }
                                        style={{
                                            width: videoSize?.width || '100%',
                                            height: videoSize?.height || '250px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                }
                                { poster?.url
                                    ?
                                        <img
                                            className='img-fluid' 
                                            src={ poster?.url }
                                            style={{
                                                width: videoSize?.width || '100%',
                                                height: videoSize?.height || '250px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    :
                                        <div 
                                            style={{ 
                                                backgroundColor: '#efefef',
                                                height: '100%'
                                            }}
                                        />
                                }
                            </div>
                            <button 
                                className="savvy-modal-icon"
                                type="button" 
                                title="Play" 
                                aria-disabled="false" 
                                data-bs-toggle="modal" 
                                data-bs-target={ `#video${ blockId }` }
                            >
                                <div 
                                    className={ 
                                        `savvy-icon-parent ${ paddingIcon }
                                        ${ iconSettings?.icosvackground?.color ? 'bg-' + iconSettings?.icosvackground?.color : '' }
                                        ${ borderWidth ? 'savvy-responsive-border-width' : '' }
                                        ${ borderRadius ? 'savvy-responsive-border-radius' : '' }
                                        ${ borderStyle ? 'savvy-responsive-border-style' : '' }
                                        ${ borderColor }`
                                    } 
                                    style={ 
                                        `${ borderWidth && borderWidth + ';' }
                                         ${ borderWidthHover && borderWidthHover + ';' }
                                         ${ borderRadius && borderRadius + ';' }
                                         ${ borderStyle && borderStyle + ';' }`
                                    }
                                >
                                    <span className="savvy-icon">
                                        <img 
                                            src={ icon?.url } 
                                            className={ `d-inline-block ${ iconFontSize ? 'savvy-responsive-width' : '' }` }
                                            style={ `${ opacity ? 'opacity:' + opacity/100 + ';' : '' } ${ rotation ? 'transform: rotate(' + rotation + 'deg);' : '' } ${ iconFontSize }` } 
                                        />
                                    </span>
                                </div>
                            </button>
                            <div className="modal fade" id={ `video${ blockId }` } tabIndex="-1" aria-labelledby={ `video${ blockId }Label` } aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-body d-flex align-items-center justify-content-center p-lg-0">
                                            { videoElement }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        videoElement
                    )
                )
            }

            { source === 'youtube' && (
                modal ? 
                    (
                        <>
                            { overlay && 
                                <>
                                    <span 
                                        className={ `savvy-background-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }` }
                                        style={{ 
                                            backgroundImage: overlay?.gradient, 
                                            zIndex: '2', 
                                            position: 'absolute', 
                                            inset: '0' 
                                        }}
                                    />
                                </>
                            }
                            { poster?.url
                                ?
                                    <img 
                                        id={ `savvy-media-poster-${ blockId }` }
                                        data-icon-id={ `id-${ blockId }` } 
                                        data-overlay={ `overlay-${ blockId }` } 
                                        data-video-id={ url } 
                                        data-idSelector={ `video${blockId}` } 
                                        data-bs-toggle='modal' 
                                        data-bs-target={ `#video${blockId}` }
                                        className='savvy-media-posters'
                                        { ...mediaAttributes } 
                                        src={ poster?.url }
                                    />
                                :
                                    <div 
                                        style={{ 
                                            backgroundColor: '#efefef',
                                            height: '100%'
                                        }}
                                    />
                            }
                            
                            <button 
                                className="savvy-modal-icon savvy-media-icons"
                                type="button" 
                                title="Play" 
                                aria-disabled="false" 
                                data-bs-toggle="modal" 
                                data-bs-target={ `#video${blockId}` }
                            >
                                <div 
                                    className={ `savvy-icon-parent ${ paddingIcon } ${ iconSettings?.icosvackground?.color ? 'bg-' + iconSettings?.icosvackground?.color : '' } ${ borderWidth ? 'savvy-responsive-border-width' : '' } ${ borderRadius ? 'savvy-responsive-border-radius' : '' } ${ borderStyle ? 'savvy-responsive-border-style' : '' } ${ borderColor }` } style={ `${ borderWidth && borderWidth + ';' } ${ borderWidthHover && borderWidthHover + ';' } ${ borderRadius && borderRadius + ';' } ${ borderStyle && borderStyle + ';' }` }
                                >
                                    <span className="savvy-icon ">
                                        <img 
                                            src={ icon?.url } 
                                            className={ `d-inline-block h-100 ${ iconFontSize ? 'savvy-responsive-width' : '' }` }
                                            style={ 
                                                `${ opacity ? 'opacity:' + opacity/100 + ';' : '' }
                                                 ${ rotation ? 'transform: rotate(' + rotation + 'deg);' : '' }
                                                 ${ iconFontSize }`
                                            } 
                                        />
                                    </span>
                                </div>
                            </button>
                            <div className="modal fade" id={`video${blockId}`} tabIndex="-1" aria-labelledby={`video${blockId}Label`} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-body d-flex align-items-center justify-content-center p-lg-0">
                                            <div 
                                                id={ `savvy-media-poster-${ blockId }` }
                                                className='savvy-media-poster'
                                                src={poster?.url} 
                                                data-icon-id={ `id-${ blockId }` } 
                                                data-overlay={ `overlay-${ blockId }` } 
                                                data-video-id={ url } 
                                                data-idSelector={ `video${ blockId }` } 
                                                data-bs-toggle='modal' 
                                                data-bs-target={ `#video${ blockId }` } 
                                                { ...mediaAttributes }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        youtubeElement
                    )
                )
            }

            { source === 'vimeo' && (
                modal ? 
                    (
                        <>
                            { overlay && 
                                <>
                                    <span 
                                        className={ `savvy-background-overlay bg-${ overlay?.color } opacity-${ overlay?.opacity }` }
                                        style={{
                                            backgroundImage: overlay?.gradient, 
                                            zIndex: '2', 
                                            position: 'absolute', 
                                            inset: '0'
                                        }}
                                    />
                                </>
                            }
                            { poster?.url
                                ?
                                    <img
                                        className='savvy-media-vimeo-poster'
                                        src={ poster?.url }
                                        data-bs-toggle='modal'
                                        data-bs-target={ `#video${ blockId }` } 
                                        {...mediaAttributes}
                                        style={{
                                            width: videoSize?.width || '100%',
                                            height: videoSize?.height || '250px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                :
                                    <div 
                                        style={{ 
                                            backgroundColor: '#efefef',
                                            height: '100%'
                                        }}
                                    />
                            }
                            <button 
                                className="savvy-modal-icon savvy-media-icons"
                                type="button" 
                                title="Play"
                                aria-disabled="false" 
                                data-bs-toggle="modal" 
                                data-bs-target={ `#video${ blockId }` }
                            >
                                <div 
                                    className={ 
                                        `savvy-icon-parent 
                                        ${ paddingIcon }
                                        ${ iconSettings?.icosvackground?.color ? 'bg-' + iconSettings?.icosvackground?.color : '' }
                                        ${ borderWidth ? 'savvy-responsive-border-width' : '' }
                                        ${ borderRadius ? 'savvy-responsive-border-radius' : '' }
                                        ${ borderStyle ? 'savvy-responsive-border-style' : '' }
                                        ${ borderColor }` 
                                    } 
                                    style={ 
                                        `${ borderWidth && borderWidth + ';' }
                                         ${ borderWidthHover && borderWidthHover + ';' }
                                         ${ borderRadius && borderRadius + ';' }
                                         ${ borderStyle && borderStyle + ';' }` 
                                        }
                                    >
                                    <span className="savvy-icon">
                                        <img 
                                            src={ icon?.url } 
                                            className={ 
                                                `d-inline-block 
                                                ${ iconFontSize ? 'savvy-responsive-width' : '' }`
                                            } 
                                            style={ 
                                                `${ opacity ? 'opacity:' + opacity/100 + ';' : '' } 
                                                 ${ rotation ? 'transform: rotate(' + rotation + 'deg);' : '' } 
                                                 ${ iconFontSize }` 
                                            } 
                                        />
                                    </span>
                                </div>
                            </button>
                            <div className="modal fade" id={ `video${ blockId }` } tabIndex="-1" aria-labelledby={ `video${ blockId }Label` } aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-body p-lg-0">
                                            <div 
                                                id={ `vimeo-player` } 
                                                className='vimeo-player' 
                                                { ...mediaAttributes } 
                                                data-id={ `vimeo-player-${ blockId }` } 
                                                data-video-id={ url } 
                                                data-icon-id={ `id-${ blockId }` } 
                                                data-overlay={ `overlay-${ blockId }` } 
                                                data-idSelector={ `video${ blockId }` }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        vimeoElement
                    )
                )
            }

            { source === 'audio' && 
               <audio controls>
                    <source src={ media?.url } type="audio/mpeg" />
                </audio>             
            }
        </div>
    );
}

export default Save
