import React from 'react';
import { actionTypes } from '../../App';

function ControlButtons({ appDispatch, buttonName, buttonAction }) {
  return (
    <div className="flex justify-between mt-4">
        <input type="button" className="btnReset" value="Reset" onClick={() => appDispatch({ type: actionTypes.reset })} />
        {buttonName ?
          <input type="button" className="btnBlue" value={buttonName} onClick={buttonAction} />
          : ""
        }
      </div>
  );
}

export default ControlButtons;