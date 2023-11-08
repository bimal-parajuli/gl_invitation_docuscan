import './App.css';
import ImageForm from './components/ImageForm';
import HeaderBar from './components/HeaderBar';
import StepWise from './components/StepWise';

function App() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <StepWise></StepWise>
      <ImageForm></ImageForm>
    </div>
  );
}

export default App;
