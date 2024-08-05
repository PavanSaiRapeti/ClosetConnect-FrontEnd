import React, { useState } from 'react';
import ListingGrid from './Home/LisitingGrid';
import StepNavigation from './StepNavigation';
import { useDispatch, useSelector } from 'react-redux';
import ListingCard from './Home/components/ListingCard';
import CustomPagination from './customPagination';
import { requestTrade } from 'utils/utils';
import { openPopup, setPopup } from 'store/actions/commonAction';


const TradeModalContent = ({ product, image, setCurrentStep, currentStep }) => {
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex">
          
    <div className="w-1/2 p-4">
        <img key={product.id} src={image} alt={product.name} className="mb-4 w-full" />
    </div>
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <div className="flex items-center mb-2">
        <div className="flex items-center text-pink-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.869 1.4-8.168L.132 9.21l8.2-1.192z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-gray-600">{product.clothingItemSize} reviews</span>
      </div>
      <p className="text-lg font-semibold">{product.gender}</p>
      <p className="text-lg italic">{product.status}</p>
      <p className="text-lg font-semibold">{product.type}</p>
      <p className="text-gray-600">{product.description}</p>
      <button onClick={handleNext} className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
      Next
      </button>
    </div>
  </div>
  );
};


const TradeModalContentNext = ({guestId, itemId, onClose}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [locationMessage, setLocationMessage] = useState('');
  const [error, setError] = useState('');
  const items = useSelector((state) => state.item.items);
  const userId = useSelector((state) => state.user.userId);
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch();

  const handleSendRequest = async () => {
    let errorMessage = '';
    if (!selectedItem) {
      errorMessage += 'Please select an item.\n';
    }
    if (!dateTime) {
      errorMessage += 'Please select a date and time.\n';
    }
    if (!locationMessage) {
      errorMessage += 'Please enter a location.\n';
    }
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const tradeRequest = {
      userId,
      userItemId: selectedItem,
      guestId,
      guestItemId: itemId,
      message,
      date: new Date(dateTime).toISOString(),
      location: locationMessage,
      token: token
    };
    const response = await requestTrade(tradeRequest);
    if(response.status === 200){
    dispatch(setPopup({
      title: 'Success',
      content: "Trade request sent successfully."
    }));
    }else{
      dispatch(setPopup({
        title: 'Error',
        content: "Failed to send trade request. Please try again."
    }));
    }
    dispatch(openPopup())
    setMessage('');
    setSelectedItem(null);
    setDateTime('');
    setLocationMessage('');
    setError('');
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select an Item</h2>
      <div className="flex flex-wrap gap-4 overflow-y-auto max-h-80 p-4">
        {items.length === 0 ? (
          <p className="text-gray-700">No items to trade</p>
        ) : (
          <ListingGrid
            page={page}
            setPage={setPage}
            isSmall={true}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            userId={userId}
          />
        )}
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Date and Time:</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded-lg"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
        <label className="block text-gray-700 mt-4">Location meetup point:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Enter location here..."
          value={locationMessage}
          onChange={(e) => setLocationMessage(e.target.value)}
        />
      </div>
      <textarea
        className="w-full mt-4 p-2 border rounded-lg resize-none"
        rows="3"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleSendRequest}
        className="mt-4 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
      >
        Send Trade Request
      </button>
    </div>
  );
};


const TradeModal = ({ isVisible, onClose, product , image, guestId}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 1, title: 'Tab 1', content: <TradeModalContent product={product} image={image} setCurrentStep={setCurrentStep} currentStep={currentStep}/> },
    { id: 2, title: 'Tab 2', content: <TradeModalContentNext guestId={guestId} itemId={product?.id}  onClose={onClose}/> }];
    
 

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl">
      <div className="flex justify-between items-center p-4 border-b">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div>
        <StepNavigation steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep}/>
      </div>
 
    </div>
  </div>
  );
};

export default TradeModal;