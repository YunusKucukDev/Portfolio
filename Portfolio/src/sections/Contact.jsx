import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { useTranslation } from "react-i18next"; // 1. Import ekle

const Contact = () => {
  const { t } = useTranslation(); // 2. Hook'u tanımla
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_uhyao88",
        "template_ht7ifdh",
        {
          from_name: formData.name,
          to_name: "Yunus",
          from_email: formData.email,
          to_email: "yunus.kucuk.dev@gmail.com",
          message: formData.message,
        },
        "Rf7g6Qr1t1uPRLUz4"
      );

      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      // Çeviri: Başarı mesajı
      showAlertMessage("success", t("contact_success_msg"));
    } catch (error) {
      setIsLoading(false);
      console.error("EmailJS Error:", error);
      // Çeviri: Hata mesajı
      showAlertMessage("danger", t("contact_error_msg"));
    }
  };

  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">{t("contact_title")}</h2>
        </div>
        
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              {t("contact_name_label")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="field-label">
              {t("contact_email_label")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="field-label">
              {t("contact_message_label")}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="field-input field-input-focus"
              placeholder={t("contact_placeholder")}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLoading ? t("contact_sending") : t("contact_send_btn")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;