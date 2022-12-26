import React, { useState } from 'react';
import Message from '../Message';
import Input from '../Input';

const Messages = () => {
  const [owner] = useState(true);
  const [moreMessage] = useState(true);
  return (
    <div className='messages'>
      <div
        className={`bg-gray-200 show-messages ${
          moreMessage ? 'scroll-view' : ''
        }`}
      >
        <Message owner={true} />
        <Message owner={false} />
        <Message owner={true} />
        <Message owner={true} />
        <Message owner={false} />
        <Message owner={false} />
      </div>
      <div>
        <Input />
      </div>
    </div>
  );
};

export default Messages;
