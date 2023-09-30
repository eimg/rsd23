import { describe, expect, it } from "vitest";

import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
// jsdom

import { convertToC } from "../libs/converter";

import App from "../App";

describe("converter module", () => {
	it("should return correct Celcius value", () => {
		expect(convertToC(96)).toBe(35.56);
	});
});

describe("React UI", () => {
	it("should render correctly", async () => {
		render(<App />);
		expect(screen.getByRole("title")).toBeInTheDocument();
	});

	it("should show correct result", async () => {
		render(<App />);

		await fireEvent.change(screen.getByRole("input"), {
			target: { value: 96 },
		});

		await fireEvent.click(screen.getByRole("submit"));

		expect(screen.getByText("35.56")).toBeInTheDocument();
	});

	it("should not show result", async () => {
		render(<App />);

		await fireEvent.change(screen.getByRole("input"), {
			target: { value: '' },
		});

		await fireEvent.click(screen.getByRole("submit"));

		expect(screen.queryByRole("result")).not.toBeInTheDocument();
	});
});
