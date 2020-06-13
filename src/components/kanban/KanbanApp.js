import React from 'react';
import MainPage from './components/MainPage';
function KanbanApp(props) {
  document.title = 'Kanban | Edunomics'
  document.body.style.backgroundColor = "white"
  return (
    <div>
      <MainPage />
    </div>
  );
}

export default KanbanApp;
