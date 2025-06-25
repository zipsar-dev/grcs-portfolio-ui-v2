/**
 * Validate request body
 */
exports.validateRequest = (req, res, next) => {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
        return res.status(400).json({
            success: false,
            message: 'Content-Type must be application/json'
        });
    }

    // For OTP verification
    if (req.path === '/verify-otp') {
        const { phoneNumber, otp } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'OTP is required'
            });
        }
    }

    next();
};