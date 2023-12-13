import React, { useState, useEffect } from 'react';
import { Drawer, Typography } from 'antd';

const { Title } = Typography;

const CaseManagerUtilizationDetails = ({setShowDetails, record}) => {
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
    title={`Case Manager Utilization Details`}
    placement="right"
    onClose={onClose}
    open={open}
    size={'large'}
    closable={false}
  >
    <p>hello {record.CaseManagerName}</p>
    <Title level={2}>Patients Data</Title>
  </Drawer>
</>

  );
};
export default CaseManagerUtilizationDetails;