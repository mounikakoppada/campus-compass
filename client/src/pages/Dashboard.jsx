import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [streak, setStreak] = useState(0);
  const [dailyTip, setDailyTip] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(70);
  const [batteryToast, setBatteryToast] = useState(false);

  // --- FRESHER'S CORNER DATABASE ---
  const FRESHER_TIPS = [
    "Search for the 'International Edition' of textbooks—they are usually 70% cheaper.",
    "If a professor mentions a specific book title more than twice, a question from it is definitely on the Mid-term.",
    "Calculating exactly how many classes you can bunk to stay at 74.9% is the most advanced math you will ever do.",
    "The 'Proxy' Debt: Keeping a mental tally of how many times you marked your roommate present so they owe you.",
    "Sitting in the first bench once a month so the professor remembers your face, then disappearing for three weeks.",
    "Reaching the classroom door at 8:01 AM and seeing the professor click the lock from the inside.",
    "Joining the Tech Fest committee just for the 'On-Duty' (OD) attendance and the free T-shirt.",
    "Measuring the value of everything in 'Canteen Samosas' (e.g., 'This book costs 40 samosas, not worth it').",
    "When the mess serves Biryani or Aloo Paratha, and for 20 minutes, all Engineering stress disappears.",
    "Making tea, Maggi, boiled eggs, and heating pizza—all in one illegal electric electric kettle.",
    "Realizing your birthday is coming and calculating how to hide from friends to avoid the 'Treat' and the 'Birthday Bumps.'",
    "Sniffing a shirt to see if it’s 'clean enough' for a two-hour lab session.",
    "Finding the one specific corner of the hostel room where the college WiFi actually works.",
    "Walking into the corridor at 3 AM and seeing 20 other people staring into the void with dark circles.",
    "A roommate who wakes you up by throwing a pillow because you're snoring through your 5th alarm.",
    "The 'Borrowing' Loop: 'Bro, do you have a trimmer?' leading to 'Do you have a charger?' leading to 'Do you have 100 rupees?'",
    "Taking a photo of the lab setup before you start so you have it for the record later.",
    "Making the flowchart in your lab record so big that it covers the fact that you have no idea what the experiment does.",
    "Sir, it’s on the tip of my tongue, while your brain is actually playing a blank screen during a Viva.",
    "Your handwriting going from 'Professional Architect' on Page 1 to 'Ancient Hieroglyphics' on Page 20.",
    "Standing at the Xerox shop at 8:55 AM with 50 others trying to copy the same 'Topper’s' record.",
    "Using a coin to draw perfect circles because you lost your compass in the first week.",
    "Realizing you learned more from a 10-minute Indian YouTuber than from 40 hours of lectures.",
    "Using a scientific calculator to solve 8 + 5 during an exam because you don't trust your own brain anymore.",
    "Renaming your 'LED blink' project to 'IoT-Based Intelligent Illumination System' to impress the judges.",
    "Close all 47 Chrome tabs at once after finishing a project—the 'System Release' is better than a massage.",
    "It works on my machine is the universal mantra for every failed coding lab.",
    "Mastering the 'Thumb Around' pen spin is 40% of an engineering degree.",
    "The one teammate who only appears on the final day to ask, 'So, what is our project about?'",
    "A senior telling you 'Don't worry, even I failed this' is more comforting than a 9.0 CGPA.",
    "Seeing your 'Chappal-wearing' roommate suddenly in a suit for placements and not recognizing them.",
    "The 'Matrix' move: Open a green-text terminal to look busy while actually daydreaming.",
    "80% of exam questions come from 20% of the syllabus—find that 20% using old papers.",
    "In engineering, a neat diagram earns more marks than two pages of messy text.",
    "Always write the 'Given' data and the 'Formula' first; even if the answer is wrong, you get step marks.",
    "Never leave a question blank—write related concepts because Engineering is about 'attempting.'",
    "Highlight keywords in your answers; professors scan for words like 'Efficiency' or 'Isothermal,' they don't read every sentence.",
    "If you're stuck on a derivation, write the start and the end—sometimes you get partial credit.",
    "The 'Unit' Guessing Game: Write the unit so messily that it could be Newtons or Joules. It’s 'Schrodinger’s Unit.'",
    "Search for the 'Solution Manual' for your textbook to see the steps you're missing.",
    "YouTube NPTEL videos at 1.5x speed are the only reason most engineers pass.",
    "Keep a 'Formula Notebook' from Day 1; it’s the only thing that will help you in the 4th year.",
    "Don't study from 5 different books; pick one 'Standard' and one 'Local Author.'",
    "Explain a concept to a non-engineer; if they get it, you actually understand it.",
    "The Lab Assistant is more powerful than the Professor—be nice to them.",
    "Always check your breadboard for 'continuity' before building a complex circuit.",
    "Write lab observations in pencil first; calculate, verify, then ink them.",
    "Don't be the 'Timer' in group projects—be the one 'Connecting wires' or 'Coding' to actually learn.",
    "Label your components; a box of 100 mixed resistors is a nightmare.",
    "Your CGPA gets you the interview; your skills get you the job.",
    "Practice 'Aptitude' for 15 mins a day; it’s the first round of every job drive.",
    "Learn Excel/Google Sheets; it’s the most used tool in the corporate world.",
    "Record yourself giving a mock interview to realize you say 'um' and 'uh' too much.",
    "Keep your resume to one page.",
    "I don't know is a valid answer if you follow it with 'But I will find out.'",
    "The 5-Year Rule: Will this mark matter in 5 years? If not, don't let it ruin your week.",
    "Accept the 'L'—sometimes you fail a quiz, it’s just data for the next attempt.",
    "Comparison is a thief—your 'Build Version' is different from theirs.",
    "Done is better than Perfect.",
    "Eat the Frog—do the hardest subject first thing in the morning.",
    "Use 'Focus Mode' on your phone; it’s an engineer’s best friend.",
    "A backlog is just a side-quest in the RPG of life.",
    "The degree is a piece of paper, but the 'Jugaad' (hacks) you learned is the real education.",
    "If you haven't cried over a semi-colon, are you even an engineer?",
    "Drinking 5 cups of coffee doesn't make you an engineer; it just gives you anxiety.",
    "Sleep is your 'Compiler'—your brain organizes what you learned while you sleep.",
    "Box Breathing: Inhale 4, hold 4, exhale 4, hold 4 to reset your nerves.",
    "Splash cold water on your face to trigger the 'mammalian dive reflex' and slow your heart rate.",
    "The 20-20-20 Rule: Every 20 mins, look 20 feet away for 20 seconds.",
    "Brain Dump: Write every stressful thought on paper for 5 minutes, then throw it away.",
    "Stand like a superhero for 2 minutes (Power Pose) to boost confidence.",
    "Smell peppermint oil to reduce exam-induced nausea.",
    "Doodle on your notes—it actually helps you retain info by keeping you in a 'flow' state.",
    "Music with no lyrics (Lo-fi) is best for repetitive tasks like lab records.",
    "The 'Pizza Pact': If the group finishes the project by 9 PM, everyone gets pizza.",
    "Venting Sessions: Set a 10-minute timer to complain, then stop when it dings.",
    "I can't do this should always be followed by '...yet.'",
    "The Friday Feast: Realizing it’s Friday and the mess serves 'Special Food'—the only thing keeping you alive.",
    "Tracing the invigilator's walking pattern to create a 'Probability Map' in your rough work.",
    "Ask for an extra sheet even if you have blank pages to scare the person sitting next to you.",
    "Identity Crisis: Looking at your Hall Ticket photo and wondering where that happy person went.",
    "Close your eyes for 5 minutes in a 3-hour lecture; it’s a 'Quick Reboot.'",
    "Sir, please repeat: Asking a question just to kill time at the end of a class.",
    "The art of changing lab values just enough so they don't look exactly like your friend's.",
    "A hot cup of tea is the 'Universal Restart Button' for any Indian engineer.",
    "Calculating exactly how many marks you need in the final to 'Just Pass.'",
    "The backbench is where all world problems are solved while the professor talks about Fourier Transforms.",
    "Spend 2 days picking a cool name for a project that doesn't even work yet.",
    "The 'Commit' Message: 'Fixed one bug, created four more.'",
    "I have handled hard days before, I will handle this one.",
    "Use the 'Forest' app to stay off your phone and grow a digital tree.",
    "One hour before bed, no screens—blue light is a system disruptor.",
    "If a task takes under 2 minutes, do it now.",
    "Hydrate or Diedrate.",
    "You are the 'Product'; your degree is just the 'Manual.' Take care of the product first."
  ];

  useEffect(() => {
    // --- STREAK LOGIC ONLY (No Points) ---
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    let currentStreak = parseInt(localStorage.getItem('streak') || '0');

    if (lastLogin !== today) {
      if (lastLogin === new Date(Date.now() - 86400000).toDateString()) {
        currentStreak += 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastLogin !== yesterday.toDateString()) {
          if (!lastLogin) currentStreak = 1;
          else currentStreak = 1;
        }
      }
      localStorage.setItem('lastLoginDate', today);
      localStorage.setItem('streak', currentStreak.toString());
    }
    setStreak(currentStreak);

    // --- DAILY TIP LOGIC ---
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    setDailyTip(FRESHER_TIPS[dayOfYear % FRESHER_TIPS.length]);

    // --- MENTAL BATTERY LOGIC (Session Based) ---
    const checkUsage = () => {
      // Session based: Resets when browser is closed.
      let minutes = parseInt(sessionStorage.getItem('usageMinutes') || '0');

      // Calculate Battery: Starts at 100, drops 0.5% per minute
      const level = Math.max(0, Math.floor(100 - (minutes * 0.5)));
      setBatteryLevel(level);
    };

    // Initial check
    checkUsage();

    // Increment usage every minute
    const usageInterval = setInterval(() => {
      let minutes = parseInt(sessionStorage.getItem('usageMinutes') || '0');
      minutes += 1;
      sessionStorage.setItem('usageMinutes', minutes.toString());

      const level = Math.max(0, Math.floor(100 - (minutes * 0.5)));
      setBatteryLevel(level);
    }, 60000); // Run every 60 seconds

    return () => clearInterval(usageInterval);
  }, []);

  const rechargeBattery = () => {
    // Recharging acts like taking a break
    let minutes = parseInt(sessionStorage.getItem('usageMinutes') || '0');
    minutes = Math.max(0, minutes - 40);
    sessionStorage.setItem('usageMinutes', minutes.toString());

    const level = Math.max(0, Math.floor(100 - (minutes * 0.5)));
    setBatteryLevel(level);

    // Premium feedback instead of alert
    setBatteryToast(true);
    setTimeout(() => setBatteryToast(false), 3000);
  };

  const quickActions = [
    { title: 'My Roadmap', icon: '🗺️', link: '/roadmap', color: '#e0f2fe', text: '#0284c7' },
    { title: 'Weekly Plan', icon: '📅', link: '/planner', color: '#f0fdf4', text: '#16a34a' }
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="container fade-in">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome back, {user?.name || 'Engineer'}! 👋</h1>
            <p>Ready to crush your goals today?</p>
            <div className="stats-row">
              <div className="stat-pill">🔥 {streak} Day Streak</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.link}
              className="action-card glass"
              style={{ borderLeft: `4px solid ${action.text}` }}
            >
              <span className="action-icon" style={{ background: action.color }}>{action.icon}</span>
              <span className="action-title" style={{ color: action.text }}>{action.title}</span>
            </Link>
          ))}
        </section>

        <section className="dashboard-grid">
          {/* Fresher's Corner */}
          <div className="glass card fresher-corner">
            <h3>🌱 Fresher's Corner (Daily Truth)</h3>
            <div className="tip-box">
              <span className="tip-icon">💡</span>
              <p>"{dailyTip}"</p>
            </div>
          </div>

          {/* Mental Battery */}
          <div className="glass card wellbeing-tip">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>🧘 Mental Battery</h3>
              {batteryToast && <span className="toast fade-in">⚡ Recharged!</span>}
            </div>

            <div className="battery-display" onClick={rechargeBattery} title="Click to Recharge!">
              <div className="battery-level" style={{ width: `${batteryLevel}%`, background: batteryLevel > 30 ? '#4ade80' : '#f87171' }}></div>
              <span className="charge-text">{batteryLevel}% Charged</span>
            </div>

            {batteryLevel < 30 && <p style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>⚠️ Battery Low! Take a break.</p>}

            <p className="quote">"Rest is not idleness. It's the fuel for your next sprint."</p>
            <Link to="/wellbeing" className="link-btn">Visit Wellness Center →</Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        .dashboard-page { min-height: 100vh; background: #f8fafc; padding-bottom: 2rem; }
        .hero-section {
          background: linear-gradient(135deg, var(--primary) 0%, #166534 100%);
          color: white; padding: 2.5rem; border-radius: 20px; margin: 2rem 0;
          display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 10px 30px rgba(45, 90, 39, 0.2);
        }
        .hero-content h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .hero-content p { opacity: 0.9; margin-bottom: 1.5rem; }
        .stats-row { display: flex; gap: 1rem; }
        .stat-pill { background: rgba(255,255,255,0.2); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600; backdrop-filter: blur(5px); }

        .quick-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .action-card { 
          display: flex; align-items: center; gap: 1rem; padding: 1rem; 
          border-radius: 12px; text-decoration: none; transition: transform 0.2s; background: white;
        }
        .action-card:hover { transform: translateY(-3px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .action-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .action-title { font-weight: 700; font-size: 1rem; }

        .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .card { padding: 1.5rem; border-radius: 16px; background: white; display: flex; flex-direction: column; }
        .card h3 { margin: 0 0 1rem 0; font-size: 1.1rem; color: #334155; }

        .tip-box { 
          background: #fefce8; border: 1px dashed #eab308; padding: 1rem; border-radius: 10px;
          display: flex; gap: 0.8rem; margin-bottom: 1rem; flex: 1; align-items: center;
        }
        .tip-box p { font-size: 1rem; color: #854d0e; font-style: italic; margin: 0; font-weight: 500; }
        .tip-icon { font-size: 1.5rem; }

        .battery-display { 
          background: #f1f5f9; border-radius: 20px; padding: 4px; margin-bottom: 1rem; position: relative; cursor: pointer; transition: transform 0.1s;
        }
        .battery-display:active { transform: scale(0.98); }
        .battery-level { height: 24px; border-radius: 16px; min-width: 10%; transition: width 0.3s, background 0.3s; }
        .charge-text { 
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
            font-size: 0.8rem; font-weight: 700; color: #1e293b; mix-blend-mode: multiply;
        }
        .toast { background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; animation: bounceIn 0.3s; }
        @keyframes bounceIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; }}
        .quote { font-size: 0.95rem; color: #475569; font-style: italic; margin-bottom: 1rem; line-height: 1.5; }
        .link-btn { color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-top: auto; }

        @media (max-width: 768px) {
          .quick-actions { grid-template-columns: 1fr; }
          .hero-section { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
