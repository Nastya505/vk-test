import React, { useState, useEffect } from 'react';

import { Panel, View, Link, useNavDirection } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import AgeGroup from '../ageGroup/ageGroup';
import FactGroup from '../factGroup/factGroup';

import styles from './view.module.css';



const ViewComponent = () => {
  const direction = useNavDirection();

  const [activePanel, setActivePanel] = useState('panel1');

  useEffect(() => {
    let timerId = null;
    if (direction === 'forwards') {
      timerId = setTimeout(() => {
        setActivePanel('panel2');
      }, 3000);
    }

    function loadData() {
      setActivePanel('panel1');
    }

    if (direction === 'backwards') {
      loadData();
    }
    return () => clearTimeout(timerId);
  }, [direction]);


  return (
    <div>
      <View activePanel={activePanel}>
        <Panel id="panel1" className={styles.panel}>
          <FactGroup/>
          <Link className={styles.link} onClick={() => setActivePanel('panel2')}>
            go to panel_2
        </Link>
        </Panel>

        <Panel id="panel2" className={styles.panel}>
          <AgeGroup/>
          <Link className={styles.link} onClick={() => setActivePanel('panel1')}>
            go to panel_1
        </Link>
        </Panel>
      </View>
    </div>
  );
};

export default ViewComponent;