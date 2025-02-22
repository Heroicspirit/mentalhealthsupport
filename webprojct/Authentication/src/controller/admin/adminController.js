import Appointment from "../../models/appointment/appointmentModel.js";

// Fetch all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, problem, duration } = req.body;
    const appointment = await Appointment.findByPk(id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.date = date;
    appointment.time = time;
    appointment.problem = problem;
    appointment.duration = duration;

    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.destroy({ where: { id } });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
