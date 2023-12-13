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
    title={`Community Event Details - ${record.communityActivityName}`}
    placement="right"
    onClose={onClose}
    open={open}
    size={'large'}
    closable={false}
  >
    <p><strong>Community Activity Name:</strong> {record.communityActivityName}</p>
    <p><strong>Hours:</strong> {record.hours}</p>
    <p><strong>Objectives:</strong> {record.objectives}</p>
    <p><strong>Outcomes:</strong> {record.outcomes}</p>
    <p><strong>Issue Area Name:</strong> {record.issueAreaName}</p>
    <p><strong>Primary Entities:</strong> {record.primaryEntities.map(entity => entity.primaryEntityName).join(', ')}</p>
    <p><strong>Activity Types:</strong> {record.activityTypes.map(type => type.activityTypeName).join(', ')}</p>
  </Drawer>
</>

  );
};
export default CommunityEventsDetails;