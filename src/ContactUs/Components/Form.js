import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Loader2, Send } from "lucide-react";
import BASEURL from "../../BaseUrl";
import { toast } from "react-toastify";
function Form() {
  const [formData, setFormData] = useState({
    enquiryType: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const enquiryOptions = [
    { label: "General Enquiry", value: "General Enquiry" },
    { label: "Sales", value: "Sales" },
    { label: "Technical Support", value: "Technical Support" },
    { label: "Jobs & Careers", value: "Jobs & Careers" },
    { label: "Complaints", value: "Complaints" },
  ];

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.value ?? e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASEURL}/api/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Form submitted successfully ✅");
        setFormData({
          enquiryType: null,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setLoading(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.success("Something went wrong ❌");
      setLoading(false);
    }
  };
  return (
    <div className="px-[3vw] lg:px-[2.34375vw] flex flex-col lg:flex-row justify-between lg:items-center lg:gap-[3vw]">
      {/* Left Section*/}
      <div className="pt-[20px] sm:py-[30px] lg:py-[40px] lg:w-[80%]">
        <h1 className="text-[clamp(20px,7vw,120px)] sm:text-[clamp(20px,5.6vw,120px)] lg:text-[clamp(20px,4.5vw,120px)] capitalize leading-normal font-medium font-[Poppins]">
          Get in
          <br /> Touch With Us
        </h1>
        <h3 className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] font-light lg:text-[clamp(10px,1vw,40px)]">
          To make sure your enquiry reaches the right department, please
          complete the form below with as much detail as possible. Our team will
          review your message and get back to you as soon as we can.
        </h3>
        <h3 className="pt-6 text-[clamp(12px,3vw,40px)] sm:text-[clamp(12px,2.3vw,30px)] lg:text-[clamp(10px,1.2vw,40px)] italic font-medium">
          This enquiry form is sent directly to the Archiworld support team. If
          your question relates to a specific product, supplier, or professional
          featured on our platform, please contact them directly through their
          listing for the fastest response.
        </h3>
        <div className="py-[24px] sm:py-[30px] lg:py-[40px] flex flex-col lg:flex-row justify-center gap-6">
          <div className="p-[4vw] sm:p-[3vw] lg:p-[1.5vw] w-full bg-[var(--primary)] rounded-3xl flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-[clamp(20px,3.5vw,120px)] sm:text-[clamp(20px,3vw,120px)] lg:text-[clamp(20px,1.5vw,120px)] mb-2">
                For Sales
              </h2>
              <h3 className="text-[clamp(12px,2.2vw,40px)] sm:text-[clamp(12px,2vw,30px)] font-light lg:text-[clamp(10px,0.9vw,40px)]">
                Interested in becoming a sales? Learn more about partnership
                opportunities and how to list your products on our platform.
              </h3>
            </div>
            <div className="text-[clamp(12px,2.2vw,40px)] sm:text-[clamp(12px,2vw,30px)] font-light lg:text-[clamp(10px,0.9vw,40px)] border-t border-black pt-3">
              <h2>
                Email:{" "}
                <a
                  className="cursor-pointer hover:underline font-bold"
                  href="mailTo:sales@archiworld.in"
                >
                  sales@archiworld.in
                </a>
              </h2>
              <h3>
                Phone:{" "}
                <a
                  href="tel:+919999999999"
                  className="cursor-pointer hover:underline font-bold"
                >
                  +91 99999 99999
                </a>
              </h3>
            </div>
          </div>
          <div className="p-[4vw] sm:p-[3vw] lg:p-[1.5vw] w-full bg-[var(--primary)] rounded-3xl flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-[clamp(20px,3.5vw,120px)] sm:text-[clamp(20px,3vw,120px)] lg:text-[clamp(20px,1.5vw,120px)] mb-2">
                For Support
              </h2>
              <h3 className="text-[clamp(12px,2.2vw,40px)] sm:text-[clamp(12px,2vw,30px)] font-light lg:text-[clamp(10px,0.9vw,40px)]">
                Need help with an existing order or have a technical question?
                Visit our support center for quick answers.
              </h3>
            </div>
            <div className="text-[clamp(12px,2.2vw,40px)] sm:text-[clamp(12px,2vw,30px)] font-light lg:text-[clamp(10px,0.9vw,40px)] border-t border-black pt-3">
              <h2>
                Email:{" "}
                <a
                  href="mailTo:sales@archiworld.in"
                  className="cursor-pointer hover:underline font-bold"
                >
                  sales@archiworld.in
                </a>
              </h2>
              <h3>
                Phone:{" "}
                <a
                  href="tel:+919999999999"
                  className="cursor-pointer hover:underline font-bold"
                >
                  +91 99999 99999
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Right Section Form*/}
      <div className="px-[15px] py-[10px] sm:px-[20px] sm:py-[15px] lg:px-[30px] lg:py-[20px] w-full bg-[var(--primary)] rounded-3xl">
        <h2 className="text-[clamp(20px,4.5vw,120px)] sm:text-[clamp(20px,4vw,120px)] lg:text-[clamp(20px,2.5vw,120px)] mb-2">
          Send us a Message
        </h2>
        <h3 className="text-[clamp(12px,2.5vw,40px)] sm:text-[clamp(12px,2vw,30px)] font-light lg:text-[clamp(10px,1vw,40px)]">
          Fill out the form below and our team will get back to you within 24
          hours
        </h3>
        <form onSubmit={handleSubmit} className="p-3 lg:p-5">
          {/* Enquiry Type */}
          <div className="flex flex-col mb-3">
            <label className="block mb-2">
              Select enquiry type <span className="text-red-600">*</span>
            </label>
            <Dropdown
              value={formData.enquiryType}
              options={enquiryOptions}
              onChange={(e) => handleChange(e, "enquiryType")}
              placeholder="Select enquiry type"
              checkmark
              className="shadow-none px-5 rounded-full py-1"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-2 justify-center items-center w-full mb-3">
            {/* First Name */}
            <div className="flex flex-col w-full">
              <label className="block mb-2">
                First name <span className="text-red-600">*</span>
              </label>
              <InputText
                value={formData.firstName}
                required
                onChange={(e) => handleChange(e, "firstName")}
                placeholder="Enter first name"
                className="shadow-none px-5 rounded-full py-3"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col w-full">
              <label className="block mb-2">
                Last name <span className="text-red-600">*</span>
              </label>
              <InputText
                value={formData.lastName}
                required
                onChange={(e) => handleChange(e, "lastName")}
                placeholder="Enter last name"
                className="shadow-none px-5 rounded-full py-3"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 justify-center items-center w-full mb-3">
            {/* Email */}
            <div className="flex flex-col w-full">
              <label className="block mb-2">
                Email <span className="text-red-600">*</span>
              </label>
              <InputText
                value={formData.email}
                required
                type="email"
                onChange={(e) => handleChange(e, "email")}
                placeholder="Enter email"
                className="shadow-none px-5 rounded-full py-3"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col w-full">
              <label className="block mb-2">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <InputText
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleChange(e, "phone")}
                placeholder="Enter phone number"
                className="shadow-none px-5 rounded-full py-3"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col w-full mb-3">
            <label className="block mb-2">Message</label>
            <InputTextarea
              value={formData.message}
              onChange={(e) => handleChange(e, "message")}
              rows={5}
              placeholder="Please be descriptive with your enquiry"
              checkmark
              className="shadow-none px-5 rounded-md py-3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex gap-1 bg-black text-white justify-center items-center px-10 py-3 mt-7 border-black border lg:hover:bg-white lg:hover:text-black transition-all ease-in duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send />
                Send
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
