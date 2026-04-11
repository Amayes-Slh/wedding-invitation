import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import siteConfig from "../data/siteConfig";

const { serviceId, templateId, publicKey } = siteConfig.emailjs;

function RsvpForm({ title, subtitle }) {
  const nameRef = useRef(null);
  const attendanceRef = useRef(null);
  const messageRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const templateParams = {
      guest_name: nameRef.current.value,
      attendance: attendanceRef.current.value,
      message: messageRef.current.value,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
      setStatus("success");
      nameRef.current.value = "";
      attendanceRef.current.value = "";
      messageRef.current.value = "";
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  }

  return (
    <section className="section card">
      <h2>{title}</h2>
      <p className="muted">{subtitle}</p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          required
          ref={nameRef}
          placeholder="Nom complet"
          disabled={status === "sending"}
        />
        <select
          required
          ref={attendanceRef}
          defaultValue=""
          disabled={status === "sending"}
        >
          <option value="" disabled>Présence</option>
          <option value="Oui, je serai présent(e)">Oui, je serai présent(e)</option>
          <option value="Je ne pourrai pas être présent(e)">Je ne pourrai pas être présent(e)</option>
        </select>
        <textarea
          rows="4"
          ref={messageRef}
          placeholder="Message pour les mariés"
          disabled={status === "sending"}
        />
        <button
          className="primary-btn"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer la confirmation"}
        </button>
      </form>

      {status === "success" && (
        <p className="success">Merci, ta réponse a bien été enregistrée. 💌</p>
      )}
      {status === "error" && (
        <p className="error">Une erreur est survenue, merci de réessayer.</p>
      )}
    </section>
  );
}

export default RsvpForm;
