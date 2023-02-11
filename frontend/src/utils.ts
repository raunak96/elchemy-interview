/**
 * @Desc Formats number to US currency format
 */
export const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",

	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});
