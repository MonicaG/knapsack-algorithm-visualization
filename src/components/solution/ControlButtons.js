import React, {useContext} from 'react';
import { actionTypes } from '../../App';
import AppContext from '../../AppContext';

function ControlButtons({ buttonName, buttonAction }) {
  const appContext = useContext(AppContext);
  return (
    <div className="flex justify-between mt-4">
        <input type="button" className="btnReset" value="Reset" onClick={() => appContext.appDispatch({ type: actionTypes.reset })} />
        {buttonName ?
          <input type="button" className="btnBlue" value={buttonName} onClick={buttonAction} />
          : ""
        }
      </div>
  );
}

export default ControlButtons;