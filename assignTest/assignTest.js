const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Institute = require("./models/Institute");
const Branch = require("./models/Branch");
const Batch = require("./models/Batch");
const MasterData = require("./models/MasterData");
const InstituteTestV2 = require("./models/InstituteTestV2");

//TODO:check for the course id and subjectIds, instituteids
//TODO: save test

const courses = [
  {
    courseId: "66fa4116a3c5b1ec74a77cee",
    courseName: "Offline Grade 11",
  },
  {
    courseId: "66fa4199a3c5b1ec74a77cef",
    courseName: "Offline Grade 12",
  },
];

const instituteIds = [
  "6707b1b95f7e900a7bccd9a5",
  "6707b1ba5f7e900a7bccdf16",
  "6707b1bb5f7e900a7bcce6a1",
  "6707b1bc5f7e900a7bccebb7",
  "6707b1bc5f7e900a7bccf0fa",
  "6707b1bd5f7e900a7bccf6af",
  "6707b1be5f7e900a7bccfbd4",
  "6707b1be5f7e900a7bccff68",
  "6707b1be5f7e900a7bcd04a5",
  "6707b1bf5f7e900a7bcd0800",
  "6707b1bf5f7e900a7bcd0bb8",
  "6707b1bf5f7e900a7bcd0d94",
  "6707b1c05f7e900a7bcd1164",
  "6707b1c05f7e900a7bcd1555",
  "6707b1c15f7e900a7bcd18ef",
  "6707b1c15f7e900a7bcd2035",
  "6707b1c25f7e900a7bcd25c3",
  "6707b1c25f7e900a7bcd29a5",
  "6707b1c35f7e900a7bcd2cf4",
  "6707b1c35f7e900a7bcd2ee2",
  "6707b1c35f7e900a7bcd326d",
  "6707b1c45f7e900a7bcd37d1",
  "6707b1c45f7e900a7bcd3bb6",
  "6707b1c55f7e900a7bcd40e7",
  "6707b1c55f7e900a7bcd4466",
  "6707b1c65f7e900a7bcd4812",
  "6707b1c65f7e900a7bcd4d55",
  "6707b1c75f7e900a7bcd5131",
  "6707b1c75f7e900a7bcd5522",
  "6707b1c85f7e900a7bcd5a9e",
];

const chaptersMap = [
  {
    chapterId: "66fa78e4438174cdb75ec2f3",
    chapterName: "Offline Digestion and Absorption",
    lmsChapter: [
      {
        chapterId: "66fa831b547f3353b4f6c008",
        chapterName: "Digestion and Absorption",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2e9",
    chapterName: "Offline Plant Kingdom",
    lmsChapter: [
      {
        chapterId: "66fa8312547f3353b4f6b796",
        chapterName: "Plant Kingdom",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2ec",
    chapterName: "Offline Structural Organization in Animals",
    lmsChapter: [
      {
        chapterId: "66fa8316547f3353b4f6bb18",
        chapterName: "Structural Organization in Animals",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f1",
    chapterName: "Offline Respiration in Plants",
    lmsChapter: [
      {
        chapterId: "66fa8319547f3353b4f6bec4",
        chapterName: "Respiration in Plants",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f9",
    chapterName: "Offline Chemical Control & Coordination",
    lmsChapter: [
      {
        chapterId: "66fa831e547f3353b4f6c37c",
        chapterName: "Chemical Control & Coordination",
      },
    ],
  },
  {
    chapterId: "66fe7a3e5207623842c52d03",
    chapterName: "Offline Morphology",
    lmsChapter: [
      {
        chapterId: "6700e326ce69d6a63824f961",
        chapterName: "Morphology",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f2",
    chapterName: "Offline Plant Growth and Development",
    lmsChapter: [
      {
        chapterId: "66fa831a547f3353b4f6bf8c",
        chapterName: "Plant Growth and Development",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f0",
    chapterName: "Offline Photosynthesis in Higher Plants",
    lmsChapter: [
      {
        chapterId: "66fa8319547f3353b4f6be24",
        chapterName: "Photosynthesis in Higher Plants",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2e7",
    chapterName: "Offline The Living World",
    lmsChapter: [
      {
        chapterId: "66fa8310547f3353b4f6b5da",
        chapterName: "The Living World",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f6",
    chapterName: "Offline Excretory Products and their Elimination",
    lmsChapter: [
      {
        chapterId: "66fa831c547f3353b4f6c16a",
        chapterName: "Excretory Products and their Elimination",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2e8",
    chapterName: "Offline Biological Classification",
    lmsChapter: [
      {
        chapterId: "66fa8311547f3353b4f6b674",
        chapterName: "Biological Classification",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2ef",
    chapterName: "Offline Cell Cycle and Cell Division",
    lmsChapter: [
      {
        chapterId: "66fa8319547f3353b4f6bdd0",
        chapterName: "Cell Cycle and Cell Division",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f8",
    chapterName: "Offline Neural Control and Coordination",
    lmsChapter: [
      {
        chapterId: "66fa831d547f3353b4f6c2ca",
        chapterName: "Neural Control and Coordination",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f5",
    chapterName: "Offline Body Fluids and Circulation",
    lmsChapter: [
      {
        chapterId: "66fa831b547f3353b4f6c0d8",
        chapterName: "Body Fluids and Circulation",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f7",
    chapterName: "Offline Locomotion and Movement",
    lmsChapter: [
      {
        chapterId: "66fa831c547f3353b4f6c1fe",
        chapterName: "Locomotion and Movement",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2ea",
    chapterName: "Offline Animal Kingdom",
    lmsChapter: [
      {
        chapterId: "66fa8313547f3353b4f6b862",
        chapterName: "Animal Kingdom",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2eb",
    chapterName: "Offline Anatomy of Flowering Plants",
    lmsChapter: [
      {
        chapterId: "66fa8315547f3353b4f6ba7c",
        chapterName: "Anatomy of Flowering Plants",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2ed",
    chapterName: "Offline Cell the Unit of Life",
    lmsChapter: [
      {
        chapterId: "66fa8317547f3353b4f6bbf4",
        chapterName: "Cell the Unit of Life",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2ee",
    chapterName: "Offline Biomolecules",
    lmsChapter: [
      {
        chapterId: "66fa8318547f3353b4f6bcca",
        chapterName: "Biomolecules",
      },
    ],
  },
  {
    chapterId: "66fa78e4438174cdb75ec2f4",
    chapterName: "Offline Breathing and Exchange of Gases",
    lmsChapter: [
      {
        chapterId: "66fa831b547f3353b4f6c060",
        chapterName: "Breathing and Exchange of Gases",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec2fa",
    chapterName: "Offline Some Basic Concepts of Chemistry",
    lmsChapter: [
      {
        chapterId: "66fa831e547f3353b4f6c3ee",
        chapterName: "Some Basic Concepts of Chemistry",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec2fc",
    chapterName:
      "Offline Classification of Elements and Periodicity in Properties",
    lmsChapter: [
      {
        chapterId: "66fa831f547f3353b4f6c52e",
        chapterName: "Classification of Elements and Periodicity in Properties",
      },
    ],
  },
  {
    chapterId: "66fe41c05207623842c52cfb",
    chapterName: "Offline Chemical Equilibrium",
    lmsChapter: [
      {
        chapterId: "6700e4eece69d6a63824f96b",
        chapterName: "Chemical Equilibrium",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec300",
    chapterName: "Offline p-Block",
    lmsChapter: [
      {
        chapterId: "66fa8322547f3353b4f6c7a4",
        chapterName: "p-Block",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec302",
    chapterName: "Offline Hydrocarbon",
    lmsChapter: [
      {
        chapterId: "66fa8323547f3353b4f6c9a0",
        chapterName: "Hydrocarbon",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec2ff",
    chapterName: "Offline Redox Reaction",
    lmsChapter: [
      {
        chapterId: "66fa8321547f3353b4f6c746",
        chapterName: "Redox Reaction",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec2fd",
    chapterName: "Offline Chemical Bonding and Molecular Structure",
    lmsChapter: [
      {
        chapterId: "66fa831f547f3353b4f6c570",
        chapterName: "Chemical Bonding and Molecular Structure",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec2fb",
    chapterName: "Offline Structure of Atom",
    lmsChapter: [
      {
        chapterId: "66fa831e547f3353b4f6c464",
        chapterName: "Structure of Atom",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec301",
    chapterName: "Offline Organic Chemistry",
    lmsChapter: [
      {
        chapterId: "66fa8322547f3353b4f6c7fe",
        chapterName: "Organic Chemistry",
      },
    ],
  },
  {
    chapterId: "66fa7acf438174cdb75ec2fe",
    chapterName: "Offline Thermodynamics",
    lmsChapter: [
      {
        chapterId: "66fa8321547f3353b4f6c6a8",
        chapterName: "Thermodynamics",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec339",
    chapterName: "Offline Complex Numbers",
    lmsChapter: [
      {
        chapterId: "66fa832e547f3353b4f6d418",
        chapterName: "Complex Numbers",
      },
    ],
  },
  {
    chapterId: "66fe5dc65207623842c52cfe",
    chapterName: "Offline Relations & Functions",
    lmsChapter: [
      {
        chapterId: "6703b0da228f6c6792eaba47",
        chapterName: "Relations & Functions",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec33b",
    chapterName: "Offline Permutation and Combination",
    lmsChapter: [
      {
        chapterId: "66fa832f547f3353b4f6d4de",
        chapterName: "Permutation and Combination",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec33c",
    chapterName: "Offline Binomial Theorem",
    lmsChapter: [
      {
        chapterId: "66fa832f547f3353b4f6d520",
        chapterName: "Binomial Theorem",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec341",
    chapterName: "Offline Statistics",
    lmsChapter: [
      {
        chapterId: "66fa8332547f3353b4f6d7ee",
        chapterName: "Statistics",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec33f",
    chapterName: "Offline Conic Sections",
    lmsChapter: [
      {
        chapterId: "66fa8330547f3353b4f6d66c",
        chapterName: "Conic Sections",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec33a",
    chapterName: "Offline Complex Numbers and Quadratic Equations",
    lmsChapter: [
      {
        chapterId: "66fa832f547f3353b4f6d496",
        chapterName: "Complex Numbers and Quadratic Equations",
      },
    ],
  },
  {
    chapterId: "670104fbce69d6a63824f970",
    chapterName: "Offline Trignometric Functions",
    lmsChapter: [
      {
        chapterId: "670105c7ce69d6a63824f975",
        chapterName: "Trignometric Functions",
      },
    ],
  },
  {
    chapterId: "670104fbce69d6a63824f972",
    chapterName: "Offline Limits and Derivatives",
    lmsChapter: [
      {
        chapterId: "670105c7ce69d6a63824f978",
        chapterName: "Limits and Derivatives",
      },
    ],
  },
  {
    chapterId: "670104fbce69d6a63824f971",
    chapterName: "Offline Introduction to three dimensional geometry",
    lmsChapter: [
      {
        chapterId: "670105c7ce69d6a63824f977",
        chapterName: "Introduction to three dimensional geometry",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec340",
    chapterName: "Offline Mathematical Reasoning",
    lmsChapter: [],
  },
  {
    chapterId: "670104fbce69d6a63824f973",
    chapterName: "Offline Probability",
    lmsChapter: [
      {
        chapterId: "670105c7ce69d6a63824f979",
        chapterName: "Probability",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec338",
    chapterName: "Offline Set of Theory",
    lmsChapter: [
      {
        chapterId: "66fa832e547f3353b4f6d3fa",
        chapterName: "Set of Theory",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec33d",
    chapterName: "Offline Sequences and Series",
    lmsChapter: [
      {
        chapterId: "66fa832f547f3353b4f6d564",
        chapterName: "Sequences and Series",
      },
    ],
  },
  {
    chapterId: "670104fbce69d6a63824f96f",
    chapterName: "Offline Linear Inequalities",
    lmsChapter: [
      {
        chapterId: "670105c7ce69d6a63824f976",
        chapterName: "Linear Inequalities",
      },
    ],
  },
  {
    chapterId: "66fa812a438174cdb75ec33e",
    chapterName: "Offline Straight Lines",
    lmsChapter: [
      {
        chapterId: "66fa8330547f3353b4f6d5aa",
        chapterName: "Straight Lines",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec30a",
    chapterName: "Offline Mechanical Properties of Solids",
    lmsChapter: [
      {
        chapterId: "66fa832b547f3353b4f6d04e",
        chapterName: "Mechanical Properties of Solids",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec306",
    chapterName: "Offline Motion in a Plane",
    lmsChapter: [
      {
        chapterId: "66fa8327547f3353b4f6ccb4",
        chapterName: "Motion in a Plane",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec30f",
    chapterName: "Offline Oscillation",
    lmsChapter: [
      {
        chapterId: "66fa832d547f3353b4f6d2f0",
        chapterName: "Oscillation",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec30e",
    chapterName: "Offline Kinetic Theory",
    lmsChapter: [
      {
        chapterId: "66fa832d547f3353b4f6d294",
        chapterName: "Kinetic Theory",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec30d",
    chapterName: "Offline Thermodynamics",
    lmsChapter: [
      {
        chapterId: "66fa832d547f3353b4f6d212",
        chapterName: "Thermodynamics",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec30b",
    chapterName: "Offline Mechanical Properties of Fluids",
    lmsChapter: [
      {
        chapterId: "66fa832b547f3353b4f6d0ae",
        chapterName: "Mechanical Properties of Fluids",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec30c",
    chapterName: "Offline Thermal Properties of Matter",
    lmsChapter: [
      {
        chapterId: "66fa832c547f3353b4f6d164",
        chapterName: "Thermal Properties of Matter",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec310",
    chapterName: "Offline WAVES",
    lmsChapter: [
      {
        chapterId: "66fa832e547f3353b4f6d348",
        chapterName: "WAVES",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec307",
    chapterName: "Offline Work Power Energy",
    lmsChapter: [
      {
        chapterId: "66fa8328547f3353b4f6cda4",
        chapterName: "Work Power Energy",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec305",
    chapterName: "Offline Laws of Motion",
    lmsChapter: [
      {
        chapterId: "66fa8326547f3353b4f6cbb0",
        chapterName: "Laws of Motion",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec309",
    chapterName: "Offline Gravitation",
    lmsChapter: [
      {
        chapterId: "66fa832a547f3353b4f6cfb2",
        chapterName: "Gravitation",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec308",
    chapterName: "Offline System of Particles and Rotational Movement",
    lmsChapter: [
      {
        chapterId: "6703ade5228f6c6792eaba42",
        chapterName: "System of Particles and Rotational Movement",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec303",
    chapterName: "Offline Units and Measurement",
    lmsChapter: [
      {
        chapterId: "66fa8324547f3353b4f6ca32",
        chapterName: "Units and Measurement",
      },
    ],
  },
  {
    chapterId: "66fa7baf438174cdb75ec304",
    chapterName: "Offline Motion in a Straight Line",
    lmsChapter: [
      {
        chapterId: "66fa8325547f3353b4f6cad0",
        chapterName: "Motion in a Straight Line",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec322",
    chapterName: "Offline P Block Element",
    lmsChapter: [
      {
        chapterId: "66fa83643dece03c7ab32861",
        chapterName: "P Block Element",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec323",
    chapterName: "Offline D & F Block Elements",
    lmsChapter: [
      {
        chapterId: "66fa83653dece03c7ab3299f",
        chapterName: "D & F Block Elements",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec328",
    chapterName: "Offline Amines",
    lmsChapter: [
      {
        chapterId: "66fa83693dece03c7ab32d17",
        chapterName: "Amines",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec326",
    chapterName: "Offline Alcohol, Phenols and Ethers",
    lmsChapter: [
      {
        chapterId: "66fa83673dece03c7ab32b87",
        chapterName: "Alcohol, Phenols and Ethers",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec325",
    chapterName: "Offline Haloalkanes and Haloarenes",
    lmsChapter: [
      {
        chapterId: "66fa83673dece03c7ab32ae9",
        chapterName: "Haloalkanes and Haloarenes",
      },
    ],
  },
  {
    chapterId: "66fe706a5207623842c52d01",
    chapterName: "Offline Practical Chemistry",
    lmsChapter: [
      {
        chapterId: "6703b14e228f6c6792eaba49",
        chapterName: "Practical Chemistry",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec321",
    chapterName: "Offline Chemical Kinetics",
    lmsChapter: [
      {
        chapterId: "66fa83633dece03c7ab327b3",
        chapterName: "Chemical Kinetics",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec31f",
    chapterName: "Offline Solutions",
    lmsChapter: [
      {
        chapterId: "66fa83613dece03c7ab32641",
        chapterName: "Solutions",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec320",
    chapterName: "Offline Electrochemistry",
    lmsChapter: [
      {
        chapterId: "66fa83623dece03c7ab32715",
        chapterName: "Electrochemistry",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec329",
    chapterName: "Offline Biomolecules",
    lmsChapter: [
      {
        chapterId: "66fa836a3dece03c7ab32dad",
        chapterName: "Biomolecules",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec327",
    chapterName: "Offline Aldehydes, Ketones AND CARBOXYLIC ACIDS",
    lmsChapter: [
      {
        chapterId: "66fa83683dece03c7ab32c63",
        chapterName: "Aldehydes, Ketones AND CARBOXYLIC ACIDS",
      },
    ],
  },
  {
    chapterId: "66fa7f6c438174cdb75ec324",
    chapterName: "Offline Coordination Compounds",
    lmsChapter: [
      {
        chapterId: "66fa83663dece03c7ab32a57",
        chapterName: "Coordination Compounds",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec32a",
    chapterName: "Offline Electric charges and Field",
    lmsChapter: [
      {
        chapterId: "66fa836a3dece03c7ab32e77",
        chapterName: "Electric charges and Field",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec32b",
    chapterName: "Offline Electrostatic-Potential and Capacitors",
    lmsChapter: [
      {
        chapterId: "6703ade5228f6c6792eaba43",
        chapterName: "Electrostatic-Potential and Capacitors",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec331",
    chapterName: "Offline Electromagnetic Waves",
    lmsChapter: [
      {
        chapterId: "66fa836f3dece03c7ab332a5",
        chapterName: "Electromagnetic Waves",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec32f",
    chapterName: "Offline Electromagnetic Induction",
    lmsChapter: [
      {
        chapterId: "66fa836e3dece03c7ab33193",
        chapterName: "Electromagnetic Induction",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec333",
    chapterName: "Offline Wave Optics",
    lmsChapter: [
      {
        chapterId: "66fa83703dece03c7ab333af",
        chapterName: "Wave Optics",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec332",
    chapterName: "Offline Ray Optics And Optical Instruments",
    lmsChapter: [
      {
        chapterId: "66fa836f3dece03c7ab332d7",
        chapterName: "Ray Optics And Optical Instruments",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec32c",
    chapterName: "Offline Current electricity",
    lmsChapter: [
      {
        chapterId: "66fa836c3dece03c7ab32fbd",
        chapterName: "Current electricity",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec330",
    chapterName: "Offline Alternating current",
    lmsChapter: [
      {
        chapterId: "6703b23c228f6c6792eaba4c",
        chapterName: "Alternating current",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec32e",
    chapterName: "Offline Magnetism and Matter",
    lmsChapter: [
      {
        chapterId: "66fa836e3dece03c7ab33159",
        chapterName: "Magnetism and Matter",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec337",
    chapterName: "Offline Semiconductor Electronics",
    lmsChapter: [
      {
        chapterId: "66fa83713dece03c7ab334af",
        chapterName: "Semiconductor Electronics",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec336",
    chapterName: "Offline Nuclei",
    lmsChapter: [
      {
        chapterId: "66fa83713dece03c7ab33481",
        chapterName: "Nuclei",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec32d",
    chapterName: "Offline Moving Charges and magnetism",
    lmsChapter: [
      {
        chapterId: "66fa836d3dece03c7ab3309b",
        chapterName: "Moving Charges and magnetism",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec334",
    chapterName: "Offline Dual Nature Of Radiation And Matter",
    lmsChapter: [
      {
        chapterId: "66fa83703dece03c7ab33401",
        chapterName: "Dual Nature Of Radiation And Matter",
      },
    ],
  },
  {
    chapterId: "66fa8079438174cdb75ec335",
    chapterName: "Offline Atoms",
    lmsChapter: [
      {
        chapterId: "66fa83703dece03c7ab33431",
        chapterName: "Atoms",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec316",
    chapterName: "Offline Molecular Basis of Inheritance",
    lmsChapter: [
      {
        chapterId: "66fa835c3dece03c7ab32157",
        chapterName: "Molecular Basis of Inheritance",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec313",
    chapterName: "Offline Human Reproduction",
    lmsChapter: [
      {
        chapterId: "66fa835a3dece03c7ab31f09",
        chapterName: "Human Reproduction",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec319",
    chapterName: "Offline Microbes in Human Welfare",
    lmsChapter: [
      {
        chapterId: "66fa835f3dece03c7ab32429",
        chapterName: "Microbes in Human Welfare",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec317",
    chapterName: "Offline Evolution",
    lmsChapter: [
      {
        chapterId: "66fa835d3dece03c7ab3223d",
        chapterName: "Evolution",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec311",
    chapterName: "Offline Reproduction in Organism",
    lmsChapter: [
      {
        chapterId: "66fa83583dece03c7ab31de1",
        chapterName: "Reproduction in Organism",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec31c",
    chapterName: "Offline Organisms and Population",
    lmsChapter: [
      {
        chapterId: "66fa83603dece03c7ab32523",
        chapterName: "Organisms and Population",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec31e",
    chapterName: "Offline Biodiversity and Conservation",
    lmsChapter: [
      {
        chapterId: "66fa83613dece03c7ab325f1",
        chapterName: "Biodiversity and Conservation",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec31d",
    chapterName: "Offline Ecosystem",
    lmsChapter: [
      {
        chapterId: "66fa83613dece03c7ab325a3",
        chapterName: "Ecosystem",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec31a",
    chapterName: "Offline Biotechnology Principles and Processes",
    lmsChapter: [
      {
        chapterId: "66fa835f3dece03c7ab3246d",
        chapterName: "Biotechnology Principles and Processes",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec31b",
    chapterName: "Offline Biotechnology and its Application",
    lmsChapter: [
      {
        chapterId: "66fa83603dece03c7ab324e5",
        chapterName: "Biotechnology and its Application",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec314",
    chapterName: "Offline Reproductive Health",
    lmsChapter: [
      {
        chapterId: "66fa835a3dece03c7ab31fbd",
        chapterName: "Reproductive Health",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec315",
    chapterName: "Offline Principles of Inheritance",
    lmsChapter: [
      {
        chapterId: "66fa835b3dece03c7ab32047",
        chapterName: "Principles of Inheritance",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec318",
    chapterName: "Offline Human Health and Disease",
    lmsChapter: [
      {
        chapterId: "66fa835e3dece03c7ab3230d",
        chapterName: "Human Health and Disease",
      },
    ],
  },
  {
    chapterId: "66fa7eab438174cdb75ec312",
    chapterName: "Offline Sexual Reproduction in Flowering Plants",
    lmsChapter: [
      {
        chapterId: "66fa83583dece03c7ab31e35",
        chapterName: "Sexual Reproduction in Flowering Plants",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f952",
    chapterName: "Offline Continuity and Differentiability",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f966",
        chapterName: "Continuity and Differentiability",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f955",
    chapterName: "Offline Linear Programming",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f969",
        chapterName: "Linear Programming",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec346",
    chapterName: "Offline Vector Algebra",
    lmsChapter: [
      {
        chapterId: "66fa83733dece03c7ab3368d",
        chapterName: "Vector Algebra",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec347",
    chapterName: "Offline Introduction to Three Dimensional Geometry",
    lmsChapter: [
      {
        chapterId: "66fa83733dece03c7ab336e1",
        chapterName: "Introduction to Three Dimensional Geometry",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec348",
    chapterName: "Offline Probability",
    lmsChapter: [
      {
        chapterId: "66fa83733dece03c7ab3372f",
        chapterName: "Probability",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f954",
    chapterName: "Offline Differential Equations",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f968",
        chapterName: "Differential Equations",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f950",
    chapterName: "Offline Matrices",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f964",
        chapterName: "Matrices",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec343",
    chapterName: "Offline Limits and Derivatives",
    lmsChapter: [
      {
        chapterId: "66fa83723dece03c7ab3359b",
        chapterName: "Limits and Derivatives",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec342",
    chapterName: "Offline Relations and Functions",
    lmsChapter: [
      {
        chapterId: "66fa83713dece03c7ab33505",
        chapterName: "Relations and Functions",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f953",
    chapterName: "Offline Application of Integrals",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f967",
        chapterName: "Application of Integrals",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec345",
    chapterName: "Offline Integrals",
    lmsChapter: [
      {
        chapterId: "66fa83733dece03c7ab33643",
        chapterName: "Integrals",
      },
    ],
  },
  {
    chapterId: "66fa8212438174cdb75ec344",
    chapterName: "Offline Applications of Derivatives",
    lmsChapter: [
      {
        chapterId: "66fa83723dece03c7ab33625",
        chapterName: "Applications of Derivatives",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f94f",
    chapterName: "Offline Inverse Trigonometric Functions",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f963",
        chapterName: "Inverse Trigonometric Functions",
      },
    ],
  },
  {
    chapterId: "6700e030ce69d6a63824f951",
    chapterName: "Offline Determinants",
    lmsChapter: [
      {
        chapterId: "6700e41bce69d6a63824f965",
        chapterName: "Determinants",
      },
    ],
  },
];
const subjectMap = [
  {
    subjectId: "66fa4611a3c5b1ec74a77cf6",
    subjectName: "Offline G11 Biology",
    lmsSubject: [
      {
        subjectId: "66fa8310547f3353b4f6b5d9",
        subjectName: "Biology",
      },
    ],
  },
  {
    subjectId: "66fa45bfa3c5b1ec74a77cf5",
    subjectName: "Offline G11 Chemistry",
    lmsSubject: [
      {
        subjectId: "66fa831e547f3353b4f6c3ed",
        subjectName: "Chemistry",
      },
    ],
  },
  {
    subjectId: "66fa4623a3c5b1ec74a77cf7",
    subjectName: "Offline G11 Mathematics",
    lmsSubject: [
      {
        subjectId: "66fa832e547f3353b4f6d3f9",
        subjectName: "Mathematics",
      },
    ],
  },
  {
    subjectId: "66fa45b3a3c5b1ec74a77cf4",
    subjectName: "Offline G11 Physics",
    lmsSubject: [
      {
        subjectId: "66fa8324547f3353b4f6ca31",
        subjectName: "Physics",
      },
    ],
  },
  {
    subjectId: "66fa6d40a3c5b1ec74a77d06",
    subjectName: "Offline G12 Chemistry",
    lmsSubject: [
      {
        subjectId: "66fa83613dece03c7ab32640",
        subjectName: "Chemistry",
      },
    ],
  },
  {
    subjectId: "66fa6d21a3c5b1ec74a77d05",
    subjectName: "Offline G12 Physics",
    lmsSubject: [
      {
        subjectId: "66fa836a3dece03c7ab32e76",
        subjectName: "Physics",
      },
    ],
  },
  {
    subjectId: "66fa6d4aa3c5b1ec74a77d07",
    subjectName: "Offline G12 Biology",
    lmsSubject: [
      {
        subjectId: "66fa83583dece03c7ab31de0",
        subjectName: "Biology",
      },
    ],
  },
  {
    subjectId: "66fa6d58a3c5b1ec74a77d08",
    subjectName: "Offline G12 Mathematics",
    lmsSubject: [
      {
        subjectId: "66fa83713dece03c7ab33504",
        subjectName: "Mathematics",
      },
    ],
  },
];
const courseMap = [
  {
    courseId: "66fa4116a3c5b1ec74a77cee",
    courseName: "Offline Grade 11",
    lsmCourse: [
      {
        courseId: "66f7cacfb888a39510871c26",
        courseName: "Grade 11",
      },
    ],
  },
  {
    courseId: "66fa4199a3c5b1ec74a77cef",
    courseName: "Offline Grade 12",
    lsmCourse: [
      {
        courseId: "66f7cad9b888a39510871c29",
        courseName: "Grade 12",
      },
    ],
  },
];

const createAssessment = async ({
  assesments,
  institutes,
  className,
  grade,
}) => {
  const formattedTests = [];
  for (const test of assesments) {
    const lmsCourse = courseMap.find(
      (c) => c.courseId === test.course_id.toString()
    ).lsmCourse[0];
    const lmsSubject = subjectMap.find(
      (s) =>
        s.subjectId ===
        test.test_details.subjects_details[0].subject_id.toString()
    ).lmsSubject[0];
    const lmschapterId = chaptersMap.find(
      (c) =>
        c.chapterId ===
        test.test_details.subjects_details[0].sections[0].questions_list[0].chapterId.toString()
    ).lmsChapter[0].chapterId;
    test.course_id = lmsCourse.courseId;
    test.course_name = lmsCourse.courseName;
    test.test_details.subjects_details[0].subject_id = lmsSubject.subjectId;
    test.test_details.subjects_details[0].subject_name = lmsSubject.subjectName;
    for (const question of test.test_details.subjects_details[0].sections[0]
      .questions_list) {
      question.chapterId = lmschapterId;
      question.courseId = lmsCourse.courseId;
      question.subjectId = lmsSubject.subjectId;
    }

    for (const institute of institutes) {
      let instituteTests = formattedTests.find(
        (ft) =>
          ft.courseId === lmsCourse.courseId &&
          ft.subjectId === lmsSubject.subjectId &&
          ft.instituteId === institute._id.toString()
      );
      if (!instituteTests) {
        instituteTests = {
          courseId: lmsCourse.courseId,
          subjectId: lmsSubject.subjectId,
          instituteId: institute._id.toString(),
          tests: [],
          testList: [],
        };
        formattedTests.push(instituteTests);
      }
      test.institute_details = {
        institute_id: institute._id,
        institute_name: institute.name,
      };
      const branches = await Branch.find({ instituteId: institute._id });
      const branchForTest = branches.map((br) => ({
        branch_id: br._id,
        branch_name: br.name,
      }));
      test.branch_details = branchForTest;
      const batches = await Batch.find({
        instituteId: institute._id,
        name: className, //"Class 11",
      });
      const batchesForTest = batches.map((bt) => ({
        batch_id: bt._id,
        batch_name: bt.name,
        branch_id: bt.branchId,
        branch_name: bt.branchName,
        institute_id: bt.instituteId,
        institute_name: bt.instituteName,
        totalStudents: bt.studentCount,
        totalSubmits: 0,
      }));
      test.batch_details = batchesForTest;
      test.password = "";
      test.status = "ASSIGNED";
      test.test_end_time = "2024-11-14T15:30:00.000Z";
      test.test_start_time = "2025-05-18T07:30:00.000Z";
      test.attempted = false;
      test.last_updated_by = {
        id: test.created_by,
        date_time: "2024-09-18T06:25:16.376Z",
      };
      delete test._id;
      const newTest = new InstituteTestV2(test);
      await newTest.save();
      instituteTests.testList.push({
        _id: newTest._id,
        institute_test_name: newTest.institute_test_name,
        test_pattern_details: newTest.test_pattern_details,
        course_id: newTest.course_id,
        course_name: newTest.course_name,
        test_duration: newTest.test_duration,
        password: newTest.password,
        created_by: newTest.created_by,
        test_type: newTest.test_type,
        total_test_questions: newTest.total_test_questions,
        total_marks: newTest.total_marks,
        instruction_text: newTest.instruction_text,
        result_announce: newTest.result_announce,
        result_announce_time: newTest.result_announce_time,
        enabled: newTest.enabled,
        status: newTest.status,
        branch_details: newTest.branch_details,
        batch_details: newTest.batch_details,
        createdAt: newTest.createdAt,
        institute_details: newTest.institute_details,
        test_end_time: newTest.test_end_time,
        test_start_time: newTest.test_start_time,
        assigned_by: {
          _id: newTest.created_by,
          firstName: "Superadmin",
          role: "superAdmin",
        },
        test_details: {
          subjects_details: newTest.test_details.subjects_details.map(
            (subDetail) => {
              return {
                subject_name: subDetail.subject_name,
                subject_id: subDetail.subject_id,
                are_all_questions_added_for_subject:
                  subDetail.are_all_questions_added_for_subject,
                teacher_details: {
                  teacher_id: subDetail.teacher_details.teacher_id,
                  teacher_name: subDetail.teacher_details.teacher_name,
                },
              };
            }
          ),
        },
      });
      instituteTests.tests.push({
        ...newTest.toObject(),
        test_details: newTest.test_details.subjects_details,
      });
    }
  }

  for (const formattedTest of formattedTests) {
    console.log(
      "Grade: ",
      grade,
      formattedTest.tests.length,
      formattedTest.testList.length
    );
    const dirPath = path.join(
      "excelsheets",
      "assessments",
      formattedTest.courseId,
      formattedTest.subjectId,
      formattedTest.instituteId
    );
    const testFilePath = path.join(dirPath, "tests.json");
    const testListFilePath = path.join(dirPath, "testList.json");
    try {
      // Create the directory if it doesn't exist
      fs.mkdirSync(dirPath, { recursive: true });

      const jsonTestData = JSON.stringify(
        { data: formattedTest.tests },
        null,
        2
      )
        .replace(/<mark>/g, "")
        .replace(/<\/mark>/g, "")
        .replace(
          /https:\/\/testimages\.futuretechschool\.in\/question-images\/offline\//g,
          "question-images/"
        );

      const jsonTestListData = JSON.stringify(
        { data: formattedTest.testList },
        null,
        2
      )
        .replace(/<mark>/g, "")
        .replace(/<\/mark>/g, "")
        .replace(
          /https:\/\/testimages\.futuretechschool\.in\/question-images\/offline\//g,
          "question-images/"
        );

      // Write the file synchronously
      fs.writeFileSync(testFilePath, jsonTestData, "utf8");
      fs.writeFileSync(testListFilePath, jsonTestListData, "utf8");

      console.log(`File has been saved as ${testFilePath}`);
      console.log(`File has been saved as ${testListFilePath}`);
    } catch (err) {
      console.error("Error writing file:", err);
    }
  }
};

// Main function to create workbooks
const createWorkbooks = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/lms", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to local MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }

  //start
  const institutes = await Institute.find({ _id: { $in: instituteIds } });
  const assessmentsJson11 = [];
  const assessmentsJson12 = [];
  const assessmentListJson11 = [];
  const assessmentListJson12 = [];
  const grade11Assessments = await InstituteTestV2.find({
    course_id: courses[0].courseId,
    is_active: true,
  }).lean();
  const grade12Assessments = await InstituteTestV2.find({
    course_id: courses[1].courseId,
    is_active: true,
  }).lean();
  console.log(
    "assesment le",
    grade11Assessments.length,
    grade12Assessments.length
  );
  await createAssessment({
    assesments: grade11Assessments,
    institutes,
    className: "Class 11",
    grade: 11,
  });
  await createAssessment({
    assesments: grade12Assessments,
    institutes,
    className: "Class 12",
    grade: 12,
  });

  // Disconnect from the database
  await mongoose.disconnect();

  console.log("Disconnected from MongoDB");
};

(async () => {
  // Read input data and create workbooks
  await createWorkbooks();
})();

function splitArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}