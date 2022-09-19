import React, { useRef } from 'react';

interface Props {
  todo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setToDo, handleSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleSubmit}>
      <label>Name :</label>
      <input
        ref={inputRef}
        type="text"
        name="name"
        value={todo}
        onChange={(e) => setToDo(e.target.value)}
      />
      <button type={`submit`}>Save</button>
    </form>
  );
};

export default InputField;
