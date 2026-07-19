import SectionTitle from '../common/SectionTitle.jsx';
import ContactItem from './ContactItem.jsx';
import ContactForm from './ContactForm.jsx';
import { contacts } from '../../data/contacts.js';

export default function Contact() {
  return (
    <section className="contact section-content" id="contact">
      <SectionTitle heading="Contacts" tagline="Hire me." />
      <div className="text-left description">
        <div className="contactsList">
          {contacts.map((c) => (
            <ContactItem key={c.label} {...c} />
          ))}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
