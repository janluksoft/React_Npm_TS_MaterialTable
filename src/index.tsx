import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import ClockMub from './MClock';
import BasicTab from './config_table';


type xArg = { xinfo: string };

function DApp() {
  return (
    <div>
      <table>
        <tr>
          <td><BasicTab /></td>
        </tr>
      </table>
    </div>
    );
}

const root = ReactDOM.createRoot(
  document.getElementById('React_container1') as HTMLElement
);
root.render(
    <DApp />
);
