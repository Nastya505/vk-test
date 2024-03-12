import React, { useState, useRef} from 'react'
import { Header, CellButton, Group,} from '@vkontakte/vkui';
import axios from 'axios';
import styles from "../view/view.module.css";


const API = 'https://catfact.ninja/fact';

const FactGroup = () => {
    const [fact, setFact] = useState('');
    const factInputRef = useRef(null);
    const fetchCatFact = async () => {
        try {
          const response = await axios.get(API);
          setFact(response.data.fact);
          if (factInputRef.current) {
            factInputRef.current.value = response.data.fact;
            factInputRef.current.focus();
            factInputRef.current.selectionStart = response.data.fact.indexOf(' ')
          }
        } catch (error) {
          console.error('Error fetching cat fact:', error);
        }
      };
  return (
    <Group>
        <Header>Fact</Header>
        <textarea
            ref={factInputRef}
            className={styles.textarea}
            value={fact}
        />
        <CellButton onClick={fetchCatFact}>Go Cat Fact</CellButton>
    </Group>
  )
}

export default FactGroup