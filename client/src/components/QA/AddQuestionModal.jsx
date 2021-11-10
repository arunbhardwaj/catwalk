import React, { useContext, useState } from 'react';
import Modal from '../shared/Modal.jsx';
import { QAContext } from './QAContext.jsx';
import Input from './Input.jsx';
import {
  InputContainer,
  LabelStyled,
  InputStyled,
  QuestionInput,
  UsernameInput,
  EmailInput,
} from '../styles/QA/AddQuestionModal.styled';
import { postQuestion } from '../../request.js';

const AddQuestionModal = () => {
  const { toggleModal, product_id } = useContext(QAContext);
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: 39334,
  });

  const handleChange = e => {
    let newData = { ...formData };
    newData[e.target.name] = e.target.value;
    setFormData(newData);
  };

  const handleSubmit = e => {
    console.log(formData);
    postQuestion(formData)
      .then((response) => console.log(response))
      .catch(err => console.error('There was an error >>>', err));
  };

  const inputs = [
    {
      label: 'Question',
      htmlFor: 'question-input',
      id: 'question-input',
      type: 'text',
      name: 'body',
      placeholder: 'Enter your question...',
    },
    {
      label: 'Username',
      htmlFor: 'username-input',
      id: 'username-input',
      type: 'text',
      name: 'name',
      placeholder: 'Enter your username...',
    },
    {
      label: 'Email',
      htmlFor: 'email-input',
      id: 'email-input',
      type: 'email',
      name: 'email',
      placeholder: 'john@smith.com',
    },
  ];

  return (
    <Modal toggleModal={toggleModal} headerText={"What's your question?"} handleSubmit={handleSubmit}>
      {inputs.map(({ label, htmlFor, id, type, name, placeholder }) => (
        <Input
          key={id}
          handleChange={handleChange}
          inputValue={formData[name]}
          label={label}
          htmlFor={htmlFor}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      ))}

      {/* <InputContainer>
        <LabelStyled htmlFor="username-input">Username</LabelStyled>
        <UsernameInput
          id="username-input"
          type="text"
          name="name"
          placeholder="Enter your username..."
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </InputContainer>
      <InputContainer>
        <LabelStyled htmlFor="email-input">Email</LabelStyled>
        <EmailInput
          id="email-input"
          type="email"
          name="email"
          placeholder="john@smith.com"
        />
      </InputContainer> */}
    </Modal>
  );
};

export default AddQuestionModal;
