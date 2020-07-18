const mongoose = require("mongoose");

var schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: "Required.",
    unique: true,
  },
  teacherName: {
    type: String,
    required: "Required.",
  },
  teacherEmail: {
    type: String,
    required: "Required.",
  },
  teacherPhone: {
    type: String,
    required: "Required.",
  },
  studentName: {
    type: String,
    required: "Required.",
  },
  studentEmail: {
    type: String,
    required: "Required.",
  },
  studentPhone: {
    type: String,
    required: "Required.",
  },
  gamePart: [
    {
      type: String,
    },
  ],
  crinPart: [
    {
      type: String,
    },
  ],
  ppPart: [
    {
      type: String,
    },
  ],
  quizPart: [
    {
      type: String,
    },
  ],
  submittedEvents: [
    {
      type: String,
    },
  ],
});

schoolSchema.path("submittedEvents").validate((list) => {
  return list[0] !== undefined;
}, "Please Register for atleast one event");

schoolSchema.path("gamePart").validate((list) => {
  list[0] = list[0].trim();
  list[1] = list[1].trim();
  list[2] = list[2].trim();
  list[3] = list[3].trim();
  if (list[2] === "") {
    return list[0] !== "" && list[1] !== "";
  } else if (list[2] !== "") {
    return list[0] !== "" && list[1] !== "" && list[2] !== "" && list[3] !== "";
  }
}, "Please Provide participant details or leave empty");

schoolSchema.path("crinPart").validate((list) => {
  list[0] = list[0].trim();
  list[1] = list[1].trim();
  list[2] = list[2].trim();
  list[3] = list[3].trim();
  list[4] = list[4].trim();
  list[5] = list[5].trim();
  if (list[2] === "") {
    return list[0] !== "" && list[1] !== "";
  }
  if (list[4] === "") {
    return list[0] !== "" && list[1] !== "" && list[2] !== "" && list[3] !== "";
  }
  if (list[4] !== "") {
    return (
      list[0] !== "" &&
      list[1] !== "" &&
      list[2] !== "" &&
      list[3] !== "" &&
      list[4] !== "" &&
      list[5] !== ""
    );
  }
}, "Please Provide participant details or leave empty");

schoolSchema.path("ppPart").validate((list) => {
  list[0] = list[0].trim();
  list[1] = list[1].trim();
  list[2] = list[2].trim();
  list[3] = list[3].trim();
  if (list[1] === "") {
    return list[0] !== "";
  }
  if (list[2] === "") {
    return list[0] !== "" && list[1] !== "";
  } else if (list[2] !== "") {
    return list[0] !== "" && list[1] !== "" && list[2] !== "" && list[3] !== "";
  }
}, "Please Provide participant details or leave empty");

schoolSchema.path("quizPart").validate((list) => {
  list[0] = list[0].trim();
  list[1] = list[1].trim();
  return list[0] !== "" && list[1] !== "";
}, "Please Register atleast two participants for quiz.");

schoolSchema.path("teacherEmail").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Please enter a valid email address.");

schoolSchema.path("studentEmail").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Please enter a valid email address.");

schoolSchema.path("teacherPhone").validate((val) => {
  phoneRegex = /^[7-9]{1}[0-9]{9}$/;
  return phoneRegex.test(val);
}, "Please enter a valid Phone Number");

schoolSchema.path("studentPhone").validate((val) => {
  phoneRegex = /^[7-9]{1}[0-9]{9}$/;
  return phoneRegex.test(val);
}, "Please enter a valid Phone Number");

mongoose.model("School", schoolSchema);
