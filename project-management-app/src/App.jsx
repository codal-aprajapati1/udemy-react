import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text){
    setProjectState(prevState => {
      const textId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: textId
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    });
  }

  function handleDeleteTask(taskId){
    setProjectState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== taskId),
      }
    })
  }

  function handleSelectProject(projectId){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: projectId
      }
    })
  }

  function handleDeleteProject(projectId){
    setProjectState(prevState => {
      return{
        ...prevState,
        projects: prevState.projects.filter(project => project.id !== projectId),
        selectedProjectId: undefined
      }
    })
  }

  function handeStateAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  console.log(projectState);

  const selectedproject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = (
  <SelectedProject 
    onAddTask={handleAddTask} 
    onDeleteTask={handleDeleteTask} 
    onDelete={handleDeleteProject} 
    project={selectedproject} 
    tasks={projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId)}
  />
  );

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  }else if (projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handeStateAddProject} />;
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onSelectProject={handleSelectProject} 
        onStartAddProject={handeStateAddProject} 
        projects={projectState.projects} 
        selectedProjectId={projectState.selectedProjectId}
        />
      {content}
    </main>
  );
}

export default App;
