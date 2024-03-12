import React, {useState, useRef} from 'react'
import debounce from 'lodash/debounce'; 
import { Header, Button, Group} from '@vkontakte/vkui';
import axios from 'axios';
import styles from "../view/view.module.css";


const API = "https://api.agify.io"

const AgeGroup = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState('');

const fetchAgeFromApi = async (inputName) => {
  try {
    setLoading(true);
    const response = await axios.get(`${API}/?name=${inputName}`);
    setAge(response.data.age);
  } catch (error) {
    console.error('Error fetching age:', error);
  } finally {
    setLoading(false);
  }
};

  const debouncedFetchAge = useRef(debounce(fetchAgeFromApi, 3000));

  const handleNameChange = (event) => {
    const inputName = event.target.value;
    if (/^[a-zA-Z]+$/.test(inputName) || inputName === '') {
      setInputError('');
      setName(inputName);
      debouncedFetchAge.current(inputName);
    } else {
      setInputError('The name can only consist of Latin letters');
    }
  };
const handleSubmit = async () => {
  if (/^[a-zA-Z]+$/.test(name)) {
    setInputError('');
    setLoading(true);
    try {

    } catch (error) {
      console.error('Error submitting name:', error);
    } finally {
      setLoading(false);
    }
  } else {
    setInputError('The name can only consist of Latin letters');
  }
};

  return (
    <Group>
      <Header>Age</Header>
      {inputError && <div className={styles.error}>{inputError}</div>}
      <div className={styles.wrapper}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className={styles.input}
        />
        <Button size="l" mode="primary" onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
      </div>
      <div  className={styles.text}>{age && `Age: ${age}`}</div>
    </Group>
  )
}

export default AgeGroup;