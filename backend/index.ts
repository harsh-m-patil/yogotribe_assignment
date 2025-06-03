import express from "express";
import { Request, Response } from "express";
import { z } from "zod";

const app = express();

const primeParamSchema = z.object({
	number: z.coerce.number().int(),
});

app.get("/prime/:number", (req: Request, res: Response) => {
	const parseResult = primeParamSchema.safeParse(req.params);

	if (!parseResult.success) {
		return res.status(400).json({ error: parseResult.error.errors });
	}

	const number = parseResult.data.number;

	if (number <= 1) {
		return res.json({
			isPrime: false,
			message: `The number ${number} is not prime`,
		});
	}

	let isPrime = true;
	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) {
			isPrime = false;
			break;
		}
	}

	return res.json({
		isPrime,
		message: `The number ${number} is ${isPrime ? "prime" : "not prime"}`,
	});
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
