const Image = ( props ) => {

    const {
        id,
        className,
        style,
        image,
        overlay,
        size,
        loading,
        imageSettings,
        captionProps
    } = props;

    const overlayClassName = [
        'savvy-image-overlay',
        `bg-${overlay?.color}`,
        ...(overlay?.opacity !== undefined ? [`opacity-${overlay?.opacity}`] : [])
    ].join( ' ' )

    return (
        <picture id={id} className={className} style={style}>
            {
                overlay?.color || overlay?.gradient ? (
                    <span className={overlayClassName} style={{backgroundImage: overlay?.gradient}}/>
                ) : (
                    ''
                )
            }
            <img
                src={image?.url}
                alt={image?.alt}
                loading={ loading === true ? "lazy" : "eager" }
                decoding="async"
                srcSet={[
                    image?.sizes?.full?.url && image?.sizes?.full?.width ? `${image.sizes.full.url} ${image.sizes.full.width}w` : '',
                    image?.sizes?.large?.url && image?.sizes?.large?.width ? `${image.sizes.large.url} ${image.sizes.large.width}w` : '',
                    image?.sizes?.thumbnail?.url && image?.sizes?.thumbnail?.width ? `${image.sizes.thumbnail.url} ${image.sizes.thumbnail.width}w` : '',
                    image?.sizes?.medium?.url && image?.sizes?.medium?.width ? `${image.sizes.medium.url} ${image.sizes.medium.width}w` : '',
                ].filter(Boolean).join(", ") || null}
                sizes={size?.width ? `(max-width: ${size?.width}) 100vw, ${size?.width}` : null}
                className={[
                    imageSettings?.focal && "focal-img",
                    `object-fit-${size?.objectFit || "none"}`,
                    `object-position-${size?.objectPosition || "center"}`,
                ].join(" ")}
                style={
                    imageSettings?.focal && imageSettings?.focalPoint
                        ? {
                            left: `${imageSettings?.focalPoint?.x * 100}%`,
                            top: `${imageSettings?.focalPoint?.y * 100}%`
                        }
                        : null
                }
            />

            {
                imageSettings?.Caption &&
                <div {...captionProps}>
                    <p className="m-0 p-8">{imageSettings?.TextCaption}</p>
                </div>
            }

        </picture>
    )
}

export default Image;
