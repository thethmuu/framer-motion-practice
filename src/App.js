import './styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const initialSkills = [
  {
    id: 1,
    name: 'sleeping during a lecture',
  },
  {
    id: 2,
    name: 'procrastination',
  },
  {
    id: 3,
    name: 'can sleep in any situation',
  },
];

export default function App() {
  const [skills, setSkills] = useState(initialSkills);
  const inputRef = useRef(null);

  function getRandom() {
    return Math.floor(Math.random() * 100 + 1);
  }

  function addSkill(e) {
    e.preventDefault();
    if (inputRef.current.value !== '') {
      setSkills([...skills, { id: getRandom(), name: inputRef.current.value }]);
      inputRef.current.value = '';
    }
  }

  function removeSkill(id) {
    setSkills(skills.filter((skill) => skill.id !== id));
  }

  return (
    <div className='App'>
      <h1>Skill List</h1>

      <form onSubmit={addSkill}>
        <input className='input' type='text' ref={inputRef} required />
        <button className='add-btn' type='submit'>
          Add
        </button>
      </form>

      <SkillList skills={skills} removeSkill={removeSkill} />
    </div>
  );
}

function SkillList({ skills, removeSkill }) {
  return (
    <ul className='skill-list'>
      {skills.length > 0 ? (
        skills.map((skill) => (
          <li className='skill-item' key={skill.id}>
            {skill.name}
            <button className='del-btn' onClick={() => removeSkill(skill.id)}>
              <span className='del-icon' role='img' aria-label='cross icon'>
                ❎
              </span>
            </button>
          </li>
        ))
      ) : (
        <p>no item currently...</p>
      )}
    </ul>
  );
}
