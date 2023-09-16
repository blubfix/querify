export function parseGermanDate(germanDate) {
    // Check if the input is null or empty
    if (!germanDate) {
        console.error('Invalid or null date provided.');
        return null;
    }

    // Split the date string into day, month, and year
    const dateComponents = germanDate.split('.');

    // Ensure that there are three components (day, month, and year)
    if (dateComponents.length !== 3) {
        console.error('Invalid date format. Expected "dd.mm.yyyy".');
        return null;
    }

    const [day, month, year] = dateComponents;

    // Create a new Date object (JavaScript handles months as 0-indexed, so we subtract 1 from the month)
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    // Check if the created date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date values provided.');
        return null;
    }

    console.log('date:', date);
    return date;
}