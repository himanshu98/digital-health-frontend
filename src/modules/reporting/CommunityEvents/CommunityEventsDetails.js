import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';

const CommunityEventsDetails = ({setShowDetails, record}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
    setShowDetails(false);
  };
  useEffect(() => {
    if (setShowDetails && record) {
      setOpen(true);
    }
  }, [setShowDetails, record]);
  return (
    <>
      <Drawer
        title={`Community Event Details`}
        placement="right"
        onClose={onClose}
        open={open}
        size={'large'}
        closable={false}
      >
        <p>{record.name}</p>
      </Drawer>
    </>
  );
};
export default CommunityEventsDetails;