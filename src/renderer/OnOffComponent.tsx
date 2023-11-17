import { useState } from 'react';

const OnIcon = require('../../assets/images/ON.png');
const OffIcon = require('../../assets/images/OFF.png');

export default function OnOffComponent({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  const [icon, setIcon] = useState(OffIcon);

  const handleSign = (onoff: string, signType: string) => {
    window.electron
      .onOffSign(null, signType, onoff)
      .then(() => {
        return '';
      })
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.log(`Error: ${error}`);
      });
  };

  const updateIcon = () => {
    if (icon === OnIcon) {
      setIcon(OffIcon);
      handleSign('OFF', type);
    } else {
      setIcon(OnIcon);
      handleSign('ON', type);
    }
  };

  window.electron?.ipcRenderer.on(type.toUpperCase(), () => {
    updateIcon();
  });

  return (
    <div>
      <div className="Hello">
        <h1>{title}</h1>
        <br />
        <div>
          <button type="button" onClick={updateIcon}>
            <img
              width="256"
              alt="icon"
              src={icon}
              style={{ textAlign: 'right' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
