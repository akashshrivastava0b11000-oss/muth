import React, { createContext, useContext, useState } from 'react';
import { Enquiry } from '../types';
import { storage } from '../services/storageService';

interface EnquiryContextType {
  enquiries: Enquiry[];
  sendEnquiry: (data: {
    senderId: string;
    senderName: string;
    senderVenture: string;
    recipientId: string;
    serviceTitle: string;
    budget: string;
    message: string;
  }) => Enquiry;
  replyToEnquiry: (enquiryId: string, sender: string, text: string) => void;
  updateStatus: (enquiryId: string, status: 'accepted' | 'declined') => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => storage.getEnquiries());

  const sendEnquiry = (data: {
    senderId: string;
    senderName: string;
    senderVenture: string;
    recipientId: string;
    serviceTitle: string;
    budget: string;
    message: string;
  }): Enquiry => {
    const newEnq = storage.addEnquiry({
      ...data,
      status: 'pending'
    });
    setEnquiries(storage.getEnquiries());
    return newEnq;
  };

  const replyToEnquiry = (enquiryId: string, sender: string, text: string) => {
    storage.respondToEnquiry(enquiryId, sender, text);
    setEnquiries(storage.getEnquiries());
  };

  const updateStatus = (enquiryId: string, status: 'accepted' | 'declined') => {
    const list = storage.getEnquiries();
    const target = list.find(e => e.id === enquiryId);
    if (target) {
      target.status = status;
      storage.saveEnquiries(list);
      setEnquiries([...list]);
    }
  };

  return (
    <EnquiryContext.Provider
      value={{
        enquiries,
        sendEnquiry,
        replyToEnquiry,
        updateStatus
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
};
