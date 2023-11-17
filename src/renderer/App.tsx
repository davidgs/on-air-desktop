/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint global-require: off, import/extensions: off */
import { useState } from 'react';
import { Lightbulb, LightbulbFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import OnOffComponent from './OnOffComponent';
import './App.css';

export default function App() {
  const [dark, setDark] = useState(true);

  const toggleDark = () => {
    if (!dark) {
      window.document
        .getElementsByTagName('html')[0]
        .setAttribute('data-bs-theme', 'dark');
    } else {
      window.document
        .getElementsByTagName('html')[0]
        .setAttribute('data-bs-theme', 'light');
    }
    setDark(!dark);
  };
  return (
    <div>
      <OnOffComponent type="SIGN" title="On Air Sign" />
      <OnOffComponent type="ORB" title="Glow Orb&nbsp;&nbsp;&nbsp;&nbsp;" />
      <OnOffComponent
        type="FOUNTAIN"
        title="Fountain&nbsp;&nbsp;&nbsp;&nbsp;"
      />
      <Button
        type="button"
        size="sm"
        onClick={toggleDark}
        className="btn"
        style={{
          color: dark ? '#ffffff' : '#212529',
          backgroundColor: dark ? '#ffffff' : '#212529',
          borderColor: !dark ? '#ffffff' : '#212529',
        }}
      >
        {dark ? <LightbulbFill size={20} /> : <Lightbulb size={20} />}
      </Button>
      <div>&nbsp;</div>
    </div>
  );
}
