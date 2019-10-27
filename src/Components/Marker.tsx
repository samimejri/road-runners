import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

export const Marker = (props: any) => {
    if (props.useAdvanced) {
        var speedRoot = document.getElementById("markerLayer");
        if (speedRoot) {
            return ReactDOM.createPortal(
                <Fragment>
                    <div className="circle">
                    </div>
                    <div className="auto-width">{props.children}</div>
                </Fragment>,
                speedRoot
            );
        }
    }

    return null;
}
