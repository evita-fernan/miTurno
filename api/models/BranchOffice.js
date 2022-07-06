const { Schema, model,} = require("mongoose");

function getPrice(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
};

const branchOfficeSchema = new Schema(
  {
    location: {
      type: String,
      lowercase: true,
      required: [true, "Location is required"],
    },
    address: {
      type: String,
      lowercase: true,
      required: [true, "Address is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone is required"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, "This email already exists"],
      required: true,
      maxlength: 100,
      match: [/.+\@.+\..+/, "Fill a valid email address"],
    },
    startTime: {
      type: String,
      maxlength: 5,
      default: "09:00"
    },
    endTime: {
      type: String,
      maxlength: 5,
      default: "18:00"
    },
    daysOff: {
      type: Array,
      default: [0,6]
    },
    simultAppointment: {
      type: Number,
      default: 1,
    },
    operator: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    appointment: [{
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    }],
    price: {
      type: Schema.Types.Decimal128,
      default: 0,
      get: getPrice,
    },
    id: false,
  },
  { timestamps: true },
  { toJSON: { getters: true } }
);
//la propiedad lowercase pone en minúsculas la cadena de string antes de guardar.
//timestamps es una propiedad de monoogse que maneja automáticamente la createdAt y updatedAt
//ver como vamos a manejar los días
//turnos simultáneos -> ver como se solicitan

module.exports = model("BranchOffice", branchOfficeSchema);
