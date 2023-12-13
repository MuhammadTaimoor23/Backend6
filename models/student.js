var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var studentSchema = mongoose.Schema({
  id: String,
  name : String,
  marks:Number
});
var Student = mongoose.model("student", studentSchema);

function validatestudent(data) {
  const schema = Joi.object({
    id: Joi.string().min(3).max(10).required(),
    name: Joi.string().min(3).max(10).required(),
    marks: Joi.number().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Student = Student;
module.exports.validate = validatestudent;
