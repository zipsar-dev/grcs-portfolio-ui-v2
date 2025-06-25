
const sendEmail = require("../utils/nodeMailer");

exports.sendOrderEmail = async (req, res, next) => {
    try {
        const { email, html } = req.body;

        await sendEmail({
            email: email,
            subject: "Your Order Details",
            html: html,
        });

        console.log(`Email sent to ${email} successfully`);
        res.status(200).json({
            success: true,
            message: `Email sent to ${email} successfully`,
        });
    } catch (error) {
        return next(new Error(error.message, 500));
    }
};
