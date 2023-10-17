import React, { useEffect, useState } from 'react'

const Payment = () => {
    const [popup, setPopup] = useState<Window | null>(null);
    const [popupUrl, setPopupUrl] = useState<string | null>(null);

    const openNewWindow = () => {
        const newWindow = window.open('https://example.com', '_blank');
        setPopup(newWindow);
    };

    useEffect(() => {
        if (popup) {
            const interval = setInterval(() => {
                if (popup.closed) {
                    clearInterval(interval);
                } else {
                    setPopupUrl(popup.location.href);
                    if (popup.location.href === 'desired-url') {
                        popup.close();
                    }
                }
            }, 1000); // Check every second
        }
    }, [popup]);

    return (
        <div>
            <button onClick={openNewWindow}>Open New Window</button>
            {popupUrl && <p>New Window URL: {popupUrl}</p>}
        </div>
    );
}

export default Payment