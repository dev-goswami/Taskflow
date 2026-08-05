const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message:
            process.env.NODE_ENV === "development"
                ? "Something went wrong"
                : err.message,
    });
};

export default errorHandler;
