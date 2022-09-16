/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import OnIcon from '../../assets/ON.png';
import OffIcon from '../../assets/OFF.png';
import './App.css';

const Hello = () => {
  const [icon, setIcon] = useState(OffIcon);

  const handleSign = (onoff: string) => {
    console.log('ON/OFF: ', onoff);
    window.electron
      .onOff(null, onoff)
      .then((response: string) => {
        console.log(response);
        return '';
      })
      .catch((error: unknown) => {
        console.log(`Error: ${error}`);
      });
  };
  const updateIcon = () => {
    if (icon === OnIcon) {
      setIcon(OffIcon);
      handleSign('OFF');
    } else {
      setIcon(OnIcon);
      handleSign('ON');
    }
  };

  return (
    <div>
      <div className="Hello">
        <h1>On Air Sign</h1>
        <br />
        <div>
          <img width="256" alt="icon" src={icon} onClick={updateIcon} />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
