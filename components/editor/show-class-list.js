import { checkEmpty } from '/utils';

const ShowClassList = ( props ) => {
    const{ attr , classGenerator, themeClass = '' } = props;

    return(
        !checkEmpty(attr) &&
        <div className={`show-class-list ${ themeClass }`}>
            { attr ? [ classGenerator( attr ) ] : '' }
        </div>
    )
}

export default ShowClassList;
