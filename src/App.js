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
      <motion.h1
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Skill List
      </motion.h1>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onSubmit={addSkill}
      >
        <input className='input' type='text' ref={inputRef} required />
        <button className='add-btn' type='submit'>
          Add
        </button>
      </motion.form>

      <SkillList skills={skills} removeSkill={removeSkill} />
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
  transition: { duration: 2 },
};

function SkillList({ skills, removeSkill }) {
  return (
    <ul className='skill-list'>
      <AnimatePresence>
        {skills.length > 0 ? (
          skills.map((skill) => (
            <motion.li
              variants={itemVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='skill-item'
              key={skill.id}
            >
              {skill.name}
              <button className='del-btn' onClick={() => removeSkill(skill.id)}>
                <span className='del-icon' role='img' aria-label='cross icon'>
                  ❎
                </span>
              </button>
            </motion.li>
          ))
        ) : (
          <p>no item currently...</p>
        )}
      </AnimatePresence>
    </ul>
  );
}
