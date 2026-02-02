import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Coding = () => {
    const challenges = [
        { day: 1, title: 'Say Hello', task: 'Write a program to print your name.', hint: 'Use printf() in C or print() in Python. It’s the computer’s way of talking back.' },
        { day: 2, title: 'Math Wiz', task: 'Add two numbers and print the result.', hint: 'You need variables (boxes) to store X and Y, then perform X + Y.' },
        { day: 3, title: 'Even or Odd?', task: 'Check if a number is even or odd.', hint: 'Modulus operator (%) gives the remainder. If number % 2 is 0, it’s even.' },
        { day: 4, title: 'Loop-de-Loop', task: 'Print numbers from 1 to 10.', hint: 'Don’t write 10 print statements! Use a "for" loop to repeat actions.' },
        { day: 5, title: 'The Sum Up', task: 'Calculate sum of numbers 1 to 100.', hint: 'Create a "sum" variable = 0. Add each number inside a loop.' },
        { day: 6, title: 'Table Master', task: 'Print the multiplication table of 5.', hint: 'Loop 1 to 10. In each step, print 5 * i.' },
        { day: 7, title: 'Max Finder', task: 'Find the largest of three numbers.', hint: 'Use "if-else". If A > B and A > C, then A is boss.' },
        { day: 8, title: 'Voting Age', task: 'Ask age, say if eligible to vote.', hint: 'Input > 18? Print "Yes". Else "No". Simple logic check.' },
        { day: 9, title: 'Reverse It', task: 'Take a number (123) and reverse it (321).', hint: 'Use modulus to get the last digit, then divide by 10 to shrink the number.' },
        { day: 10, title: 'Mini Calculator', task: 'Take 2 numbers and an operator (+,-,*,/) and solve.', hint: 'Use "switch-case" or "if-else" to decide which math operation to run.' },
        { day: 11, title: 'Factorial Fun', task: 'Find the factorial of a number (5! = 120).', hint: 'Loop from 1 to N and multiply them all. 1*2*3*4*5.' },
        { day: 12, title: 'Count Digits', task: 'Count how many digits are in a number (1234 -> 4).', hint: 'Divide by 10 repeatedly until the number becomes 0. Count the steps.' },
        { day: 13, title: 'Palindrome Check', task: 'Check if a number/string is same reversed (121).', hint: 'Reverse it first. If reverse == original, it’s a palindrome.' },
        { day: 14, title: 'Prime Time', task: 'Check if a number is Prime.', hint: 'Loop from 2 to N-1. If N is divisible by any of them, it’s NOT prime.' },
        { day: 15, title: 'Fibonacci Series', task: 'Print first 10 numbers: 0 1 1 2 3 5...', hint: 'Next number = Sum of previous two. Start with A=0, B=1.' },
        { day: 16, title: 'Star Pattern', task: 'Print a pyramid of stars (*).', hint: 'Nested loops! Outer loop for rows, inner loop for printing stars.' },
        { day: 17, title: 'Array Sum', task: 'Find sum of all elements in an array.', hint: 'Loop through the array index 0 to size-1 and add to a sum variable.' },
        { day: 18, title: 'Find in Array', task: 'Search if number 7 exists in an array.', hint: 'Loop through array. If array[i] == 7, print "Found" and break.' },
        { day: 19, title: 'String Length', task: 'Find length of a string without strlen()', hint: 'Loop until you hit the null character (\0) or end of string.' },
        { day: 20, title: 'Count Vowels', task: 'Count a, e, i, o, u in a string.', hint: 'Loop through char by char. If it matches a vowel, count++.' },
        { day: 21, title: 'Swap Numbers', task: 'Swap two variables without a temp variable.', hint: 'A = A + B; B = A - B; A = A - B. Magic math!' },
        { day: 22, title: 'Leap Year', task: 'Check if a year is a Leap Year.', hint: 'Divisible by 4 AND (not by 100 OR by 400).' },
        { day: 23, title: 'ASCII Value', task: 'Print the ASCII value of a character.', hint: 'In C/C++, just print a char as an integer (%d).' },
        { day: 24, title: 'Armstrong Number', task: 'Check if 153 is Armstrong (1^3 + 5^3 + 3^3 = 153).', hint: 'Extract digits, cube them, and sum. Compare with original.' },
        { day: 25, title: 'Perfect Number', task: 'Check if num = sum of divisors (6 = 1+2+3).', hint: 'Find divisors from 1 to N/2 and add them up.' },
        { day: 26, title: 'GCD (HCF)', task: 'Find Greatest Common Divisor of 2 numbers.', hint: 'Use Euclidean algorithm: GCD(a, b) = GCD(b, a % b).' },
        { day: 27, title: 'LCM', task: 'Find Least Common Multiple.', hint: 'Formula: (A * B) / GCD(A, B).' },
        { day: 28, title: 'Power Function', task: 'Calculate X to the power Y without pow().', hint: 'Loop Y times and multiply X with itself.' },
        { day: 29, title: 'Binary to Decimal', task: 'Convert 1010 to 10.', hint: 'Multiply each bit by 2^position and add logic.' },
        { day: 30, title: 'Bubble Sort', task: 'Sort an array [5, 2, 9, 1] -> [1, 2, 5, 9].', hint: 'Compare adjacent elements and swap if wrong order. Repeat.' }
    ];

    const [checked, setChecked] = useState({});

    const toggleCheck = (idx) => {
        setChecked({ ...checked, [idx]: !checked[idx] });
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="container content-wrap">
                <h1 className="page-title">No-Panic Coding Syllabus 💻</h1>
                <p className="subtitle">30 Daily Micro-Challenges (15 mins each)</p>

                <div className="timeline">
                    {challenges.map((item, idx) => (
                        <div key={idx} className={`timeline-item ${checked[idx] ? 'completed' : ''}`}>
                            <div className="timeline-marker" onClick={() => toggleCheck(idx)}>
                                {checked[idx] ? '✓' : idx + 1}
                            </div>
                            <div className="timeline-content glass">
                                <div className="content-header">
                                    <h3>Day {item.day}: {item.title}</h3>
                                    <button className="check-btn" onClick={() => toggleCheck(idx)}>
                                        {checked[idx] ? 'Done' : 'Mark Done'}
                                    </button>
                                </div>
                                <p className="task"><strong>Task:</strong> {item.task}</p>
                                <div className="hint-box">
                                    <span className="hint-label">💡 Hint:</span> {item.hint}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .page-container { min-height: 100vh; background: #f8fafc; }
        .content-wrap { padding: 2rem 1rem; max-width: 800px; }
        .page-title { text-align: center; }
        .subtitle { text-align: center; color: var(--text-secondary); margin-bottom: 2rem; }

        .timeline { position: relative; padding-left: 2rem; }
        .timeline::before {
          content: ''; position: absolute; left: 0.9rem; top: 0; bottom: 0;
          width: 2px; background: #e2e8f0;
        }

        .timeline-item { position: relative; margin-bottom: 2rem; }
        
        .timeline-marker {
          position: absolute; left: -2.1rem; top: 0;
          width: 40px; height: 40px; border-radius: 50%;
          background: white; border: 2px solid var(--primary);
          color: var(--primary); font-weight: bold;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10;
          transition: all 0.3s;
        }
        .timeline-item.completed .timeline-marker {
          background: #22c55e; border-color: #22c55e; color: white;
        }

        .timeline-content { padding: 1.5rem; border-radius: 12px; transition: opacity 0.3s; }
        .timeline-item.completed .timeline-content { opacity: 0.6; }

        .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .content-header h3 { margin: 0; color: var(--primary); font-size: 1.1rem; }

        .task { margin-bottom: 1rem; font-size: 1rem; }
        .task strong { color: var(--primary); }
        
        .hint-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px; font-size: 0.9rem; }
        .hint-label { font-weight: bold; color: #d97706; }

        .check-btn {
          border: 1px solid var(--primary); color: var(--primary); background: none;
          padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer;
        }
        .timeline-item.completed .check-btn { border-color: #22c55e; color: #22c55e; }
      `}</style>
        </div>
    );
};

export default Coding;
