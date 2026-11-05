import React, { createContext, useContext, useState, useEffect } from 'react';
import { Venture, StartupStage } from '../types';
import { storage } from '../services/storageService';
import { useAuth } from './AuthContext';

interface VentureContextType {
  ventures: Venture[];
  activeVenture: Venture | null;
  setActiveVentureId: (id: string) => void;
  createVenture: (data: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
    location: string;
    stage: StartupStage;
    businessModel: string;
    targetAudience: string;
    problemSolved: string;
  }) => Venture;
  updateVenture: (venture: Venture) => void;
  deleteVenture: (id: string) => void;
  archiveVenture: (id: string) => void;
  toggleSaveOpportunity: (oppId: string) => void;
  isOpportunitySaved: (oppId: string) => boolean;
  toggleSaveResource: (resId: string) => void;
  isResourceSaved: (resId: string) => boolean;
  toggleMilestone: (milestoneId: string) => void;
  addMilestone: (title: string, stage: StartupStage, dueDate?: string) => void;
}

const VentureContext = createContext<VentureContextType | undefined>(undefined);

export const VentureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [ventures, setVentures] = useState<Venture[]>(() => storage.getVentures());
  const [activeVentureId, setActiveIdState] = useState<string>(() => storage.getActiveVentureId());

  // Filter ventures owned by current user (or demo ventures if demo user)
  const userVentures = ventures.filter(v => !user || v.userId === user.id || user.id === 'user-demo-founder');

  const activeVenture = userVentures.find(v => v.id === activeVentureId && !v.isArchived) || userVentures[0] || null;

  useEffect(() => {
    storage.saveVentures(ventures);
  }, [ventures]);

  const setActiveVentureId = (id: string) => {
    setActiveIdState(id);
    storage.setActiveVentureId(id);
  };

  const createVenture = (data: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
    location: string;
    stage: StartupStage;
    businessModel: string;
    targetAudience: string;
    problemSolved: string;
  }): Venture => {
    const newVenture = storage.addVenture({
      userId: user?.id || 'user-demo-founder',
      ...data,
      isArchived: false
    });
    setVentures(storage.getVentures());
    setActiveVentureId(newVenture.id);
    return newVenture;
  };

  const updateVenture = (updated: Venture) => {
    storage.updateVenture(updated);
    setVentures(storage.getVentures());
  };

  const deleteVenture = (id: string) => {
    storage.deleteVenture(id);
    const updated = storage.getVentures();
    setVentures(updated);
    if (activeVentureId === id) {
      const remaining = updated.filter(v => !v.isArchived);
      if (remaining.length > 0) {
        setActiveVentureId(remaining[0].id);
      }
    }
  };

  const archiveVenture = (id: string) => {
    const v = ventures.find(item => item.id === id);
    if (v) {
      const updated = { ...v, isArchived: !v.isArchived };
      updateVenture(updated);
    }
  };

  const toggleSaveOpportunity = (oppId: string) => {
    if (!activeVenture) return;
    const isSaved = activeVenture.savedOpportunityIds.includes(oppId);
    const newSaved = isSaved
      ? activeVenture.savedOpportunityIds.filter(id => id !== oppId)
      : [...activeVenture.savedOpportunityIds, oppId];

    const updated = { ...activeVenture, savedOpportunityIds: newSaved };
    updateVenture(updated);
  };

  const isOpportunitySaved = (oppId: string): boolean => {
    return activeVenture?.savedOpportunityIds?.includes(oppId) || false;
  };

  const toggleSaveResource = (resId: string) => {
    if (!activeVenture) return;
    const isSaved = activeVenture.savedResourceIds?.includes(resId) || false;
    const newSaved = isSaved
      ? activeVenture.savedResourceIds.filter(id => id !== resId)
      : [...(activeVenture.savedResourceIds || []), resId];

    const updated = { ...activeVenture, savedResourceIds: newSaved };
    updateVenture(updated);
  };

  const isResourceSaved = (resId: string): boolean => {
    return activeVenture?.savedResourceIds?.includes(resId) || false;
  };

  const toggleMilestone = (milestoneId: string) => {
    if (!activeVenture) return;
    const updatedMilestones = activeVenture.milestones.map(m =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    updateVenture({ ...activeVenture, milestones: updatedMilestones });
  };

  const addMilestone = (title: string, stage: StartupStage, dueDate?: string) => {
    if (!activeVenture) return;
    const newMilestone = {
      id: `m-${Date.now()}`,
      title,
      stage,
      completed: false,
      dueDate
    };
    updateVenture({
      ...activeVenture,
      milestones: [...activeVenture.milestones, newMilestone]
    });
  };

  return (
    <VentureContext.Provider
      value={{
        ventures: userVentures,
        activeVenture,
        setActiveVentureId,
        createVenture,
        updateVenture,
        deleteVenture,
        archiveVenture,
        toggleSaveOpportunity,
        isOpportunitySaved,
        toggleSaveResource,
        isResourceSaved,
        toggleMilestone,
        addMilestone
      }}
    >
      {children}
    </VentureContext.Provider>
  );
};

export const useVenture = () => {
  const context = useContext(VentureContext);
  if (!context) {
    throw new Error('useVenture must be used within a VentureProvider');
  }
  return context;
};
