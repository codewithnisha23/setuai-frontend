import { useState } from "react";

function App() {
  const [language, setLanguage] = useState("en");
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const [profile, setProfile] = useState({
    income: "",
    occupation: "Student",
    category: "General"
  });

  // 🔊 Voice Output
  const speakResponse = (text) => {
    if (lowBandwidth) return;

    const speech = new SpeechSynthesisUtterance(text);

    const languageMap = {
      en: "en-IN",
      hi: "hi-IN",
      ta: "ta-IN",
      bn: "bn-IN",
      mr: "mr-IN"
    };

    speech.lang = languageMap[language] || "en-IN";

    window.speechSynthesis.speak(speech);
  };

  // 🚀 Send Query to Backend
  const sendQuery = async () => {
    if (!profile.income) {
      alert(language === "en" ? "Enter income" : "आय दर्ज करें");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://setuai-backend.onrender.com/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            income: Number(profile.income),
            occupation: profile.occupation,
            category: profile.category,
            language: language
          }
        }),
      });

      const data = await res.json();

      setResponse(data.response);

      speakResponse(data.response);

    } catch (error) {
      console.error("Frontend Error:", error);
      setResponse("Something went wrong.");
    }

    setLoading(false);
  };

  const demoStudent = () => {
    setProfile({ income: 150000, occupation: "Student", category: "OBC" });
  };

  const demoFarmer = () => {
    setProfile({ income: 200000, occupation: "Farmer", category: "General" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "750px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "16px"
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          SetuAI 🇮🇳 – AI for Bharat
        </h1>

        {/* 🌍 Language Selector */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ta">தமிழ்</option>
            <option value="bn">বাংলা</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <h3>
          {language === "en"
            ? "Profile Information"
            : language === "hi"
            ? "प्रोफ़ाइल जानकारी"
            : language === "ta"
            ? "சுயவிவர தகவல்"
            : language === "bn"
            ? "প্রোফাইল তথ্য"
            : "प्रोफाइल माहिती"}
        </h3>

        {/* Income */}
        <input
          type="number"
          placeholder={
            language === "en"
              ? "Annual Income"
              : language === "hi"
              ? "वार्षिक आय"
              : language === "ta"
              ? "வருடாந்திர வருமானம்"
              : language === "bn"
              ? "বার্ষিক আয়"
              : "वार्षिक उत्पन्न"
          }
          value={profile.income}
          onChange={(e) =>
            setProfile({ ...profile, income: e.target.value })
          }
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px"
          }}
        />

        {/* Occupation */}
        <select
          value={profile.occupation}
          onChange={(e) =>
            setProfile({ ...profile, occupation: e.target.value })
          }
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px"
          }}
        >
          <option value="Student">
            {language === "en"
              ? "Student"
              : language === "hi"
              ? "छात्र"
              : language === "ta"
              ? "மாணவர்"
              : language === "bn"
              ? "ছাত্র"
              : "विद्यार्थी"}
          </option>
          <option value="Farmer">
            {language === "en"
              ? "Farmer"
              : language === "hi"
              ? "किसान"
              : language === "ta"
              ? "விவசாயி"
              : language === "bn"
              ? "কৃষক"
              : "शेतकरी"}
          </option>
        </select>

        {/* Category */}
        <select
  value={profile.category}
  onChange={(e) =>
    setProfile({ ...profile, category: e.target.value })
  }
  style={{
    width: "100%",
    padding: "8px"
  }}
>
  <option value="General">
    {language === "en"
      ? "General"
      : language === "hi"
      ? "सामान्य"
      : language === "ta"
      ? "பொது"
      : language === "bn"
      ? "সাধারণ"
      : "सामान्य"}
  </option>

  <option value="OBC">
    {language === "en"
      ? "OBC"
      : language === "hi"
      ? "अन्य पिछड़ा वर्ग"
      : language === "ta"
      ? "பின்தங்கிய வகுப்பு"
      : language === "bn"
      ? "অন্যান্য অনগ্রসর শ্রেণী"
      : "इतर मागासवर्ग"}
  </option>

  <option value="SC">
    {language === "en"
      ? "SC"
      : language === "hi"
      ? "अनुसूचित जाति"
      : language === "ta"
      ? "திட்டமிட்ட சாதி"
      : language === "bn"
      ? "তফসিলি জাতি"
      : "अनुसूचित जात"}
  </option>

  <option value="ST">
    {language === "en"
      ? "ST"
      : language === "hi"
      ? "अनुसूचित जनजाति"
      : language === "ta"
      ? "திட்டமிட்ட பழங்குடி"
      : language === "bn"
      ? "তফসিলি উপজাতি"
      : "अनुसूचित जमात"}
  </option>
</select>

        {/* Demo Buttons */}
        <div style={{ marginTop: "15px" }}>
          <button onClick={demoStudent} style={{ marginRight: "10px" }}>
            🎓 Demo Student
          </button>
          <button onClick={demoFarmer}>
            🚜 Demo Farmer
          </button>
        </div>

        {/* Low Bandwidth */}
        <div style={{ marginTop: "15px" }}>
          <label>
            <input
              type="checkbox"
              checked={lowBandwidth}
              onChange={() => setLowBandwidth(!lowBandwidth)}
            />{" "}
            {language === "en"
              ? "Low Bandwidth Mode"
              : language === "hi"
              ? "लो बैंडविड्थ मोड"
              : language === "ta"
              ? "குறைந்த பாண்ட்விட்த் முறை"
              : language === "bn"
              ? "লো ব্যান্ডউইথ মোড"
              : "लो बँडविड्थ मोड"}
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={sendQuery}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px"
          }}
        >
          {language === "en"
            ? "Find Eligible Schemes"
            : language === "hi"
            ? "योग्य योजनाएँ खोजें"
            : language === "ta"
            ? "தகுதியான திட்டங்களை காண்க"
            : language === "bn"
            ? "যোগ্য প্রকল্প খুঁজুন"
            : "पात्र योजना शोधा"}
        </button>

        {/* Response */}
        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            background: "#0f172a",
            padding: "15px",
            borderRadius: "8px"
          }}
        >
          {loading ? "Processing..." : response}
        </div>
      </div>
    </div>
  );
}

export default App;