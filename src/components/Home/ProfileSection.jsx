import React, { memo, useEffect, useState } from 'react';
import FilterComponent from './components/FilterComponent';
import Avatar from '../Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '../common/Skeleton';
import { setPageLoading, setPopup } from 'store/actions/commonAction';
import { getUserSentTrades, getUserReceivedTrades, handleTrigger, markNotificationAsRead } from 'utils/utils';
import { useRouter } from 'next/router';

const ProfileSection = memo(({ 
  email,
  name,
  role,
  gender,
  profilePicture
}) => {
  const router = useRouter(); 
  const dispatch = useDispatch();
  const pageLoading = useSelector((state) => state.common.pageLoading);
  const userId = useSelector((state) => state.user.userId);
  const [sentTrades, setSentTrades] = useState([]);
  const [receivedTrades, setReceivedTrades] = useState([]);
  const [viewMoreIndexSent, setViewMoreIndexSent] = useState(null);
  const [viewMoreIndexReceived, setViewMoreIndexReceived] = useState(null);
  const [showMoreSent, setShowMoreSent] = useState(false);
  const [showMoreReceived, setShowMoreReceived] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    dispatch(setPageLoading(false));
  }, [userId]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const sentTradesResponse = await getUserSentTrades(userId);
        const receivedTradesResponse = await getUserReceivedTrades(userId);
        setSentTrades(sentTradesResponse);
        setReceivedTrades(receivedTradesResponse);
      } catch (error) {
        handleTrigger(true, dispatch, setPopup({ title: 'error', content: 'Error fetching trades', data: error }));
      }
    };

    if (userId) {
      fetchTrades();
    }
  }, [userId]);

  const handleClick = async (notification) => {
    if(notification.status === 'COMPLETED'){
      handleTrigger(true,dispatch,setPopup({title:'Completed',content:"Trade already completed"}));
      return;
    }
    const response = await markNotificationAsRead(notification && notification.id);
    if (response) {
      router.push(`/tradeid/${notification.tradeId}`);
    }else{
      handleTrigger(true,dispatch,setPopup({title:'error',content:"Failed to mark notification as read"}));
    }
  };

  const filterTrades = (trades) => {
    if (filterStatus === 'ALL') return trades;
    return trades.filter(trade => trade.status === filterStatus);
  };

  if (pageLoading) {
    return (
      <div className="profile-section w-full max-w-xs mx-auto p-6 bg-ccWhite shadow-lg rounded-lg">
        <div className="flex items-center mb-6">
          <Skeleton circle={true} height={64} width={64} />
          <div className="ml-4">
            <Skeleton width={128} height={24} />
            <Skeleton width={192} height={16} />
            <Skeleton width={96} height={16} />
            <Skeleton width={96} height={16} />
            <Skeleton width={96} height={16} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form>
      <div className="profile-section w-full max-w-xs mx-auto p-6 bg-ccWhite shadow-lg rounded-lg">
        <div className="flex items-center mb-6">
          <Avatar username={name} profilePicture={profilePicture} />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
            <p className="text-gray-600 mb-1">{email}</p>
            <p className="text-gray-500">Role: {role}</p>
            <p className="text-gray-500">Gender: {gender}</p>
            <p className="text-gray-500">Joined: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="trades-section">
          <div className="mb-4">
            <label htmlFor="trade-filter" className="block text-gray-700">Filter Trades:</label>
            <select
              id="trade-filter"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">ALL</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Sent Trades</h3>
          <ul>
            {sentTrades && sentTrades.content && sentTrades.content.length > 0 ? (
              filterTrades(sentTrades.content).slice(0, showMoreSent ? sentTrades.content.length : 5).map((trade, index) => (
                <li key={index} className="text-gray-600 mb-1">
                  <div className="p-2 bg-gray-100 rounded shadow-sm flex justify-between items-center">
                    <div onClick={() => handleClick(trade)} className='cursor-pointer'>
                      <p className="text-sm font-bold">Offered Item: {trade.offeredItemName || "tester"}</p>
                      {viewMoreIndexSent === index && (
                        <div className="hidden-details cursor-pointer">
                          <p className="text-sm cursor-pointer">Receiver: {trade.receiverName || "Pavan"}</p>
                          <p className="text-sm cursor-pointer">Requested Item: {trade.requestedItemName || "Jacket"}</p>
                          <p className="text-sm cursor-pointer">Sender: {trade.senderName || "Pavan"}</p>
                          <p className="text-sm cursor-pointer">Status: {trade.status || "PENDING"}</p>
                        </div>
                      )}
                    </div>
                    <button className="text-blue-500 hover:text-blue-700" onClick={(e) => {
                      e.preventDefault();
                      setViewMoreIndexSent(viewMoreIndexSent === index ? null : index);
                    }}>
                      {viewMoreIndexSent === index ? 'View Less' : 'View More'}
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-600 mb-1">No sent trades</li>
            )}
          </ul>
          {sentTrades && sentTrades.content && sentTrades.content.length > 5 && (
            <button className="text-blue-500 hover:text-blue-700" onClick={(e) => {
              e.preventDefault();
              setShowMoreSent(!showMoreSent);
            }}>
              {showMoreSent ? 'Show Less' : 'Show More'}
            </button>
          )}
          <h3 className="text-xl font-bold text-gray-800 mb-2">Received Trades</h3>
          <ul>
            {receivedTrades && receivedTrades.content && receivedTrades.content.length > 0 ? (
              filterTrades(receivedTrades.content).slice(0, showMoreReceived ? receivedTrades.content.length : 5).map((trade, index) => (
                <li key={index} className="text-gray-600 mb-1">
                  <div className="p-2 bg-gray-100 rounded shadow-sm flex justify-between items-center">
                    <div onClick={() => handleClick(trade)} className='cursor-pointer' >
                      <p className="text-sm font-bold">Offered Item: {trade.offeredItemName || "tester"}</p>
                      {viewMoreIndexReceived === index && (
                        <div className="hidden-details">
                          <p className="text-sm">Receiver: {trade.receiverName || "Pavan"}</p>
                          <p className="text-sm">Requested Item: {trade.requestedItemName || "Jacket"}</p>
                          <p className="text-sm">Sender: {trade.senderName || "Pavan"}</p>
                          <p className="text-sm">Status: {trade.status || "PENDING"}</p>
                        </div>
                      )}
                    </div>
                    <button className="text-blue-500 hover:text-blue-700" onClick={(e) => {
                      e.preventDefault();
                      setViewMoreIndexReceived(viewMoreIndexReceived === index ? null : index);
                    }}>
                      {viewMoreIndexReceived === index ? 'View Less' : 'View More'}
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-600 mb-1">No received trades</li>
            )}
          </ul>
          {receivedTrades && receivedTrades.content && receivedTrades.content.length > 5 && (
            <button className="text-blue-500 hover:text-blue-700" onClick={(e) => {
              e.preventDefault();
              setShowMoreReceived(!showMoreReceived);
            }}>
              {showMoreReceived ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
});

ProfileSection.displayName = 'ProfileSection';

export default ProfileSection;