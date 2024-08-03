import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from 'store/actions/commonAction';
import { acceptOrDeclineTrade, handleTrigger } from 'utils/utils';

const SwapComponent = memo(({ exchangeDate, exchangeLocation, offeredItemName, receiverName, requestedItemName, senderName, status, tradeId }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const userName=useSelector((state)=>state.auth.user.userName);
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleAccept = async () => {
    const response = await acceptOrDeclineTrade(tradeId, userId, 'APPROVED', reason);
    setCurrentStatus('Accepted');
    if (response) {
      handleTrigger(true, dispatch, setPopup({ title: 'success', content: 'Item accepted successfully' }));
    } else {
      handleTrigger(true, dispatch, setPopup({ title: 'Error', content: 'Item accepted failed' }));
    }
  };

  const handleReject = async () => {
    if (!reason) {
      setError('Reason is required for rejection');
      return;
    }
    const response = await acceptOrDeclineTrade(tradeId, userId, 'REJECTED', reason);
    setCurrentStatus('Rejected');
    if (response) {
      handleTrigger(true, dispatch, setPopup({ title: 'success', content: 'Item rejected successfully' }));
    } else {
      handleTrigger(true, dispatch, setPopup({ title: 'Error', content: 'Item rejected failed' }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row  w-full mb-6 mx-auto">
        <div className="flex flex-col items-center mx-5 mb-4 md:mb-0">
          <p className="text-center mb-2 font-semibold text-lg">{senderName}</p>
          <p className="text-center font-medium text-gray-700">{offeredItemName}</p>
        </div>
        <div className="flex flex-col items-center mx-5 mb-4 md:mb-0">
          <p className="text-center mb-2 font-semibold text-lg">{receiverName}</p>
          <p className="text-center font-medium text-gray-700">{requestedItemName}</p>
        </div>
      </div>
      <div className="my-5">
        <i className="fas fa-sync-alt text-3xl cursor-pointer text-blue-500"></i>
      </div>
      <div className="flex flex-col items-center my-5">
        <p className="text-center font-medium text-gray-700">Exchange Date: {new Date(exchangeDate).toLocaleString()}</p>
        <p className="text-center font-medium text-gray-700">Exchange Location: {exchangeLocation}</p>
        <p className="text-center font-medium text-gray-700">Status: {currentStatus}</p>
        <p className="text-center font-medium text-gray-700">Trade ID: {tradeId}</p>
      </div>
      <div className="flex flex-col items-center my-5 w-full max-w-sm">
         { (userName !== senderName) && (
          <>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter reason here..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError('');
              }}
            />
            {error && <span className="text-red-500">{error}</span>}
            <div className="flex justify-between w-full">
              <button onClick={handleAccept} className="w-24 h-10 bg-green-500 text-white mx-2 rounded hover:bg-green-600 transition duration-300">Accept</button>
              <button onClick={handleReject} className="w-24 h-10 bg-red-500 text-white mx-2 rounded hover:bg-red-600 transition duration-300">Reject</button>
            </div>
          </>
         ) }

        
        
      </div>
    </div>
  );
});

SwapComponent.displayName = 'SwapComponent';

export default SwapComponent;