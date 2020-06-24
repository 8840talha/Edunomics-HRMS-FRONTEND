import React from 'react';
import { useLocation } from 'react-router-dom'
import MainPage from './components/MainPage';

function KanbanApp(props) {
  document.title = 'Kanban | Edunomics'
  const location = useLocation()
  return (
    <div>
      <MainPage location={location} />
    </div>
  );
}

export default KanbanApp;