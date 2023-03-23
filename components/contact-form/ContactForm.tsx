'use client'

import React, { useState } from 'react';
import styles from './contactForm.module.css';


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStep, setFormStep] = useState('form'); // 1 = Form, 2 = Waiting response, 3 = Success

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!event) return;

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    setErrors({
      ...errors,
      [event.target.name]: ""
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let valid = true;
    if (formData.name.trim().length === 0) {
      setErrors({
        ...errors,
        name: "*Name is required"
      });
      valid = false;
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setErrors({
        ...errors,
        email: "*Email is invalid"
      });
      valid = false;
    }
    else if (formData.message.trim().length === 0) {
      setErrors({
        ...errors,
        message: "*Message is required"
      });
      valid = false;
    }
    if (valid) {
      setFormStep('waiting')
      fetch('/api/contactFormAPI', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      }).then(res => res.json()).then(res => {
        if (res.status === 'success')
          setFormStep('success');
        else
          setFormStep('error');
      }).catch(err => {
        console.error(err);
        setFormStep('error');
      })
    }
  }

  const formContent =
    <div className={styles.formStep}>
      <form onSubmit={handleSubmit}>
        <label className={styles.labelName}>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
        </label>
        <label className={styles.labelEmail}>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </label>
        <label className={styles.labelMessage}>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} />
          {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
        </label>
        <button type="submit">Send</button>
      </form>
    </div>;

  const waitingContent = <span>Sending email...</span>;
  const successContent = <span>Success!</span>;
  const errorContent = <span>ERROR</span>;

  function getContent() {
    switch (formStep) {
      case 'form':
        return formContent;
        break;

      case 'waiting':
        return waitingContent;
        break;

      case 'success':
        return successContent;
        break;

      case 'error':
        return errorContent;
        break;

      default:
        return errorContent;
        break;
    }
  }

  return (
    <div className={styles.formWrapper}>
      {getContent()}
    </div>
  )

}