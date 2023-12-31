import './App.css';
import AboutTheApp from './components/AboutTheApp';
import CSVUploader from './components/CSVUploader';
import HeaderBar from './components/HeaderBar';
import SelectImage from './components/SelectImage';
import StepWise from './components/StepWise';

function App() {
  return (
    <div className="App">
      <HeaderBar></HeaderBar>
      <AboutTheApp></AboutTheApp>
      <StepWise></StepWise>
      <SelectImage></SelectImage>
      <CSVUploader></CSVUploader>
    </div>
  );
}

export default App;
