// StudyBrawl custom question bank
// easy = GCSE (core), medium = GCSE (higher), hard = A-level
// Each question: { question, answers: [4 options], correct: "must match one option exactly" }

const CUSTOM_QUESTIONS = {
  "Maths": {
    easy: [
      { question: "What is 15% of 200?", answers: ["20", "25", "30", "35"], correct: "30" },
      { question: "Solve 3x + 5 = 20. What is x?", answers: ["3", "5", "7", "15"], correct: "5" },
      { question: "What is the area of a circle with radius 4 cm? (Give your answer in terms of π)", answers: ["8π cm²", "16π cm²", "4π cm²", "64π cm²"], correct: "16π cm²" },
      { question: "What is the mean of 4, 8, 6, 10 and 12?", answers: ["6", "7", "8", "10"], correct: "8" },
      { question: "What is the sum of the interior angles of a quadrilateral?", answers: ["180°", "270°", "360°", "540°"], correct: "360°" }
    ],
    medium: [
      { question: "Solve x² − 5x + 6 = 0.", answers: ["x = 2 or x = 3", "x = −2 or x = −3", "x = 1 or x = 6", "x = −1 or x = 6"], correct: "x = 2 or x = 3" },
      { question: "A right-angled triangle has a hypotenuse of 13 cm and one side of 5 cm. How long is the other side?", answers: ["8 cm", "10 cm", "12 cm", "144 cm"], correct: "12 cm" },
      { question: "What is the exact value of sin 30°?", answers: ["1/2", "√3/2", "√2/2", "1"], correct: "1/2" },
      { question: "What is 2⁻³ as a fraction?", answers: ["1/8", "−8", "−1/8", "1/6"], correct: "1/8" },
      { question: "A line has the equation y = 4 − 2x. What is its gradient?", answers: ["4", "2", "−2", "−4"], correct: "−2" }
    ],
    hard: [
      { question: "Differentiate y = x³ − 4x with respect to x.", answers: ["3x² − 4", "3x² − 4x", "x² − 4", "3x³ − 4"], correct: "3x² − 4" },
      { question: "Find ∫ 6x² dx.", answers: ["12x + c", "2x³ + c", "3x³ + c", "6x³ + c"], correct: "2x³ + c" },
      { question: "Differentiate y = e^(2x).", answers: ["e^(2x)", "2e^(2x)", "2x e^(2x − 1)", "e^(2x) / 2"], correct: "2e^(2x)" },
      { question: "Find the sum to infinity of a geometric series with first term 6 and common ratio 1/3.", answers: ["9", "8", "12", "18"], correct: "9" },
      { question: "Further Maths: What is the modulus of the complex number 3 + 4i?", answers: ["5", "7", "25", "√7"], correct: "5" }
    ]
  },

  "Chemistry": {
    easy: [
      { question: "What does the atomic number of an element tell you?", answers: ["Number of protons", "Number of neutrons", "Number of protons plus neutrons", "Number of electron shells"], correct: "Number of protons" },
      { question: "What is the pH of a neutral solution?", answers: ["0", "7", "10", "14"], correct: "7" },
      { question: "Which group of the periodic table contains the alkali metals?", answers: ["Group 1", "Group 2", "Group 7", "Group 0"], correct: "Group 1" },
      { question: "What is the chemical formula of carbon dioxide?", answers: ["CO", "CO₂", "C₂O", "C₂O₂"], correct: "CO₂" },
      { question: "Which gas is produced when a metal reacts with an acid?", answers: ["Oxygen", "Carbon dioxide", "Hydrogen", "Chlorine"], correct: "Hydrogen" }
    ],
    medium: [
      { question: "What is the relative formula mass of calcium carbonate, CaCO₃? (Ar: Ca = 40, C = 12, O = 16)", answers: ["68", "84", "100", "116"], correct: "100" },
      { question: "How many moles are in 36 g of water? (Mr of water = 18)", answers: ["0.5", "1", "2", "18"], correct: "2" },
      { question: "What type of bonding is found in sodium chloride?", answers: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: "Ionic" },
      { question: "What happens to positive ions at the cathode during electrolysis?", answers: ["They gain electrons", "They lose electrons", "They gain protons", "They lose neutrons"], correct: "They gain electrons" },
      { question: "What is the colour change when an alkene is shaken with bromine water?", answers: ["Orange to colourless", "Colourless to orange", "Blue to green", "Purple to colourless"], correct: "Orange to colourless" }
    ],
    hard: [
      { question: "Which type of reaction occurs when bromoethane is warmed with aqueous sodium hydroxide?", answers: ["Nucleophilic substitution", "Electrophilic addition", "Free radical substitution", "Condensation polymerisation"], correct: "Nucleophilic substitution" },
      { question: "What is the approximate H–N–H bond angle in an ammonia molecule?", answers: ["90°", "104.5°", "107°", "109.5°"], correct: "107°" },
      { question: "N₂ + 3H₂ ⇌ 2NH₃ is at equilibrium. What happens to the position of equilibrium if the pressure is increased?", answers: ["Shifts to the right", "Shifts to the left", "No change", "The reaction stops"], correct: "Shifts to the right" },
      { question: "What is the oxidation state of manganese in KMnO₄?", answers: ["+2", "+4", "+6", "+7"], correct: "+7" },
      { question: "Why does first ionisation energy decrease down Group 2?", answers: ["Outer electron is further from the nucleus and more shielded", "Nuclear charge decreases", "Number of protons decreases", "Atoms become smaller"], correct: "Outer electron is further from the nucleus and more shielded" }
    ]
  },

  "Physics": {
    easy: [
      { question: "What is the SI unit of force?", answers: ["Joule", "Newton", "Watt", "Pascal"], correct: "Newton" },
      { question: "Which equation gives speed?", answers: ["distance ÷ time", "distance × time", "time ÷ distance", "mass × acceleration"], correct: "distance ÷ time" },
      { question: "Which of these is a renewable energy source?", answers: ["Coal", "Natural gas", "Wind", "Oil"], correct: "Wind" },
      { question: "What is the unit of electrical resistance?", answers: ["Volt", "Ampere", "Ohm", "Coulomb"], correct: "Ohm" },
      { question: "What is the approximate speed of light in a vacuum?", answers: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "340 m/s", "3 × 10¹⁰ m/s"], correct: "3 × 10⁸ m/s" }
    ],
    medium: [
      { question: "A current of 3 A flows through a 4 Ω resistor. What is the potential difference across it?", answers: ["0.75 V", "7 V", "12 V", "1.33 V"], correct: "12 V" },
      { question: "What is the kinetic energy of a 2 kg object moving at 3 m/s?", answers: ["3 J", "6 J", "9 J", "18 J"], correct: "9 J" },
      { question: "What is the weight of a 5 kg mass? (g = 10 N/kg)", answers: ["0.5 N", "5 N", "15 N", "50 N"], correct: "50 N" },
      { question: "A sample has a half-life of 2 days. After 6 days, what fraction of the original radioactive nuclei remains?", answers: ["1/2", "1/4", "1/6", "1/8"], correct: "1/8" },
      { question: "A wave has a frequency of 50 Hz and a wavelength of 4 m. What is its speed?", answers: ["12.5 m/s", "46 m/s", "54 m/s", "200 m/s"], correct: "200 m/s" }
    ],
    hard: [
      { question: "An object accelerates uniformly from rest at 2 m/s² for 5 s. How far does it travel?", answers: ["10 m", "12.5 m", "25 m", "50 m"], correct: "25 m" },
      { question: "Which of these quantities is a vector?", answers: ["Displacement", "Distance", "Speed", "Energy"], correct: "Displacement" },
      { question: "Which equation gives the energy of a photon?", answers: ["E = hf", "E = mc", "E = ½mv²", "E = hλ"], correct: "E = hf" },
      { question: "In simple harmonic motion, where is the magnitude of acceleration greatest?", answers: ["At maximum displacement", "At the equilibrium position", "At half the amplitude", "It is constant"], correct: "At maximum displacement" },
      { question: "How is the half-life T½ related to the decay constant λ?", answers: ["T½ = ln 2 ÷ λ", "T½ = λ ÷ ln 2", "T½ = λ × ln 2", "T½ = 1 ÷ λ²"], correct: "T½ = ln 2 ÷ λ" }
    ]
  },

  "Computer Science": {
    easy: [
      { question: "What does CPU stand for?", answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Update"], correct: "Central Processing Unit" },
      { question: "What is the binary number 1010 in denary?", answers: ["8", "10", "12", "20"], correct: "10" },
      { question: "Which of these is an input device?", answers: ["Keyboard", "Monitor", "Speaker", "Printer"], correct: "Keyboard" },
      { question: "What type of translator converts a whole high-level program into machine code before it runs?", answers: ["Compiler", "Interpreter", "Assembler", "Debugger"], correct: "Compiler" },
      { question: "Which of these is the largest unit of storage?", answers: ["Byte", "Kilobyte", "Megabyte", "Gigabyte"], correct: "Gigabyte" }
    ],
    medium: [
      { question: "What is the time complexity of a binary search?", answers: ["O(log n)", "O(n)", "O(n²)", "O(1)"], correct: "O(log n)" },
      { question: "Which data structure works on a first in, first out basis?", answers: ["Queue", "Stack", "Tree", "Array"], correct: "Queue" },
      { question: "What is the hexadecimal number FF in denary?", answers: ["15", "16", "255", "256"], correct: "255" },
      { question: "Which protocol is used to send email?", answers: ["SMTP", "FTP", "HTTP", "DNS"], correct: "SMTP" },
      { question: "Which file format uses lossy compression?", answers: ["JPEG", "PNG", "ZIP", "FLAC"], correct: "JPEG" }
    ],
    hard: [
      { question: "What is the worst-case time complexity of bubble sort?", answers: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], correct: "O(n²)" },
      { question: "Which data structure is typically used to implement a depth-first traversal of a graph?", answers: ["Stack", "Queue", "Hash table", "Heap"], correct: "Stack" },
      { question: "What does Dijkstra's algorithm find?", answers: ["The shortest path in a weighted graph", "The minimum spanning tree", "The largest value in a list", "A sorted list of nodes"], correct: "The shortest path in a weighted graph" },
      { question: "What is −5 in 8-bit two's complement?", answers: ["11111011", "10000101", "11111010", "00000101"], correct: "11111011" },
      { question: "What is a key feature of the Von Neumann architecture?", answers: ["Instructions and data are stored in the same memory", "Instructions and data use separate memories", "It has no CPU", "It only uses cache memory"], correct: "Instructions and data are stored in the same memory" }
    ]
  }
};
