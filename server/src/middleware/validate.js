export default function validate(schema, source = "body") {
    return (req, res, next) => {
      try {
        const parsed = schema.parse(req[source]);
        req[source] = parsed;
        next();
      } catch (err) {
        return res.status(400).json({
          error: "Validation failed",
          details: err.issues ?? [],
        });
      }
    };
  }