import React, { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';

function LocationInput() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPostCode = () => {
        setIsPopupOpen(true);
    }

    const closePostCode = () => {
        setIsPopupOpen(false);
    }

    return (
        <div>
            <button type='button' onClick={openPostCode}>지번, 도로명, 건물명으로 검색</button>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
        </div>
    );
}

export default LocationInput;