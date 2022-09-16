/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import redball from '../../assets/Aqua-Ball-Red-icon.png';
import greenball from '../../assets/Aqua-Ball-Green-icon.png';
import './App.css';

const Hello = () => {
  const [icon, setIcon] = useState(redball);

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
    if (icon === redball) {
      setIcon(greenball);
      handleSign('OFF\n');
    } else {
      setIcon(redball);
      handleSign('ON\n');
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="256" alt="icon" src={icon} onClick={updateIcon} />
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
