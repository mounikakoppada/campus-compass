import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { db, collection, addDoc } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Guidance = () => {
    const { user } = useContext(AuthContext);
    const [selectedBranch, setSelectedBranch] = useState('CSE & IT');

    const branches = [
        'CSE & IT',
        'CSE Allied (AI/ML, Data)',
        'ECE',
        'EEE',
        'Mechanical'
    ];

    const placementData = {
        'CSE & IT': [
            {
                company_name: "Google",
                domain: "Search, Cloud, AI",
                eligibility_criteria: "Min 7.5 CGPA, No Active Backlogs",
                core_skill_required: "Data Structures & Algorithms (DSA)",
                first_year_task: "Solve 50 'Easy' problems on LeetCode/HackerRank.",
                placement_tip: "Google cares about 'How you think' more than the answer. Speak your logic aloud during coding interviews."
            },
            {
                company_name: "Microsoft",
                domain: "Operating Systems, Cloud (Azure)",
                eligibility_criteria: "Min 7.0 CGPA, 70% in 10th/12th",
                core_skill_required: "System Design & Low-Level Design (LLD)",
                first_year_task: "Build a simple 'To-Do' app and host it on GitHub Pages.",
                placement_tip: "Focus heavily on Object-Oriented Programming (OOP) concepts. They love questions on Classes and Inheritance."
            },
            {
                company_name: "Amazon",
                domain: "E-Commerce, AWS",
                eligibility_criteria: "Min 6.5 CGPA, No Backlogs",
                core_skill_required: "Problem Solving & Efficiency",
                first_year_task: "Understand how the internet works (HTTP, DNS) and write a blog post about it.",
                placement_tip: "Read Amazon's '14 Leadership Principles'. They will test you on these behaviorally."
            },
            {
                company_name: "Oracle",
                domain: "Database, Enterprise Software",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "DBMS (SQL & Database Normalization)",
                first_year_task: "Design a database schema for a Library Management System (Tables/Relations).",
                placement_tip: "Be an expert in SQL queries (Joins, Nested Queries). That is their bread and butter."
            },
            {
                company_name: "TCS Digital / Prime",
                domain: "IT Services & Consulting",
                eligibility_criteria: "Min 6.0 CGPA (Strict)",
                core_skill_required: "Coding Agility & Aptitude",
                first_year_task: "Practice 15 mins of Aptitude (Quantitative/Logical) daily.",
                placement_tip: "Speed matters. The coding rounds are time-bound. Don't get stuck on one approach."
            }
        ],
        'CSE Allied (AI/ML, Data)': [
            {
                company_name: "NVIDIA",
                domain: "Hardware-Accelerated AI, GPU Computing",
                eligibility_criteria: "Min 8.0 CGPA (Preferred)",
                core_skill_required: "CUDA C++ / Parallel Computing",
                first_year_task: "Learn C++ pointers and memory management thoroughly.",
                placement_tip: "Understand the hardware-software interface. How does code actually run on a chip?"
            },
            {
                company_name: "IBM (Data & AI)",
                domain: "Enterprise AI, Cloud",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Python & Data Handling (Pandas/NumPy)",
                first_year_task: "Analyze a CSV dataset (e.g., Titanic) using Python and visualize it.",
                placement_tip: "Showcase projects where you solved a real business problem using data, not just model accuracy."
            },
            {
                company_name: "Accenture (Applied Intelligence)",
                domain: "AI Consulting",
                eligibility_criteria: "Min 6.5 CGPA",
                core_skill_required: "Machine Learning Basics",
                first_year_task: "Complete a basic 'Linear Regression' project from scratch.",
                placement_tip: "Be ready to explain complex AI concepts in simple English (for client-facing roles)."
            },
            {
                company_name: "Mu Sigma",
                domain: "Decision Sciences / Analytics",
                eligibility_criteria: "Min 6.0 CGPA",
                core_skill_required: "Statistical Analysis & Aptitude",
                first_year_task: "Learn Probability and Statistics (Mean, Median, Bayes Theorem).",
                placement_tip: "Their interview process is grueling and logic-heavy. Practice puzzles and guesstimates."
            },
            {
                company_name: "Palantir (Hypothetical Target)",
                domain: "Big Data Analytics",
                eligibility_criteria: "High Coding Standards",
                core_skill_required: "Data Engineering / ETL Pipelines",
                first_year_task: "Learn how to use APIs to fetch data from the web (e.g., Weather API).",
                placement_tip: "Demonstrate a passion for privacy and data security ethics."
            }
        ],
        'ECE': [
            {
                company_name: "Texas Instruments",
                domain: "Semiconductors (Analog/Digital)",
                eligibility_criteria: "Min 7.5 CGPA",
                core_skill_required: "Analog Circuit Design",
                first_year_task: "Simulate a simple RC Low Pass Filter in LTSpice.",
                placement_tip: "Brush up on Network Analysis (KCL/KVL) and Op-Amps. Basics are everything."
            },
            {
                company_name: "Qualcomm",
                domain: "Wireless Tech, 5G",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Digital Logic Design & Verilog",
                first_year_task: "Design a Full Adder using logic gates on a breadboard or simulator.",
                placement_tip: "Be prepared for questions on Flip-Flops, Timing Diagrams, and State Machines."
            },
            {
                company_name: "Intel",
                domain: "Microprocessors",
                eligibility_criteria: "Min 7.5 CGPA",
                core_skill_required: "Computer Architecture",
                first_year_task: "Understand the difference between RISC and CISC architectures.",
                placement_tip: "Know the 8085/8086 microprocessor pin diagrams and internal architecture by heart."
            },
            {
                company_name: "Samsung Semiconductor",
                domain: "Memory / Storage",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Embedded C",
                first_year_task: "Blink an LED using an Arduino (writing direct register code, not just libraries).",
                placement_tip: "Strong C programming skills are mandatory even for hardware roles."
            },
            {
                company_name: "Cisco",
                domain: "Networking Hardware",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Computer Networks (TCP/IP)",
                first_year_task: "Configure a basic home router setup and understand IP addresses.",
                placement_tip: "CCNA certification concepts (Subnetting, OSI Model) give you a massive edge."
            }
        ],
        'EEE': [
            {
                company_name: "Siemens",
                domain: "Automation & Energy",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "PLC / SCADA basics",
                first_year_task: "Understand the working of a Relay and a Contactor.",
                placement_tip: "Focus on Power Systems and Control Systems stability criteria."
            },
            {
                company_name: "Schneider Electric",
                domain: "Energy Management",
                eligibility_criteria: "Min 6.5 CGPA",
                core_skill_required: "Switchgear & Protection",
                first_year_task: "Study the single-line diagram of your college's electrical substation.",
                placement_tip: "Sustainability and renewable energy knowledge is a big plus in interviews."
            },
            {
                company_name: "Robert Bosch",
                domain: "Automotive Electronics",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Control Systems",
                first_year_task: "Build a small DC motor speed controller using a potentiometer.",
                placement_tip: "Understand how sensors (Lidar/Radar) interface with ECUs."
            },
            {
                company_name: "ABB (Asea Brown Boveri)",
                domain: "Robotics & Power Grids",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Power Electronics",
                first_year_task: "Learn about the different types of Transformers and their cooling methods.",
                placement_tip: "Be thorough with Induction Motors and Drives."
            },
            {
                company_name: "Tata Power / NTPC",
                domain: "Power Generation",
                eligibility_criteria: "Min 60% (GATE score for PSUs)",
                core_skill_required: "Core Electrical Concepts",
                first_year_task: "Calculate the electricity bill of your house based on load rating.",
                placement_tip: "For PSUs, clarity on fundamental definitions (Voltage, Current, Power Factor) is strictly tested."
            }
        ],
        'Mechanical': [
            {
                company_name: "Tata Motors",
                domain: "Automotive",
                eligibility_criteria: "Min 6.5 CGPA",
                core_skill_required: "Thermodynamics & IC Engines",
                first_year_task: "Open a bicycle gear system, clean it, and understand transmission ratios.",
                placement_tip: "Understand the shift to EVs. Know the difference between ICE and EV powertrains."
            },
            {
                company_name: "Mercedes-Benz R&D",
                domain: "Automotive Design",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "CAD/CAM (CATIA/SolidWorks)",
                first_year_task: "Design a simple 3D model of a piston in any free CAD software.",
                placement_tip: "Strength of Materials (SOM) and Finite Element Analysis (FEA) basics are crucial."
            },
            {
                company_name: "L&T (Larsen & Toubro)",
                domain: "Construction & Manufacturing",
                eligibility_criteria: "Min 6.0 CGPA, No Backlogs",
                core_skill_required: "Manufacturing Processes",
                first_year_task: "Visit a local lathe workshop and watch a turning operation.",
                placement_tip: "Be ready for questions on Hydraulics, Pneumatics, and Project Management."
            },
            {
                company_name: "Airbus / Boeing",
                domain: "Aerospace",
                eligibility_criteria: "Min 7.5 CGPA",
                core_skill_required: "Fluid Mechanics & Aerodynamics",
                first_year_task: "Build a paper glider that flies more than 20 feet. Understand lift and drag.",
                placement_tip: "Bernoulli's principle and boundary layer theory are interview favorites."
            },
            {
                company_name: "General Electric (GE)",
                domain: "Aviation & Power",
                eligibility_criteria: "Min 7.0 CGPA",
                core_skill_required: "Heat Transfer",
                first_year_task: "Study how a refrigerator works (Vapor Compression Cycle).",
                placement_tip: "They value analytical problem solving. Expect case studies on failure analysis."
            }
        ]
    };

    const [showSupportModal, setShowSupportModal] = useState(false);
    const [supportSent, setSupportSent] = useState(false);
    const [formData, setFormData] = useState({ topic: '', details: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Import Auth and DB at top (will add imports in next step)
    // For now assuming they are available or will be added.

    const handleSupportSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const requestData = {
            topic: `Placement Query: ${formData.topic}`, // Tagging as placement query
            details: formData.details,
            createdAt: new Date(),
            status: 'pending',
            userId: user ? user.uid : 'anonymous',
            userEmail: user ? user.email : 'anonymous',
            userName: user ? (user.displayName || user.name || 'Student') : 'Anonymous'
        };

        try {
            await addDoc(collection(db, "support_requests"), requestData);
            setSupportSent(true);
            setTimeout(() => {
                setShowSupportModal(false);
                setSupportSent(false);
                setFormData({ topic: '', details: '' });
            }, 3000);
        } catch (error) {
            console.error("Error sending query: ", error);
            alert("Failed to send query. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="guidance-page">
            <Navbar />
            <div className="container content-wrap">
                <header className="page-header">
                    <h1>Target Your Dream Company 🎯</h1>
                    <p>Curated paths for B.Tech First-Year Students</p>
                    <button className="btn-query" onClick={() => setShowSupportModal(true)}>
                        🙋 Ask a Placement Query (Anonymous)
                    </button>
                </header>

                <div className="branch-selector">
                    {branches.map(branch => (
                        <button
                            key={branch}
                            className={`branch-btn ${selectedBranch === branch ? 'active' : ''}`}
                            onClick={() => setSelectedBranch(branch)}
                        >
                            {branch}
                        </button>
                    ))}
                </div>

                <div className="companies-grid fade-in">
                    {placementData[selectedBranch].map((company, idx) => (
                        <div key={idx} className="company-card glass">
                            <div className="card-top">
                                <h2>{company.company_name}</h2>
                                <span className="domain-badge">{company.domain}</span>
                            </div>

                            <div className="card-body">
                                <div className="info-row">
                                    <span className="label">Eligibility:</span>
                                    <span className="value">{company.eligibility_criteria}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Top Skill:</span>
                                    <span className="value highlight">{company.core_skill_required}</span>
                                </div>
                                <div className="task-box">
                                    <span className="task-label">⚡ First Year Task (+100 XP)</span>
                                    <p>{company.first_year_task}</p>
                                </div>
                                <div className="tip-box">
                                    <span className="tip-icon">💡</span>
                                    <p>"{company.placement_tip}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Support Modal */}
            {showSupportModal && (
                <div className="modal-overlay" onClick={() => !supportSent && setShowSupportModal(false)}>
                    <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                        {!supportSent ? (
                            <>
                                <button className="close-btn" onClick={() => setShowSupportModal(false)}>✕</button>
                                <h2>Ask a Placement Query</h2>
                                <p className="modal-subtitle">Admins will see this query. They will address common questions in general guidance sessions.</p>

                                <div className="user-badge" style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0fdf4', borderRadius: '6px', fontSize: '0.85rem', color: '#166534', border: '1px solid #bbf7d0' }}>
                                    Logged in as: <strong>{user ? user.email : 'Guest'}</strong>
                                </div>

                                <form onSubmit={handleSupportSubmit} className="support-form">
                                    <label>Company / Domain Interest</label>
                                    <select
                                        required
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    >
                                        <option value="">Select a target...</option>
                                        <option value="General Placement">General Placement Process</option>
                                        <option value="Google/Microsoft">MAANG (Google, Microsoft, etc.)</option>
                                        <option value="TCS/Infosys">Mass Recruiters (TCS, Wipro, etc.)</option>
                                        <option value="Core Hardware">Core Hardware (VLSI, Embedded)</option>
                                        <option value="Higher Studies">Higher Studies (GATE/GRE)</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <label>What would you like to know?</label>
                                    <textarea
                                        placeholder="e.g., Is 7.5 CGPA enough for Google? How to start DSA?"
                                        value={formData.details}
                                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                    ></textarea>

                                    <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Submit Query'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="success-message">
                                <div className="checkmark">✓</div>
                                <h3>Query Received</h3>
                                <p>Our mentors will review this.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
        .guidance-page { min-height: 100vh; background: #f8fafc; padding-bottom: 3rem; }
        .content-wrap { padding: 2rem 1rem; max-width: 1200px; }
        
        .page-header { text-align: center; margin-bottom: 2.5rem; }
        .page-header h1 { color: var(--primary); font-size: 2.2rem; margin-bottom: 0.5rem; }
        .page-header p { color: var(--text-muted); font-size: 1.1rem; }
        .btn-query { margin-top: 1rem; padding: 0.8rem 1.5rem; background: var(--primary); color: white; border-radius: 50px; font-weight: 600; cursor: pointer; border: none; transition: transform 0.2s; }
        .btn-query:hover { transform: translateY(-2px); background: #1a4316; opacity: 0.9; }

        .branch-selector { 
            display: flex; gap: 0.8rem; overflow-x: auto; padding-bottom: 1rem; margin-bottom: 2rem; 
            justify-content: center; flex-wrap: wrap;
        }
        .branch-btn {
            background: white; border: 1px solid #cbd5e1; padding: 0.6rem 1.2rem;
            border-radius: 50px; cursor: pointer; font-weight: 600; color: var(--text-secondary);
            transition: all 0.2s; white-space: nowrap;
        }
        .branch-btn:hover { border-color: var(--primary); color: var(--primary); }
        .branch-btn.active { background: var(--primary); color: white; border-color: var(--primary); transform: scale(1.05); }

        .companies-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; }

        .company-card { 
            background: white; border-radius: 16px; overflow: hidden; position: relative;
            border-top: 5px solid var(--primary); transition: transform 0.2s;
        }
        .company-card:hover { transform: translateY(-5px); }

        .card-top { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; background: #fff; }
        .card-top h2 { margin: 0; font-size: 1.4rem; color: var(--text-main); }
        .domain-badge { 
            display: inline-block; margin-top: 0.5rem; padding: 4px 10px; 
            background: #f1f5f9; color: var(--text-muted); font-size: 0.75rem; 
            font-weight: 700; border-radius: 4px; text-transform: uppercase; 
        }

        .card-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        
        .info-row { display: flex; justify-content: space-between; font-size: 0.9rem; }
        .info-row .label { color: var(--text-muted); font-weight: 600; }
        .info-row .value { color: var(--text-main); font-weight: 500; text-align: right; max-width: 60%; }
        .info-row .value.highlight { color: var(--primary); font-weight: 700; }

        .task-box { 
            background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1rem; 
            border-radius: 8px; margin-top: 0.5rem; 
        }
        .task-label { display: block; font-size: 0.75rem; color: #15803d; font-weight: 800; text-transform: uppercase; margin-bottom: 0.3rem; }
        .task-box p { margin: 0; font-size: 0.9rem; color: #166534; line-height: 1.4; }

        .tip-box { display: flex; gap: 0.8rem; font-style: italic; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-top: 0.5rem; }
        .tip-icon { font-size: 1.2rem; }

        /* Modal Styles Reuse */
        .modal-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); z-index: 2000;
            display: flex; align-items: center; justify-content: center;
            padding: 1rem; backdrop-filter: blur(4px);
            animation: fadeIn 0.2s ease-out;
        }
        .modal-content {
            background: white; padding: 2.5rem; border-radius: 16px;
            width: 100%; max-width: 600px; max-height: 85vh; overflow-y: auto;
            position: relative; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }}

        .close-btn { position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; background: none; color: #94a3b8; }
        .modal-content h2 { margin: 0.5rem 0 0.5rem 0; font-size: 1.5rem; color: var(--text-main); }
        .modal-subtitle { color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem; }

        .support-form { display: flex; flex-direction: column; gap: 1rem; text-align: left; }
        .support-form label { font-weight: 600; color: var(--text-main); font-size: 0.95rem; }
        .support-form select, .support-form textarea {
            padding: 0.8rem; border: 1px solid #cbd5e1; border-radius: 8px;
            font-family: inherit; font-size: 1rem;
        }
        .support-form textarea { height: 100px; resize: vertical; }
        .submit-btn { width: 100%; margin-top: 0.5rem; background: var(--primary); color: white; padding: 0.8rem; border-radius: 8px; font-weight: 600; }
        
        .success-message { text-align: center; padding: 2rem 0; }
        .checkmark { 
            width: 60px; height: 60px; background: #22c55e; color: white; 
            border-radius: 50%; font-size: 2.5rem; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 1.5rem auto;
        }

        @media (max-width: 600px) {
            .branch-selector { justify-content: flex-start; }
        }
      `}</style>
        </div>
    );
};

export default Guidance;
