const Row = ( props ) => {

    const {
        id,
        className
    } = props;

    return (
        <div id={ id } className={ className }>
            {props.children}
        </div>
    )
}

export default Row;
