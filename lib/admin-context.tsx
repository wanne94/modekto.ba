'use client';

import React, { createContext, useContext, useState } from 'react';
import { HouseDesign } from '../types';
import { MOCK_HOUSES } from './projects';
import { Upit, ChatSesija, MOCK_UPITI, MOCK_CHAT_SESIJE } from './admin-mock-data';

export type { Upit, ChatSesija };

interface AdminContextType {
  projects: HouseDesign[];
  addProject: (project: Omit<HouseDesign, 'id'>) => void;
  updateProject: (id: string, project: Partial<HouseDesign>) => void;
  deleteProject: (id: string) => void;
  upiti: Upit[];
  updateUpit: (id: string, status: Upit['status']) => void;
  chatSesije: ChatSesija[];
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<HouseDesign[]>([...MOCK_HOUSES]);
  const [upiti, setUpiti] = useState<Upit[]>([...MOCK_UPITI]);
  const [chatSesije] = useState<ChatSesija[]>([...MOCK_CHAT_SESIJE]);

  const addProject = (project: Omit<HouseDesign, 'id'>) => {
    const newProject: HouseDesign = { ...project, id: String(Date.now()) };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<HouseDesign>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateUpit = (id: string, status: Upit['status']) => {
    setUpiti((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <AdminContext.Provider value={{ projects, addProject, updateProject, deleteProject, upiti, updateUpit, chatSesije }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin mora biti unutar AdminProvider-a');
  return ctx;
}
