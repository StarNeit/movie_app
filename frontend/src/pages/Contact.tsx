import React from 'react';
import { Send, User, Linkedin, MapPin, Github, Link, GraduationCap } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data
    alert('Your message has been sent!');
  };

  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__info">
          <div className="contact-page__card">
            <div className="d-flex flex-column align-items-center m-2">
              <div className="contact-page__card-avatar">
                <User />
              </div>
              <div className="contact-page__card-name">
                Aleks Dymitr
              </div>
            </div>

            <div className="contact-page__card-grid">
              <div className="contact-page__card-item">
                <div className="contact-page__card-icon">
                  <MapPin size={16} />
                </div>
                <p className="contact-page__card-text">
                  Poland
                </p>
              </div>
              <div className="contact-page__card-item">
                <div className="contact-page__card-icon">
                  <Linkedin size={16} />
                </div>
                <a href="#" className="contact-page__card-text link">
                  Linkedin
                </a>
              </div>

              <div className="contact-page__card-item">
                <div className="contact-page__card-icon">
                  <Github size={16} />
                </div>
                <a href="#" className="contact-page__card-text link">
                  Github
                </a>
              </div>

              <div className="contact-page__card-item">
                <div className="contact-page__card-icon">
                  <Link size={16} />
                </div>
                <a href="#" className="contact-page__card-text link">
                  Portfolio
                </a>
              </div>

              <div className="contact-page__card-item">
                <div className="contact-page__card-icon">
                  <GraduationCap size={16} />
                </div>
                <a href="#" className="contact-page__card-text link">
                  University
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-page__form">
          <form onSubmit={handleSubmit}>
            <div className="contact-page__group">
              <div className="contact-page__header">
                <h1>Contact Us</h1>
                <p className="text-muted">We'd love to hear from you. Send us a message!</p>
              </div>

              <label htmlFor="name" className="contact-page__label">Name</label>
              <input
                type="text"
                id="name"
                className="contact-page__input"
                placeholder="Your name"
                required
              />
            </div>

            <div className="contact-page__group">
              <label htmlFor="email" className="contact-page__label">Email</label>
              <input
                type="email"
                id="email"
                className="contact-page__input"
                placeholder="Your email address"
                required
              />
            </div>

            <div className="contact-page__group">
              <label htmlFor="message" className="contact-page__label">Message</label>
              <textarea
                id="message"
                className="contact-page__textarea"
                placeholder="What would you like to tell us?"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn--primary contact-page__submit">
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;