import React from 'react';
import Header from '@/components/Header'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="dx-layout">
      <Header />
      <div className="dx-container">{children}</div>
    </div>
  );
};

export default Layout;
