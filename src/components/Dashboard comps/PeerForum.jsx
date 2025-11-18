import React, { useState } from 'react';
import '../styles/PeerForum.css';

const sampleData = [
  {
    id: 1,
    question: "What are the best funding options for AYUSH startups?",
    tags: ["Funding"],
    answers: [
      "Apply for AYUSH ministry grants.",
      "Explore angel investors in healthcare.",
      "Check government schemes like Startup India."
    ]
  },
  {
    id: 2,
    question: "How to get a license for AYUSH product manufacturing?",
    tags: ["Licensing"],
    answers: [
      "Apply through your state's AYUSH department.",
      "Ensure compliance with AYUSH guidelines.",
      "Prepare the necessary documentation."
    ]
  },
  {
    id: 3,
    question: "What are the compliance requirements for exporting AYUSH products?",
    tags: ["Compliance", "Export"],
    answers: [
      "Check international AYUSH product standards.",
      "Obtain certifications like GMP and CoPP.",
      "Ensure labeling aligns with importing country regulations."
    ]
  },
  {
    id: 4,
    question: "How can I market AYUSH products effectively online?",
    tags: ["Marketing"],
    answers: [
      "Leverage social media platforms like Instagram and Facebook.",
      "Collaborate with influencers in the health and wellness space.",
      "Invest in SEO and content marketing for better reach."
    ]
  },
  {
    id: 5,
    question: "What are some successful collaboration models in the AYUSH sector?",
    tags: ["Collaboration"],
    answers: [
      "Partner with local health clinics for product trials.",
      "Collaborate with universities for R&D.",
      "Work with digital health startups for technology integration."
    ]
  },
  {
    id: 6,
    question: "Are there government schemes to help with startup incubation?",
    tags: ["Funding", "Incubation"],
    answers: [
      "Explore the Startup India Seed Fund Scheme (SISFS).",
      "Reach out to AYUSH ministry-approved incubators.",
      "Check state-specific startup incubation programs."
    ]
  },
  {
    id: 7,
    question: "How to find investors for AYUSH startups?",
    tags: ["Funding", "Investors"],
    answers: [
      "Create a detailed startup profile on platforms like AngelList.",
      "Participate in AYUSH-focused pitch events and competitions.",
      "Build a strong LinkedIn network of healthcare investors."
    ]
  },
  {
    id: 8,
    question: "What are the steps to register a startup under the AYUSH ministry?",
    tags: ["Licensing", "Registration"],
    answers: [
      "Complete the AYUSH ministry registration form online.",
      "Submit necessary documents like business registration proof.",
      "Await approval from the ministry."
    ]
  },
  {
    id: 9,
    question: "What types of pitch decks attract healthcare investors?",
    tags: ["Funding", "Investors"],
    answers: [
      "Focus on the problem-solving aspect of your product.",
      "Highlight metrics like market size and growth potential.",
      "Include testimonials from initial customers or pilot projects."
    ]
  },
  {
    id: 10,
    question: "What certifications are essential for manufacturing AYUSH products?",
    tags: ["Compliance", "Licensing"],
    answers: [
      "Good Manufacturing Practices (GMP) certification.",
      "Certificate of Pharmaceutical Product (CoPP).",
      "Approval from the Drug Controller General of India (DCGI)."
    ]
  },
];

const stakeholders = [
  { name: "AYUSH Ministry", role: "Government Authority", contact: "ayush@gov.in" },
  { name: "Dr. Prakash", role: "AYUSH Mentor", contact: "prakash@example.com" },
  { name: "Startup Incubator XYZ", role: "Incubator", contact: "xyzincubator@example.com" },
];

const PeerForum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showStakeholders, setShowStakeholders] = useState(false);

  const filteredQuestions = sampleData.filter(({ question }) =>
    question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostQuestion = () => {
    alert("Post Question feature coming soon!");
  };

  const handleViewStakeholders = () => {
    setShowStakeholders(!showStakeholders);
  };

  const handleSendEmail = (contact) => {
    const subject = "Inquiry from Peer Forum";
    const body = "Dear " + contact + ",\n\n[Your message here]";
    window.open(`mailto:${contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="peer-forum-container mt-24 relative">
      {/* Header */}
      <header className="peer-header">
        <h1>Peer Forum</h1>
        <p>Your space to connect, learn, and grow as an AYUSH entrepreneur.</p>
      </header>

      {/* Tools and Search */}
      <div className="forum-tools">
        <input
          type="text"
          placeholder="Search questions, topics, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handlePostQuestion}>Post a Question</button>
        <button onClick={handleViewStakeholders}>
          {showStakeholders ? "Hide Stakeholders" : "View Stakeholders"}
        </button>
      </div>

      {/* Stakeholders Section */}
      {showStakeholders && (
        <div className="stakeholders-section">
          <h3>Connect with Stakeholders</h3>
          {stakeholders.map((stakeholder, idx) => (
            <div key={idx} className="stakeholder-card">
              <h4>{stakeholder.name}</h4>
              <p>{stakeholder.role}</p>
              <button onClick={() => handleSendEmail(stakeholder.contact)}>Contact</button>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="forum-content">
        {/* Categories */}
        <aside className="forum-sidebar">
          <h3>Categories</h3>
          <ul>
            <li>#Licensing</li>
            <li>#Funding</li>
            <li>#Scaling</li>
            <li>#Marketing</li>
            <li>#Compliance</li>
            <li>#Collaboration</li>
          </ul>
        </aside>

        {/* Questions */}
        <section className="questions-section">
          {filteredQuestions.length ? (
            filteredQuestions.map(({ id, question, tags, answers }) => (
              <div key={id} className="question-card">
                <h3>{question}</h3>
                <div className="tags">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="answers">
                  {answers.map((answer, idx) => (
                    <p key={idx}>{answer}</p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No questions found. Try searching for something else.</p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="peer-footer">
        <p>Empowering AYUSH Startups for a better future.</p>
      </footer>
    </div>
  );
};

export default PeerForum;
