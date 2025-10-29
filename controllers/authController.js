import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sendWelcomeEmail } from "../utils/emailService.js";

export const login = async (req, res) => {

    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email })

        if (!userData) {
            return res.status(400).json(
                {
                    error: "authenication failed",
                    status: false,
                    data: null
                })
        }
        const passwordMatch = await bcrypt.compare(password, userData.password)

        if (!passwordMatch) {
            return res.status(400).json({
                error: "Password authentication failed",
                status: false,
                data: null
            })
        }
        const token = jwt.sign(
            { userId: userData._id },
            process.env.JWT_TOKEN,
            { expiresIn: "30d" }
        )
        res.status(200).json({
            message: "login sucessful",
            status: true,
            data: userData,
            token
        })

    } catch (error) {
        res.status(500).json(
            {
                error: "login failed"
            }
        )
    }

}
///register


export const register = async (req, res) => {
    try {

        const { firstname, lastname, password, email, gender, phone, place } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const newuserdata = new User({
            firstname,
            lastname,
            password: hashedPassword,
            email,
            gender,
            phone,
            place
        })


        newuserdata.save()
        if (!newuserdata) {
            return res.status(400).json({
                error: "registration failed",
                status: false, data: null
            })
        }
        await sendWelcomeEmail(email, firstname);
        res.status(200).json({
            message: "registration successful",
            status: true, data: newuserdata
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "erroor" })
    }
}

//get employee
export const getEmployees = async (req, res) => {

    try {
        const employees = await User.find({ role: 'employee' })
        if (!employees) {
            return res.status(400).json({
                error: " employees not found",
                status: false,
                data: null
            })
        }
        res.status(200).json({
            message: "employees is exists",
            status: true,
            data: employees
        })
    } catch (error) {
        console.error("Error fetching enployees:", error);
        res.status(500).json({ message: "Server error" });
    }

}
// update employee
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const employee = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            status: true,
            message: "Employee updated successfully",
            data: employee,
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({
            status: false,
            message: "Server error while updating employee",
        });
    }
};
// Delete employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.query;
        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                status: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            status: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};
//search employee
export const searchEmployees = async (req, res) => {
    try {
        const { search } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { firstname: { $regex: search, $options: "i" } },
                { lastname: { $regex: search, $options: "i" } },
            ];
        }

        const employees = await User.find(query).sort({ firstname: 1 });
        res.status(200).json({
            status: true,
            data: employees,
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};
