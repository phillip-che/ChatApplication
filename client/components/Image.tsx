import "../styles/Image.css"

import { useEffect, useState } from 'react';

const Image = ({ src } : {src: any }) => {

    const [ image, setImage ] = useState<any>("");

    useEffect(() => {
        const blob = new Blob([src], {type: src.type });

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    }, []);

    return (
        <img className="image-container" src={image} />
    )       
}

export default Image;